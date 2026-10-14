# Kofuku Blog Management & Admin Panel System

> **DOCX-based blog creation, template mapping, preview, and publishing platform**
> Designed according to Kofuku Social's design system and Figma design specifications.

---

## 1. Project Overview & Objective

The **Kofuku Blog Management Admin Panel** enables healthcare editors and administrators to upload Microsoft Word documents (`.docx`), automatically parse and extract their semantic hierarchy (headings, text formatting, bullet/ordered lists, links, embedded images, tables, and FAQs), map them into structured web components, and publish them into a reusable, high-fidelity public blog template matching Kofuku Social's live design.

---

## 2. Architecture & Processing Flow

```
+-----------------------------------------------------------------------------------+
|                                 PROCESSING FLOW                                   |
|                                                                                   |
|  [DOCX File]                                                                      |
|       │                                                                           |
|       ▼                                                                           |
|  [Upload Handler / API]                                                           |
|       │                                                                           |
|       ▼                                                                           |
|  [Mammoth.js Semantic Parser] ──► Extracts: Headings, Paragraphs, Bold/Italics,   |
|       │                                     Lists, Tables, Links & Media Buffers   |
|       ▼                                                                           |
|  [Image Processor] ─────────────► Stores images as base64 / disk uploads          |
|       │                                                                           |
|       ▼                                                                           |
|  [Structured Blog JSON Builder] ─► Generates: Title, Excerpt, Folds, Takeaways,    |
|       │                                      FAQs, Author & Reviewer Metadata     |
|       ▼                                                                           |
|  [Database / JSON Store] ───────► Persistent blog records                         |
|       │                                                                           |
|       ▼                                                                           |
|  [Blog Renderer] ───────────────► 1-to-1 Kofuku Public Template                   |
|       │                                                                           |
|       ├──► [Admin Live Preview Modal] (Save Draft / Publish)                      |
|       └──► [Public Website View]                                                  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Technical Investigation & DOCX Parsing Evaluation

### Why Mammoth.js Was Chosen
DOCX conversion tools generally fall into two categories:
1. **Layout-replicating engines** (e.g., LibreOffice headless, `docx2html` with inline styling): These copy Microsoft Word's pixel-based fonts, margins, page breaks, and arbitrary desktop CSS, resulting in poor responsive web presentation and inconsistent branding.
2. **Semantic element parsers** (**Mammoth.js**): Mammoth was explicitly built to convert `.docx` documents by inspecting document **semantics** (what is a Heading 1, what is a list, what is an italicized citation) rather than replicating Word layout quirks. This ensures document content cleanly inherits the Kofuku design system CSS.

### Evaluation Matrix

| Content Feature | Mammoth Preservation Fidelity | Handling & Storage Approach |
| :--- | :--- | :--- |
| **Title & Headings (H1–H4)** | **Excellent** | Preserves heading hierarchy; mapped directly to section folds. |
| **Inline Formatting (Bold/Italic)** | **Excellent** | Converted to semantic `<strong>` and `<em>` tags. |
| **Unordered & Ordered Lists** | **Excellent** | Converted to standard `<ul>` and `<ol>` tags with proper nesting. |
| **Hyperlinks** | **Excellent** | Converted to `<a href="...">` styled with Kofuku primary blue (`#00b2ed`). |
| **Embedded Images** | **Excellent** | Extracted from binary zip package; converted to Data URIs or stored as persistent image files. |
| **Tables** | **Good** | Converted to semantic `<table>`, `<tr>`, `<td>` with responsive CSS wrappers. |
| **Blockquotes & Callouts** | **Good** | Mapped from Quote styles to styled callout boxes. |
| **Word Shapes & Macros** | *Unsupported* | Omitted (intentional for web security and consistency). |

### Formatting Limitations Documented
- Complex desktop Word formatting such as WordArt, multi-column page layouts, and floating text boxes are flattened or omitted by design.
- Custom drawing shapes (VML / DML canvas shapes) cannot be preserved reliably across browsers and are ignored.
- All styles are intentionally bound to Kofuku's responsive web component stylesheet rather than Word's fixed desktop points/inches.

