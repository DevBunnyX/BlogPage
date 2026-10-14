/**
 * Kofuku Blog Management & Public Blog Engine
 * Handles DOCX parsing, semantic mapping, template rendering, and full CRUD.
 */

// ============================================================================
// 1. SEED DATA (Matching Kofuku live blog reference)
// ============================================================================

const SEED_BLOGS = [
    {
        id: "blog-fever-pyrexia-001",
        title: "Fever and Pyrexia: Why It Happens and How to Manage It",
        slug: "fever-and-pyrexia-why-it-happens-and-how-to-manage-it",
        subtitle: "A fever, also known as pyrexia, is a natural response from your body's immune system. Learn why fevers happen, how to safely manage symptoms with home remedies and medication, and when it’s time to call a doctor.",
        category: "Contagion",
        status: "published", // 'published' | 'draft'
        author: {
            name: "Shubhechhya Mukherjee",
            avatar: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/2_3415176660.png",
            designation: "Content Writer"
        },
        doctor: {
            name: "Dr. Ananthakrishnan Chandrasekhar",
            credentials: "MD",
            title: "Internal Medicine Specialist"
        },
        publishDate: "October 7, 2026",
        readMinutes: 4,
        coverImage: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Fever_and_Pyrexia_Disease_Why_It_Happens_and_How_to_Manage_It_46468b7251.webp",
        keyTakeaways: [
            { text: "Introduction", foldId: "fold-1" },
            { text: "Common Causes of Fever in Adults and Children", foldId: "fold-2" },
            { text: "Viral Fever: Symptoms and Treatment", foldId: "fold-3" },
            { text: "Antibiotics for Fever: What You Should Know", foldId: "fold-4" },
            { text: "Nursing Care Plan for Fever Management", foldId: "fold-5" },
            { text: "Fever Medicines Commonly Prescribed", foldId: "fold-6" },
            { text: "Home Remedies to Support Fever Recovery", foldId: "fold-7" },
            { text: "FAQs", foldId: "viewFaqSection" }
        ],
        folds: [
            {
                id: "fold-1",
                title: "Introduction",
                bodyHtml: `
                    <p>Fever remains one of the most common health issues encountered in India, both in adults and children alike. Known as pyrexia in medical terms, fever is generally considered to be a symptom associated with discomfort and body aches to many, treated with antibiotics.</p>
                    <p>However, not all fevers need antibiotics. The treatment for pyrexia (fever) largely depends on the cause, which can be <a href="https://www.mayoclinic.org/diseases-conditions/infectious-diseases/expert-answers/infectious-disease/faq-20058098" target="_blank" rel="noopener noreferrer">viral or bacterial</a>.</p>
                    <p>To ensure effective treatment, it is vital to know what pyrexia (fever) entails, its causes and effective handling. With this guide, you can understand bacterial or viral pyrexia treatment, symptoms, and care plans.</p>
                `,
                image: null
            },
            {
                id: "fold-2",
                title: "Common Causes of Fever in Adults and Children",
                bodyHtml: `
                    <p>Fever is a common occurrence that is medically known as pyrexia disease, and it is a reaction by the body to any infections, inflammation or systemic factors.</p>
                    <p>The common causes are:</p>
                    <ul>
                        <li><strong>Viral infections</strong>: Influenza, dengue, and COVID-19 often lead to high-grade fevers lasting several days.</li>
                        <li><strong>Bacterial infections</strong>: Pneumonia, urinary tract infections, or gastroenteritis may require antibiotic tablets for fever.</li>
                        <li><strong>Other causes</strong>: Heat stroke, <a href="https://my.clevelandclinic.org/health/diseases/21624-autoimmune-diseases" target="_blank" rel="noopener noreferrer">autoimmune conditions</a>, and post-vaccination responses.</li>
                    </ul>
                    <p>Although it is just a symptom, it may be compounded by fever side effects such as fatigue, aches, and headaches. Effective treatment is achieved by getting the underlying cause properly identified.</p>
                `,
                image: null
            },
            {
                id: "fold-3",
                title: "Viral Fever: Symptoms and Treatment",
                bodyHtml: `
                    <p>Viral pyrexia treatment focuses on symptom management rather than eradicating the virus, as antibiotics are ineffective against viruses.</p>
                    <p>Patients may experience:</p>
                    <ul>
                        <li>Sudden rise in temperature</li>
                        <li>Chills and sweating</li>
                        <li>Bodyache and joint pain</li>
                        <li>Fatigue and loss of appetite</li>
                    </ul>
                    <h4>How Many Days Does Viral Fever Last?</h4>
                    <p>Realising how long a viral fever persists is also vital to keep track of recovery. The length of viral fever usually is 3–7 days, depending on the virus and the immunity of an individual. Mild fever can last up to 10 days in some cases.</p>
                    <h4>Medicine for Viral Fever and Bodyache</h4>
                    <p>Over-the-counter drugs like paracetamol are often prescribed as a relief for bodyache and fever. Certain supportive therapeutic approaches are beneficial:</p>
                    <ul>
                        <li>Hydration and rest</li>
                        <li>Medicine for fever and body pain, including paracetamol or ibuprofen</li>
                        <li>Cool compresses or tepid sponging</li>
                    </ul>
                    <div class="callout-quote-box">
                        "Do not take antibiotic fever drugs unless the type of infection (bacterial or viral) is verified. Unnecessary intake of antibiotics can lead to resistance."
                    </div>
                `,
                image: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Fever_and_Pyrexia_Disease_Why_It_Happens_and_How_to_Manage_It_1_2cfc765ca2.webp"
            },
            {
                id: "fold-4",
                title: "Antibiotics for Fever: What You Should Know",
                bodyHtml: `
                    <p>Fever does not always indicate the need for antibiotics. Fever antibiotic tablet use should be guided by laboratory tests and physician evaluation. Misusing antibiotic tablets for fever can harm <a href="https://my.clevelandclinic.org/health/body/25201-gut-microbiome" target="_blank" rel="noopener noreferrer">gut health</a> and contribute to microbial resistance.</p>
                    <h4>Is Paracetamol an Antibiotic?</h4>
                    <p>A common mistake that many people make is believing that paracetamol is an antibiotic. <strong>No, paracetamol is an antipyretic and analgesic</strong> that helps lower fever and pain, but does not cure bacterial infections.</p>
                    <h4>Injection Name for Fever Relief</h4>
                    <p>In severe cases where oral medicines cannot be tolerated, doctors may prescribe an injection for fever reduction. Common formulations include intravenous paracetamol administered strictly under medical supervision.</p>
                `,
                image: null
            },
            {
                id: "fold-5",
                title: "Nursing Care Plan for Fever Management",
                bodyHtml: `
                    <p>Structured care routines are essential in managing pyrexia. Clinical care considerations include assessment, monitoring, and comfort measures.</p>
                    <h4>Clinical Observation and Monitoring</h4>
                    <ul>
                        <li>Regularly monitor axillary, oral, or tympanic temperature readings.</li>
                        <li>Observe for complications such as dehydration, disorientation, or persistent high fever.</li>
                        <li>Track symptom progression, noting how long viral fever lasts.</li>
                    </ul>
                    <h4>Patient Comfort Measures</h4>
                    <ul>
                        <li>Ensure adequate hydration and electrolyte intake.</li>
                        <li>Encourage rest and minimise physical exertion.</li>
                        <li>Apply cool compresses or tepid sponging to regulate body temperature.</li>
                    </ul>
                `,
                image: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Fever_and_Pyrexia_Disease_Why_It_Happens_and_How_to_Manage_It_2_de29dbb617.webp"
            },
            {
                id: "fold-6",
                title: "Fever Medicines Commonly Prescribed",
                bodyHtml: `
                    <p>Physicians may prescribe various medications depending on the fever type and associated symptoms. Common options include:</p>
                    <ul>
                        <li>Paracetamol approved tablets for fever and bodyache</li>
                        <li>Antibiotic tablets if bacterial infection is confirmed by laboratory investigation</li>
                        <li>Medicine for fever and body pain tailored for comfort and recovery</li>
                        <li>Supportive medications like antihistamines or antivirals, if indicated</li>
                    </ul>
                `,
                image: null
            },
            {
                id: "fold-7",
                title: "Home Remedies to Support Fever Recovery",
                bodyHtml: `
                    <p>Alongside medication, several home practices enhance recovery during pyrexia:</p>
                    <ul>
                        <li><strong>Hydration</strong>: Clean water, tender coconut water, and electrolyte solutions.</li>
                        <li><strong>Light meals</strong>: Easily digestible foods such as porridge, clear soups, and stewed fruits.</li>
                        <li><strong>Rest</strong>: Limit physical strain and ensure uninterrupted sleep.</li>
                        <li><strong>Cool environment</strong>: Use light clothing and well-ventilated rooms to prevent overheating.</li>
                    </ul>
                    <p>Although supportive remedies aid recovery, they do not replace medical evaluation. If fever persists beyond 3 days or exceeds 102°F (38.9°C), consult a physician immediately.</p>
                `,
                image: null
            }
        ],
        faqs: [
            {
                question: "What is viral pyrexia treatment at home and in hospitals?",
                answer: "Viral pyrexia treatment focuses on symptom relief. At home, hydration, rest, and paracetamol help reduce fever and bodyache. In hospital settings, intravenous fluids, careful vitals monitoring, and supportive antipyretic care are provided without unnecessary antibiotics."
            },
            {
                question: "How many days does viral fever last on average?",
                answer: "On average, viral fever lasts for 3–7 days, depending on the specific virus and the individual's immune response. Mild cases resolve in 3 to 4 days, while certain infections can persist up to 10 days."
            },
            {
                question: "Is paracetamol an antibiotic or a pain reliever?",
                answer: "Paracetamol is an analgesic (pain reliever) and antipyretic (fever reducer), NOT an antibiotic. It lowers body temperature by acting on the hypothalamus, but it does not kill bacteria."
            },
            {
                question: "Which is the most common antibiotic tablet for a fever?",
                answer: "Antibiotics are only prescribed when fever is caused by a diagnosed bacterial infection (e.g., amoxicillin or azithromycin). Viral fevers never respond to antibiotics."
            },
            {
                question: "Can fever and body pain be treated with one tablet?",
                answer: "Yes, medications such as paracetamol or ibuprofen act simultaneously as antipyretics and analgesics, effectively reducing fever and relieving body aches."
            }
        ],
        createdAt: "2026-10-07T10:00:00.000Z",
        updatedAt: "2026-10-07T17:29:34.062Z"
    },
    {
        id: "blog-dengue-vs-zika-002",
        title: "Dengue vs. Zika: Key Differences and Prevention Tips",
        slug: "dengue-vs-zika-key-differences-and-prevention-tips",
        subtitle: "Compare Dengue and Zika viruses, their symptoms, transmission, and prevention to protect yourself from these mosquito-borne diseases. Read now!",
        category: "Contagion",
        status: "published",
        author: {
            name: "Rayomand S. Engineer",
            avatar: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/3_8766ee0866.png",
            designation: "Senior Content Writer"
        },
        doctor: {
            name: "Dr. Pankaj Sharma",
            credentials: "MD",
            title: "Consultant Neurosurgeon"
        },
        publishDate: "December 13, 2025",
        readMinutes: 5,
        coverImage: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Dengue_vs_Zika_1_b25db0b0c7.webp",
        keyTakeaways: [
            { text: "Overview of Mosquito-Borne Viruses", foldId: "fold-1" },
            { text: "Symptoms Comparison", foldId: "fold-2" },
            { text: "Prevention Strategies", foldId: "fold-3" }
        ],
        folds: [
            {
                id: "fold-1",
                title: "Overview of Mosquito-Borne Viruses",
                bodyHtml: "<p>Both Dengue and Zika are transmitted primarily by the Aedes aegypti mosquito. Understanding their distinctive clinical hallmarks helps avoid severe complications.</p>",
                image: null
            }
        ],
        faqs: [
            {
                question: "How can you differentiate Dengue from Zika?",
                answer: "Dengue is typically marked by severe retro-orbital pain, high fevers, and thrombocytopenia (low platelet count), whereas Zika frequently presents with conjunctivitis, milder fever, and rash."
            }
        ],
        createdAt: "2025-12-10T05:35:45.000Z",
        updatedAt: "2026-10-08T20:30:46.409Z"
    },
    {
        id: "blog-tetanus-draft-003",
        title: "Tetanus Toxoid Vaccine Dosage and When to Get The Shot: An Essential Guide",
        slug: "tetanus-toxoid-vaccine-dosage-and-when-to-get-the-shot",
        subtitle: "Essential clinical guide on tetanus toxoid vaccine dosage, schedules, wound hygiene, and importance across all age groups.",
        category: "Contagion",
        status: "draft",
        author: {
            name: "Arpan Ghosh",
            avatar: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/4_202cbc81c5.png",
            designation: "Team Lead - Content"
        },
        doctor: {
            name: "Dr. Ananthakrishnan Chandrasekhar",
            credentials: "MD",
            title: "Internal Medicine Specialist"
        },
        publishDate: "January 31, 2026",
        readMinutes: 5,
        coverImage: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Tetanus_Toxoid_Vaccine_Dosage_and_When_to_Get_the_Shot_An_Essential_Guide_b9c24db11f.webp",
        keyTakeaways: [
            { text: "Why Tetanus Vaccination Matters", foldId: "fold-1" },
            { text: "Recommended Dosage Schedule", foldId: "fold-2" }
        ],
        folds: [
            {
                id: "fold-1",
                title: "Why Tetanus Vaccination Matters",
                bodyHtml: "<p>Clostridium tetani spores exist abundantly in soil, dust, and animal feces. When penetrating deep contaminated wounds, they produce tetanospasmin, a potent neurotoxin.</p>",
                image: null
            }
        ],
        faqs: [
            {
                question: "How often do adults need a tetanus booster?",
                answer: "Every 10 years, or after 5 years in the event of a deep, contaminated wound."
            }
        ],
        createdAt: "2026-01-16T07:17:37.000Z",
        updatedAt: "2026-10-08T20:26:50.338Z"
    }
];

