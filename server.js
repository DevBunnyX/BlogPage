const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Directories
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_FILE = path.join(__dirname, 'data', 'blogs.json');

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Serve static assets and frontend
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

// Storage helper functions
function readBlogs() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const raw = fs.readFileSync(DB_FILE, 'utf-8');
            return JSON.parse(raw);
        }
    } catch (e) {
        console.error('Error reading blogs DB:', e);
    }
    return [];
}

function writeBlogs(blogs) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error writing blogs DB:', e);
    }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname).toLowerCase() === '.docx') {
            cb(null, true);
        } else {
            cb(new Error('Only .docx files are permitted!'), false);
        }
    }
});

// ============================================================================
// REST API ENDPOINTS
// ============================================================================

// 1. GET /api/blogs - List all blogs
app.get('/api/blogs', (req, res) => {
    const blogs = readBlogs();
    const status = req.query.status;
    if (status && status !== 'all') {
        return res.json(blogs.filter(b => b.status === status));
    }
    res.json(blogs);
});

// 2. GET /api/blogs/:id - Get single blog
app.get('/api/blogs/:id', (req, res) => {
    const blogs = readBlogs();
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
});

// 3. POST /api/blogs - Create new blog manually
app.post('/api/blogs', (req, res) => {
    const blogs = readBlogs();
    const newBlog = {
        ...req.body,
        id: req.body.id || 'blog-' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    blogs.unshift(newBlog);
    writeBlogs(blogs);
    res.status(201).json(newBlog);
});

// 4. PUT /api/blogs/:id - Update existing blog
app.put('/api/blogs/:id', (req, res) => {
    const blogs = readBlogs();
    const index = blogs.findIndex(b => b.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    blogs[index] = {
        ...blogs[index],
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    writeBlogs(blogs);
    res.json(blogs[index]);
});

// 5. PATCH /api/blogs/:id/publish - Toggle publish/unpublish
app.patch('/api/blogs/:id/publish', (req, res) => {
    const blogs = readBlogs();
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    blog.status = blog.status === 'published' ? 'draft' : 'published';
    blog.updatedAt = new Date().toISOString();
    writeBlogs(blogs);
    res.json({ message: 'Status updated', status: blog.status, blog });
});

// 6. DELETE /api/blogs/:id - Delete blog
app.delete('/api/blogs/:id', (req, res) => {
    let blogs = readBlogs();
    const exists = blogs.some(b => b.id === req.params.id);
    if (!exists) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    blogs = blogs.filter(b => b.id !== req.params.id);
    writeBlogs(blogs);
    res.json({ message: 'Blog deleted successfully' });
});

// 7. POST /api/blogs/upload - DOCX Upload & Semantic Extraction
app.post('/api/blogs/upload', upload.single('document'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No DOCX file uploaded' });
    }

    try {
        const filePath = req.file.path;
        let imageCounter = 0;

        // Custom Mammoth options to extract images to disk
        const options = {
            convertImage: mammoth.images.inline((element) => {
                return element.read().then((imageBuffer) => {
                    const ext = element.contentType.split('/')[1] || 'png';
                    const imageName = `img-${Date.now()}-${++imageCounter}.${ext}`;
                    const targetDiskPath = path.join(UPLOADS_DIR, imageName);
                    fs.writeFileSync(targetDiskPath, imageBuffer);
                    return {
                        src: `/uploads/${imageName}`
                    };
                });
            })
        };

        const result = await mammoth.convertToHtml({ path: filePath }, options);
        const html = result.value;

        // Parse HTML semantics into Structured Blog JSON
        const structuredBlog = parseHtmlToBlogStructure(html, req.file.originalname);

        // Store into JSON database
        const blogs = readBlogs();
        blogs.unshift(structuredBlog);
        writeBlogs(blogs);

        res.status(201).json({
            message: 'DOCX successfully parsed and saved as draft',
            blog: structuredBlog,
            warnings: result.messages
        });

    } catch (err) {
        console.error('Server DOCX Parsing Error:', err);
        res.status(500).json({ error: 'Failed to process DOCX file', details: err.message });
    }
});

// Semantic HTML Parser helper for Node.js
function parseHtmlToBlogStructure(html, originalFilename) {
    // Regex-based lightweight parsing for title, excerpt, and sections
    let title = originalFilename.replace(/\.docx$/i, '').replace(/[-_]/g, ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);

    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<h2[^>]*>(.*?)<\/h2>/i);
    if (h1Match) {
        title = h1Match[1].replace(/<[^>]+>/g, '').trim();
    }

    let subtitle = "Clinical healthcare review covering symptoms, causes, and treatment.";
    const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
    if (pMatch) {
        subtitle = pMatch[1].replace(/<[^>]+>/g, '').trim();
    }

    let coverImage = "";
    const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) {
        coverImage = imgMatch[1];
    } else {
        coverImage = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80";
    }

    // Split content by H2 tags into sections/folds
    const sections = html.split(/<h2[^>]*>/i);
    const folds = [];
    const keyTakeaways = [];

    sections.forEach((sec, idx) => {
        if (idx === 0) return; // preamble before first H2
        const parts = sec.split(/<\/h2>/i);
        const headingText = parts[0].replace(/<[^>]+>/g, '').trim();
        const bodyContent = parts[1] || '';

        const foldId = `fold-${idx}`;
        keyTakeaways.push({ text: headingText, foldId: foldId });

        // Check if there is an image in this section
        const secImgMatch = bodyContent.match(/<img[^>]+src=["']([^"']+)["']/i);
        const sectionImg = secImgMatch ? secImgMatch[1] : null;

        folds.push({
            id: foldId,
            title: headingText,
            bodyHtml: bodyContent,
            image: sectionImg
        });
    });

    if (folds.length === 0) {
        folds.push({
            id: 'fold-1',
            title: 'Overview',
            bodyHtml: html,
            image: null
        });
        keyTakeaways.push({ text: 'Overview', foldId: 'fold-1' });
    }

    keyTakeaways.push({ text: 'FAQs', foldId: 'viewFaqSection' });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return {
        id: 'blog-' + Date.now(),
        title: title,
        slug: slug,
        subtitle: subtitle,
        category: 'Contagion',
        status: 'draft',
        author: {
            name: 'Editorial Team',
            avatar: 'https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/1_9a968be5a7.png',
            designation: 'Healthcare Contributor'
        },
        doctor: {
            name: 'Dr. Ananthakrishnan Chandrasekhar',
            credentials: 'MD',
            title: 'Internal Medicine Specialist'
        },
        publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readMinutes: 4,
        coverImage: coverImage,
        keyTakeaways: keyTakeaways,
        folds: folds,
        faqs: [
            {
                question: "What is the recommended treatment approach?",
                answer: "Treatment is symptomatic and supportive. Consult a doctor if fever persists."
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(` Kofuku Blog Management Server Running on port ${PORT}`);
        console.log(` Local URL: http://localhost:${PORT}`);
        console.log(`====================================================`);
    });
}

module.exports = app;