---

## 4. Database Schema

The structured blog schema is stored in JSON / SQLite / MongoDB:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "KofukuBlog",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "slug": { "type": "string" },
    "subtitle": { "type": "string" },
    "category": { "type": "string" },
    "status": { "type": "string", "enum": ["draft", "published"] },
    "author": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "avatar": { "type": "string" },
        "designation": { "type": "string" }
      }
    },
    "doctor": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "credentials": { "type": "string" },
        "title": { "type": "string" }
      }
    },
    "publishDate": { "type": "string" },
    "readMinutes": { "type": "integer" },
    "coverImage": { "type": "string" },
    "keyTakeaways": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": { "type": "string" },
          "foldId": { "type": "string" }
        }
      }
    },
    "folds": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "title": { "type": "string" },
          "bodyHtml": { "type": "string" },
          "image": { "type": ["string", "null"] }
        }
      }
    },
    "faqs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question": { "type": "string" },
          "answer": { "type": "string" }
        }
      }
    },
    "createdAt": { "type": "string", "format": "date-time" },
    "updatedAt": { "type": "string", "format": "date-time" }
  },
  "required": ["id", "title", "slug", "status", "folds"]
}
```

---

## 5. RESTful Blog CRUD APIs

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/blogs` | List all blogs (supports `?status=published` / `?status=draft`) |
| **GET** | `/api/blogs/:id` | Retrieve blog details by ID |
| **POST** | `/api/blogs` | Create a new blog post |
| **POST** | `/api/blogs/upload` | Upload `.docx` file (Multipart/form-data), parse & extract images |
| **PUT** | `/api/blogs/:id` | Update blog details, metadata, folds, or FAQs |
| **PATCH** | `/api/blogs/:id/publish` | Toggle publish / unpublish status |
| **DELETE**| `/api/blogs/:id` | Delete blog by ID |

---

## 6. How to Run & Test

### Option A: Open Directly in Browser (Client-Side Standalone)
1. Double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox).
2. The application loads immediately with:
   - Built-in seed data replicating the exact Kofuku blog **"Fever and Pyrexia: Why It Happens and How to Manage It"**.
   - Client-side Mammoth.js parser enabled.
3. Test DOCX Upload:
   - Drag and drop the included `sample_fever_guide.docx` directly onto the upload zone.
   - The document will be instantly parsed into structured title, subtitle, headings, folds, and FAQs.
   - An editor dialog opens allowing you to review and tweak fields.
   - Click **"Live Preview"** or **"Save & Publish"**.

### Option B: Run with Node.js Express Backend
1. In the terminal:
   ```powershell
   npm install
   npm start
   ```
2. Open `http://localhost:3000` in your web browser.
3. Uploads will be handled via the backend API with images saved to the `/uploads` directory.

---

## 7. Deliverables Checklist

- [x] **Admin Panel**: Dashboard stats, blog list table, search & status filter, upload zone, edit modal, delete actions.
- [x] **Blog CRUD APIs**: Complete REST API in `server.js` with multer file uploads.
- [x] **DOCX Upload Functionality**: Drag-and-drop & file picker support.
- [x] **DOCX-to-Structured-Blog Conversion**: Robust mapping of headings, body copy, lists, and FAQs.
- [x] **Image Extraction and Storage**: Inline extraction to base64 Data URIs (browser) and disk storage (server).
- [x] **Blog Preview**: Live preview with floating control bar to switch between Draft and Published state.
- [x] **Publish / Unpublish Controls**: Status toggling from table, editor, and preview mode.
- [x] **Frontend Blog Template**: 100% fidelity matching Kofuku's live website (scroll progress, breadcrumbs, hero header, author/doctor reviewer row, key takeaways, content folds, FAQ accordion, related blogs, footer).
- [x] **Database Schema**: Documented in JSON Schema and implemented in persistence layers.
- [x] **Sample DOCX File**: `sample_fever_guide.docx` generated and verified for testing.