// Related blogs data for footer cards
const RELATED_BLOGS_POOL = [
    {
        title: "Dengue vs. Zika: Key Differences and Prevention Tips",
        category: "Contagion",
        readMinutes: "5 min read",
        coverImage: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Dengue_vs_Zika_1_b25db0b0c7.webp",
        author: "Rayomand S. Engineer"
    },
    {
        title: "Understanding Rabies Vaccine Intramuscular Route for Dog Bites",
        category: "Contagion",
        readMinutes: "6 min read",
        coverImage: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/Understanding_Rabies_Vaccine_Intramuscular_Route_for_Dog_Bites_edc19063d9.webp",
        author: "Shruti Thapa"
    },
    {
        title: "First Case of Mpox Clade 1 in India: Everything You Need to Know",
        category: "Contagion",
        readMinutes: "6 min read",
        coverImage: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/India_s_first_Mpox_Clade_1_case_reported_in_Kerala_1_a6d1f7f587.webp",
        author: "Shubhechhya Mukherjee"
    }
];

// ============================================================================
// 2. STORAGE & STATE MANAGEMENT
// ============================================================================

const STORAGE_KEY = "kofuku_blogs_v1";
let activeCurrentBlogId = null;
let isLivePreviewMode = false;

function loadBlogs() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn("Could not read from localStorage, using seed data:", e);
    }
    // Initialize with seed data
    saveAllBlogs(SEED_BLOGS);
    return SEED_BLOGS;
}

function saveAllBlogs(blogs) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    } catch (e) {
        console.error("Error saving blogs to localStorage:", e);
    }
}

function getBlogById(id) {
    const blogs = loadBlogs();
    return blogs.find(b => b.id === id) || null;
}

function upsertBlog(blogData) {
    const blogs = loadBlogs();
    const existingIndex = blogs.findIndex(b => b.id === blogData.id);
    if (existingIndex >= 0) {
        blogs[existingIndex] = { ...blogs[existingIndex], ...blogData, updatedAt: new Date().toISOString() };
    } else {
        blogs.unshift({
            ...blogData,
            id: blogData.id || "blog-" + Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    saveAllBlogs(blogs);
    renderAdminTable();
    updateDashboardStats();
    return blogData;
}

function deleteBlogById(id) {
    let blogs = loadBlogs();
    blogs = blogs.filter(b => b.id !== id);
    saveAllBlogs(blogs);
    renderAdminTable();
    updateDashboardStats();
    showToast("Blog deleted successfully", "success");
}

function togglePublishStatus(id) {
    const blogs = loadBlogs();
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;
    blog.status = blog.status === "published" ? "draft" : "published";
    blog.updatedAt = new Date().toISOString();
    saveAllBlogs(blogs);
    renderAdminTable();
    updateDashboardStats();
    showToast(`Blog status changed to ${blog.status.toUpperCase()}`, "success");
}

// ============================================================================
// 3. ADMIN PANEL UI & RENDERING
// ============================================================================

function updateDashboardStats() {
    const blogs = loadBlogs();
    const total = blogs.length;
    const published = blogs.filter(b => b.status === "published").length;
    const drafts = total - published;

    const elTotal = document.getElementById("statTotal");
    const elPub = document.getElementById("statPublished");
    const elDrafts = document.getElementById("statDrafts");

    if (elTotal) elTotal.textContent = total;
    if (elPub) elPub.textContent = published;
    if (elDrafts) elDrafts.textContent = drafts;
}

function renderAdminTable() {
    const tbody = document.getElementById("blogTableBody");
    const emptyState = document.getElementById("emptyTableState");
    if (!tbody) return;

    const searchVal = (document.getElementById("tableSearchInput")?.value || "").toLowerCase().trim();
    const statusVal = document.getElementById("statusFilterSelect")?.value || "all";

    let blogs = loadBlogs();

    if (searchVal) {
        blogs = blogs.filter(b =>
            (b.title && b.title.toLowerCase().includes(searchVal)) ||
            (b.author?.name && b.author.name.toLowerCase().includes(searchVal)) ||
            (b.category && b.category.toLowerCase().includes(searchVal))
        );
    }

    if (statusVal !== "all") {
        blogs = blogs.filter(b => b.status === statusVal);
    }

    if (blogs.length === 0) {
        tbody.innerHTML = "";
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    if (emptyState) emptyState.style.display = "none";

    tbody.innerHTML = blogs.map(blog => {
        const coverImg = blog.coverImage || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80";
        const dateStr = blog.publishDate || (new Date(blog.updatedAt || blog.createdAt).toLocaleDateString());
        const isPub = blog.status === "published";
        const authorName = blog.author?.name || "Editorial Team";
        const reviewerName = blog.doctor?.name ? `Rev: ${blog.doctor.name}` : "";

        return `
            <tr data-blog-id="${blog.id}">
                <td>
                    <div class="blog-title-cell">
                        <img src="${coverImg}" alt="${escapeHtml(blog.title)}" class="blog-thumbnail-mini" onerror="this.src='https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=100&q=80';" />
                        <div>
                            <a href="#" class="blog-meta-title" onclick="previewBlog('${blog.id}'); return false;">${escapeHtml(blog.title)}</a>
                            <span class="blog-meta-slug">/${escapeHtml(blog.slug || '')}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="font-weight: 600;">${escapeHtml(authorName)}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${escapeHtml(reviewerName)}</div>
                </td>
                <td>
                    <span style="font-weight: 600; color: var(--primary);">${escapeHtml(blog.category || 'General')}</span>
                </td>
                <td>
                    <span class="status-badge ${isPub ? 'published' : 'draft'}">
                        ● ${isPub ? 'Published' : 'Draft'}
                    </span>
                </td>
                <td style="color: var(--text-muted); font-size: 13px;">
                    ${dateStr}
                </td>
                <td style="text-align: right;">
                    <div class="actions-cell" style="justify-content: flex-end;">
                        <button class="action-btn btn-preview" title="Preview Live Template" onclick="previewBlog('${blog.id}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            Preview
                        </button>
                        <button class="action-btn" title="Edit Content" onclick="openEditModal('${blog.id}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            Edit
                        </button>
                        <button class="action-btn" title="${isPub ? 'Unpublish' : 'Publish'}" onclick="togglePublishStatus('${blog.id}')">
                            ${isPub ? 'Unpublish' : 'Publish'}
                        </button>
                        <button class="action-btn btn-delete" title="Delete Blog" onclick="confirmDeleteBlog('${blog.id}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function filterBlogsTable() {
    renderAdminTable();
}

function confirmDeleteBlog(id) {
    const blog = getBlogById(id);
    if (!blog) return;
    if (confirm(`Are you sure you want to delete "${blog.title}"? This cannot be undone.`)) {
        deleteBlogById(id);
    }
}

// ============================================================================
// 4. DOCX PARSER & SEMANTIC CONVERSION ENGINE (Mammoth.js)
// ============================================================================

function initDocxDropzone() {
    const dropzone = document.getElementById("uploadDropzone");
    const fileInput = document.getElementById("docxFileInput");
    if (!dropzone || !fileInput) return;

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDocxFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleDocxFile(e.target.files[0]);
        }
    });
}

function triggerFileInput() {
    const input = document.getElementById("docxFileInput");
    if (input) input.click();
}

async function handleDocxFile(file) {
    if (!file.name.toLowerCase().endsWith(".docx")) {
        showToast("Please upload a valid .docx Microsoft Word file", "error");
        return;
    }

    showToast("Parsing DOCX document & extracting media...", "success");

    const reader = new FileReader();
    reader.onload = async function(loadEvent) {
        const arrayBuffer = loadEvent.target.result;
        try {
            // Check if Mammoth is available
            if (typeof mammoth === "undefined") {
                throw new Error("Mammoth library is not loaded. Please ensure internet access or local script inclusion.");
            }

            // Mammoth custom conversion options: map inline images to Data URIs
            const options = {
                convertImage: mammoth.images.imgElement(function(image) {
                    return image.read("base64").then(function(imageBuffer) {
                        return {
                            src: "data:" + image.contentType + ";base64," + imageBuffer
                        };
                    });
                })
            };

            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, options);
            const rawHtml = result.value; // The generated HTML
            const messages = result.messages; // Any conversion warnings

            if (messages && messages.length > 0) {
                console.log("Mammoth parser messages:", messages);
            }

            // Convert raw HTML into Kofuku Structured Blog Model
            const structuredBlog = mapRawHtmlToStructuredBlog(rawHtml, file.name);
            
            // Save as draft blog
            upsertBlog(structuredBlog);
            showToast(`Document "${file.name}" converted and saved to Drafts!`, "success");

            // Open edit modal directly so admin can review extracted components
            openEditModal(structuredBlog.id);

        } catch (err) {
            console.error("DOCX parsing error:", err);
            showToast("Failed to parse DOCX: " + err.message, "error");
        }
    };

    reader.readAsArrayBuffer(file);
}

/**
 * Transforms raw semantic HTML from Mammoth into Kofuku Blog Structure:
 * - H1 / First heading -> Title
 * - First paragraph -> Excerpt / Subtitle
 * - First image -> Cover / Featured Image
 * - H2/H3 -> Section Folds
 * - FAQs heading / Q&A -> FAQs list
 * - Key Takeaways
 */
function mapRawHtmlToStructuredBlog(rawHtml, filename) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    // 1. Extract Title
    let title = "";
    const firstH1 = doc.querySelector("h1") || doc.querySelector("h2");
    if (firstH1) {
        title = firstH1.textContent.trim();
        firstH1.remove(); // Remove title node from body
    } else {
        // Fallback from filename
        title = filename.replace(/\.docx$/i, "").replace(/[-_]/g, " ");
        title = title.charAt(0).toUpperCase() + title.slice(1);
    }

    // 2. Extract Subtitle / Excerpt
    let subtitle = "";
    const firstP = doc.querySelector("p");
    if (firstP && firstP.textContent.trim().length > 20) {
        subtitle = firstP.textContent.trim();
        firstP.remove();
    } else {
        subtitle = "A comprehensive healthcare guide covering causes, symptoms, and evidence-based management.";
    }

    // 3. Extract Featured Cover Image
    let coverImage = "";
    const firstImg = doc.querySelector("img");
    if (firstImg) {
        coverImage = firstImg.src;
        // Keep or remove based on layout preference
    } else {
        coverImage = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80";
    }

    // 4. Extract FAQs if present
    const faqs = [];
    let faqSectionNode = null;
    const allHeadings = Array.from(doc.querySelectorAll("h1, h2, h3, h4"));
    for (const h of allHeadings) {
        if (/faq|frequently asked/i.test(h.textContent)) {
            faqSectionNode = h;
            break;
        }
    }

    if (faqSectionNode) {
        // Collect following siblings until next major heading
        let curr = faqSectionNode.nextElementSibling;
        let currentQuestion = "";
        let currentAnswer = "";

        while (curr && !/^H[1-2]$/i.test(curr.tagName)) {
            const text = curr.textContent.trim();
            if (/^Q[\.:\?]/i.test(text) || curr.tagName === "H3" || curr.tagName === "H4") {
                if (currentQuestion && currentAnswer) {
                    faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
                }
                currentQuestion = text.replace(/^Q[\.:\?]\s*/i, "");
                currentAnswer = "";
            } else if (/^A[\.:]/i.test(text)) {
                currentAnswer += " " + text.replace(/^A[\.:]\s*/i, "");
            } else {
                if (currentQuestion) {
                    currentAnswer += " " + text;
                }
            }
            const next = curr.nextElementSibling;
            curr.remove();
            curr = next;
        }
        if (currentQuestion && currentAnswer) {
            faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
        }
        faqSectionNode.remove();
    }

    // Fallback default FAQs if none extracted
    if (faqs.length === 0) {
        faqs.push(
            {
                question: "What are the common symptoms discussed in this guide?",
                answer: "The document covers primary indicators, diagnosis, clinical precautions, and home care practices."
            },
            {
                question: "When should one consult a qualified healthcare professional?",
                answer: "If symptoms persist beyond 3 days, body temperature rises uncontrollably, or severe distress occurs, consult a physician."
            }
        );
    }

    // 5. Structure into Content Folds
    const folds = [];
    const keyTakeaways = [];
    const remainingHeadings = Array.from(doc.querySelectorAll("h2, h3"));

    if (remainingHeadings.length > 0) {
        remainingHeadings.forEach((heading, idx) => {
            const foldId = `fold-${idx + 1}`;
            const foldTitle = heading.textContent.trim();
            keyTakeaways.push({ text: foldTitle, foldId: foldId });

            // Collect HTML until next heading
            let bodyHtml = "";
            let inlineImage = null;
            let sibling = heading.nextElementSibling;

            while (sibling && !/^H[2-3]$/i.test(sibling.tagName)) {
                if (sibling.tagName === "IMG" && !inlineImage) {
                    inlineImage = sibling.src;
                } else if (sibling.querySelector("img") && !inlineImage) {
                    inlineImage = sibling.querySelector("img").src;
                }
                bodyHtml += sibling.outerHTML;
                sibling = sibling.nextElementSibling;
            }

            folds.push({
                id: foldId,
                title: foldTitle,
                bodyHtml: bodyHtml || "<p>Detailed guidance and overview.</p>",
                image: inlineImage
            });
        });
    } else {
        // No H2/H3 found: single fold
        const foldId = "fold-1";
        folds.push({
            id: foldId,
            title: "Overview & Recommendations",
            bodyHtml: doc.body.innerHTML || "<p>Extracted blog content.</p>",
            image: null
        });
        keyTakeaways.push({ text: "Overview & Recommendations", foldId: foldId });
    }

    // Always include FAQ in Key Takeaways
    keyTakeaways.push({ text: "FAQs", foldId: "viewFaqSection" });

    // Calculate approximate read time (200 words/min)
    const totalWords = (doc.body.textContent || "").split(/\s+/).length;
    const readMinutes = Math.max(2, Math.ceil(totalWords / 200));

    // Generate clean slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    return {
        id: "blog-" + Date.now(),
        title: title,
        slug: slug,
        subtitle: subtitle,
        category: "Contagion",
        status: "draft",
        author: {
            name: "Editorial Team",
            avatar: "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/1_9a968be5a7.png",
            designation: "Healthcare Contributor"
        },
        doctor: {
            name: "Dr. Ananthakrishnan Chandrasekhar",
            credentials: "MD",
            title: "Internal Medicine Specialist"
        },
        publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readMinutes: readMinutes,
        coverImage: coverImage,
        keyTakeaways: keyTakeaways,
        folds: folds,
        faqs: faqs,
        rawExtractedHtml: rawHtml
    };
}

// ============================================================================
// 5. PUBLIC BLOG TEMPLATE RENDERER (1-to-1 Kofuku Fidelity)
// ============================================================================

function renderPublicBlog(blogId) {
    const blog = getBlogById(blogId) || loadBlogs()[0];
    if (!blog) return;

    activeCurrentBlogId = blog.id;

    // Breadcrumbs
    const elBreadcrumbCat = document.getElementById("viewBreadcrumbCategory");
    const elBreadcrumbTitle = document.getElementById("viewBreadcrumbTitle");
    if (elBreadcrumbCat) elBreadcrumbCat.textContent = blog.category || "Healthcare";
    if (elBreadcrumbTitle) elBreadcrumbTitle.textContent = blog.title;

    // Hero Section
    const elTitle = document.getElementById("viewBlogTitle");
    const elSub = document.getElementById("viewBlogSubtitle");
    if (elTitle) elTitle.textContent = blog.title;
    if (elSub) elSub.textContent = blog.subtitle || "";

    // Author & Reviewer
    const elAuthorName = document.getElementById("viewAuthorName");
    const elAuthorAvatar = document.getElementById("viewAuthorAvatar");
    const elDoctorRow = document.getElementById("viewDoctorRow");
    const elDoctorName = document.getElementById("viewDoctorName");

    if (elAuthorName) elAuthorName.textContent = blog.author?.name || "Editorial Writer";
    if (elAuthorAvatar && blog.author?.avatar) elAuthorAvatar.src = blog.author.avatar;

    if (blog.doctor && blog.doctor.name) {
        if (elDoctorRow) elDoctorRow.style.display = "block";
        if (elDoctorName) elDoctorName.textContent = blog.doctor.name;
    } else {
        if (elDoctorRow) elDoctorRow.style.display = "none";
    }

    // Meta stats
    const elDate = document.getElementById("viewPublishDate");
    const elReadTime = document.getElementById("viewReadMinutes");
    if (elDate) elDate.textContent = `Updated on ${blog.publishDate || 'Recent'}`;
    if (elReadTime) elReadTime.textContent = `${blog.readMinutes || 4} min read`;

    // Featured Image
    const elCoverBox = document.getElementById("viewCoverImageBox");
    const elCover = document.getElementById("viewCoverImage");
    if (blog.coverImage) {
        if (elCoverBox) elCoverBox.style.display = "block";
        if (elCover) elCover.src = blog.coverImage;
    } else {
        if (elCoverBox) elCoverBox.style.display = "none";
    }

    // Key Takeaways / Table of Contents
    const elTakeawaysWrapper = document.getElementById("keyTakeawaysWrapper");
    const elTakeawaysList = document.getElementById("viewKeyTakeawaysList");
    if (blog.keyTakeaways && blog.keyTakeaways.length > 0) {
        if (elTakeawaysWrapper) elTakeawaysWrapper.style.display = "block";
        if (elTakeawaysList) {
            elTakeawaysList.innerHTML = blog.keyTakeaways.map(item => `
                <li><a href="#${item.foldId}">${escapeHtml(item.text)}</a></li>
            `).join("");
        }
    } else {
        if (elTakeawaysWrapper) elTakeawaysWrapper.style.display = "none";
    }

    // Content Folds
    const elFoldsContainer = document.getElementById("viewContentFoldsContainer");
    if (elFoldsContainer) {
        if (blog.folds && blog.folds.length > 0) {
            elFoldsContainer.innerHTML = blog.folds.map(fold => {
                const imgHtml = fold.image ? `
                    <div class="fold-inline-image-box">
                        <img src="${fold.image}" alt="${escapeHtml(fold.title)}" class="fold-inline-image" />
                    </div>
                ` : "";

                return `
                    <section class="content-fold-section" id="${fold.id}">
                        <h2 class="fold-heading">${escapeHtml(fold.title)}</h2>
                        <div class="fold-text">
                            ${fold.bodyHtml}
                        </div>
                        ${imgHtml}
                    </section>
                `;
            }).join("");
        } else if (blog.rawExtractedHtml) {
            elFoldsContainer.innerHTML = `<div class="fold-text">${blog.rawExtractedHtml}</div>`;
        }
    }

    // FAQ Accordion
    const elFaqSection = document.getElementById("viewFaqSection");
    const elFaqList = document.getElementById("viewFaqList");
    if (blog.faqs && blog.faqs.length > 0) {
        if (elFaqSection) elFaqSection.style.display = "block";
        if (elFaqList) {
            elFaqList.innerHTML = blog.faqs.map((faq, index) => `
                <div class="faq-item ${index === 0 ? 'active' : ''}">
                    <button type="button" class="faq-question-btn" onclick="toggleFaqAccordion(this)">
                        <span>${escapeHtml(faq.question)}</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="faq-answer-panel">
                        <p>${escapeHtml(faq.answer)}</p>
                    </div>
                </div>
            `).join("");
        }
    } else {
        if (elFaqSection) elFaqSection.style.display = "none";
    }

    // Related Blogs Grid
    const elRelatedGrid = document.getElementById("relatedBlogsGrid");
    if (elRelatedGrid) {
        elRelatedGrid.innerHTML = RELATED_BLOGS_POOL.map(item => `
            <div class="related-blog-card">
                <div class="card-img-box">
                    <img src="${item.coverImage}" alt="${escapeHtml(item.title)}" class="card-img" />
                </div>
                <div class="card-body">
                    <span class="card-category-tag">${item.category}</span>
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                    <div class="card-footer">
                        <span>By ${item.author}</span>
                        <span>${item.readMinutes}</span>
                    </div>
                </div>
            </div>
        `).join("");
    }

    // Reset scroll progress bar
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleFaqAccordion(btn) {
    const item = btn.closest(".faq-item");
    if (item) {
        item.classList.toggle("active");
    }
}

// Reading scroll progress bar logic
window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("scrollBodyBar");
    if (!progressBar) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(100, Math.max(0, progressPercent)) + "%";
});

// ============================================================================
// 6. VIEW SWITCHING & LIVE PREVIEW MODES
// ============================================================================

function switchMainView(mode) {
    const adminSection = document.getElementById("adminSection");
    const publicSection = document.getElementById("publicBlogSection");
    const tabAdminBtn = document.getElementById("tabAdminBtn");
    const tabPublicBtn = document.getElementById("tabPublicBtn");
    const previewToolbar = document.getElementById("previewToolbar");

    if (mode === "admin") {
        if (adminSection) adminSection.style.display = "block";
        if (publicSection) publicSection.style.display = "none";
        if (tabAdminBtn) tabAdminBtn.classList.add("active");
        if (tabPublicBtn) tabPublicBtn.classList.remove("active");
        if (previewToolbar) previewToolbar.style.display = "none";
        isLivePreviewMode = false;
        renderAdminTable();
        updateDashboardStats();
    } else {
        if (adminSection) adminSection.style.display = "none";
        if (publicSection) publicSection.style.display = "block";
        if (tabAdminBtn) tabAdminBtn.classList.remove("active");
        if (tabPublicBtn) tabPublicBtn.classList.add("active");
        if (!isLivePreviewMode && previewToolbar) {
            previewToolbar.style.display = "none";
        }
        // If no blog active, render first published or first blog
        if (!activeCurrentBlogId) {
            const blogs = loadBlogs();
            const firstPub = blogs.find(b => b.status === "published") || blogs[0];
            if (firstPub) renderPublicBlog(firstPub.id);
        }
    }
}

function previewBlog(blogId) {
    const blog = getBlogById(blogId);
    if (!blog) return;

    isLivePreviewMode = true;
    switchMainView("public");
    renderPublicBlog(blogId);

    const previewToolbar = document.getElementById("previewToolbar");
    const previewStatusBadge = document.getElementById("previewStatusBadge");
    const previewPublishBtn = document.getElementById("previewPublishBtn");

    if (previewToolbar) previewToolbar.style.display = "flex";
    if (previewStatusBadge) {
        previewStatusBadge.textContent = blog.status.toUpperCase();
        previewStatusBadge.style.background = blog.status === "published" ? "#10b981" : "#f59e0b";
        previewStatusBadge.style.color = blog.status === "published" ? "#fff" : "#111";
    }
    if (previewPublishBtn) {
        previewPublishBtn.textContent = blog.status === "published" ? "Unpublish Blog" : "Publish Blog";
    }
}

function exitPreviewMode() {
    isLivePreviewMode = false;
    const previewToolbar = document.getElementById("previewToolbar");
    if (previewToolbar) previewToolbar.style.display = "none";
    switchMainView("admin");
}

function publishCurrentPreview() {
    if (!activeCurrentBlogId) return;
    togglePublishStatus(activeCurrentBlogId);
    previewBlog(activeCurrentBlogId);
}

function openEditModalFromPreview() {
    if (!activeCurrentBlogId) return;
    openEditModal(activeCurrentBlogId);
}

// ============================================================================
// 7. EDIT MODAL & FORM LOGIC
// ============================================================================

function openEditModal(blogId) {
    const blog = getBlogById(blogId);
    if (!blog) return;

    document.getElementById("editBlogId").value = blog.id;
    document.getElementById("formTitle").value = blog.title || "";
    document.getElementById("formSlug").value = blog.slug || "";
    document.getElementById("formSubtitle").value = blog.subtitle || "";
    document.getElementById("formAuthor").value = blog.author?.name || "Editorial Team";
    document.getElementById("formReviewer").value = blog.doctor?.name || "Dr. Ananthakrishnan Chandrasekhar, MD";
    document.getElementById("formCategory").value = blog.category || "Contagion";
    document.getElementById("formReadMinutes").value = blog.readMinutes || 4;
    document.getElementById("formCoverUrl").value = blog.coverImage || "";

    // Serialize body folds
    let bodyContent = "";
    if (blog.folds && blog.folds.length > 0) {
        bodyContent = blog.folds.map(f => `<h2>${f.title}</h2>\n${f.bodyHtml}`).join("\n\n");
    } else if (blog.rawExtractedHtml) {
        bodyContent = blog.rawExtractedHtml;
    }
    document.getElementById("formContentBody").value = bodyContent;

    // Serialize FAQs
    document.getElementById("formFaqsJson").value = JSON.stringify(blog.faqs || [], null, 2);

    document.getElementById("editModalHeaderTitle").textContent = `Edit Blog: ${blog.title.slice(0, 30)}...`;
    document.getElementById("editModalBackdrop").classList.add("active");
}

function openNewBlogModal() {
    document.getElementById("editBlogId").value = "";
    document.getElementById("formTitle").value = "New Healthcare Article";
    document.getElementById("formSlug").value = "new-healthcare-article";
    document.getElementById("formSubtitle").value = "Summary and clinical overview of the topic.";
    document.getElementById("formAuthor").value = "Shubhechhya Mukherjee";
    document.getElementById("formReviewer").value = "Dr. Ananthakrishnan Chandrasekhar, MD";
    document.getElementById("formCategory").value = "Contagion";
    document.getElementById("formReadMinutes").value = "4";
    document.getElementById("formCoverUrl").value = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80";
    document.getElementById("formContentBody").value = `<h2>Introduction</h2>\n<p>Start writing your clinical article content here or paste HTML.</p>\n\n<h2>Clinical Diagnosis & Management</h2>\n<p>Describe treatment options and symptoms.</p>`;
    document.getElementById("formFaqsJson").value = JSON.stringify([
        { question: "What is the primary treatment?", answer: "Follow recommended protocols and consult a physician." }
    ], null, 2);

    document.getElementById("editModalHeaderTitle").textContent = "Create New Blog Post";
    document.getElementById("editModalBackdrop").classList.add("active");
}

function closeEditModal() {
    document.getElementById("editModalBackdrop").classList.remove("active");
}

function submitBlogForm(desiredStatus) {
    const blogId = document.getElementById("editBlogId").value || "blog-" + Date.now();
    const existing = getBlogById(blogId) || {};

    let faqsParsed = [];
    try {
        const faqsRaw = document.getElementById("formFaqsJson").value.trim();
        if (faqsRaw) faqsParsed = JSON.parse(faqsRaw);
    } catch (e) {
        console.warn("Could not parse FAQs JSON, keeping existing:", e);
        faqsParsed = existing.faqs || [];
    }

    const title = document.getElementById("formTitle").value.trim();
    const slug = document.getElementById("formSlug").value.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const rawBody = document.getElementById("formContentBody").value;

    // Convert raw body into folds
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${rawBody}</div>`, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3"));
    const folds = [];
    const keyTakeaways = [];

    if (headings.length > 0) {
        headings.forEach((h, i) => {
            const foldId = `fold-${i + 1}`;
            keyTakeaways.push({ text: h.textContent.trim(), foldId: foldId });

            let bodyHtml = "";
            let sib = h.nextElementSibling;
            while (sib && !/^H[2-3]$/i.test(sib.tagName)) {
                bodyHtml += sib.outerHTML;
                sib = sib.nextElementSibling;
            }
            folds.push({
                id: foldId,
                title: h.textContent.trim(),
                bodyHtml: bodyHtml || "<p>Section details.</p>",
                image: null
            });
        });
    } else {
        folds.push({
            id: "fold-1",
            title: "Content",
            bodyHtml: rawBody,
            image: null
        });
        keyTakeaways.push({ text: "Content", foldId: "fold-1" });
    }

    keyTakeaways.push({ text: "FAQs", foldId: "viewFaqSection" });

    const updatedBlog = {
        ...existing,
        id: blogId,
        title: title,
        slug: slug,
        subtitle: document.getElementById("formSubtitle").value.trim(),
        category: document.getElementById("formCategory").value.trim() || "Contagion",
        status: desiredStatus || existing.status || "draft",
        author: {
            name: document.getElementById("formAuthor").value.trim(),
            avatar: existing.author?.avatar || "https://kofuku-staging-cms.s3.ap-south-1.amazonaws.com/2_3415176660.png",
            designation: existing.author?.designation || "Content Writer"
        },
        doctor: {
            name: document.getElementById("formReviewer").value.trim(),
            credentials: "MD",
            title: "Internal Medicine Specialist"
        },
        readMinutes: parseInt(document.getElementById("formReadMinutes").value) || 4,
        coverImage: document.getElementById("formCoverUrl").value.trim() || existing.coverImage,
        folds: folds,
        keyTakeaways: keyTakeaways,
        faqs: faqsParsed,
        publishDate: existing.publishDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    };

    upsertBlog(updatedBlog);
    closeEditModal();
    showToast(`Blog saved successfully as ${updatedBlog.status.toUpperCase()}`, "success");
}

function previewFromEditModal() {
    submitBlogForm("draft");
    const blogId = document.getElementById("editBlogId").value;
    if (blogId) {
        previewBlog(blogId);
    }
}

// ============================================================================
// 8. SOCIAL SHARING & UTILITIES
// ============================================================================

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareOnWhatsApp() {
    const title = document.getElementById("viewBlogTitle")?.textContent || "Kofuku Blog";
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${encodeURIComponent(title + " - " + window.location.href)}`, "_blank");
}

function shareOnTwitter() {
    const title = document.getElementById("viewBlogTitle")?.textContent || "Kofuku Blog";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
}

function copyBlogLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("Blog link copied to clipboard!", "success");
    }).catch(() => {
        showToast("Link: " + window.location.href, "success");
    });
}

function toggleBookmark() {
    showToast("Bookmark added to your profile!", "success");
}

function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ============================================================================
// 9. INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Initialize blog store
    loadBlogs();

    // Setup Drag and Drop
    initDocxDropzone();

    // Render Admin Table and Stats
    renderAdminTable();
    updateDashboardStats();

    // Render initial blog for public view
    const blogs = loadBlogs();
    if (blogs.length > 0) {
        renderPublicBlog(blogs[0].id);
    }
});

