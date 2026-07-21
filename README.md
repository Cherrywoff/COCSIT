# COCSIT College Portal Project

Welcome to the repository for the **COCSIT College Portal** rebuild project. This workspace has been organized into a professional folder structure:

```text
COCSIT/
├── docs/                      # Technical audits, reports, and rebuild proposals (HTML format)
│   ├── website_audit.html     # Security, speed, and design audit report
│   └── rebuild_proposal.html  # System layout and database role blueprints
├── content_source/            # Extracted content data from current website (JSON catalogs)
│   ├── README.md              # Information catalog map
│   ├── branding.json          # College branding and metadata
│   ├── departments_and_staff.json  # Administrative staff and department HOD lists
│   ├── courses.json           # Undergraduate & Postgraduate programs list
│   └── placement_partners.json # Placement details and corporate hiring partners
├── frontend/                  # Modern client-side application (React / Next.js)
│   └── README.md
└── backend/                   # Backend application server and secure API (Node.js / Express)
    └── README.md
```

## Reading the Reports & Content Source
* To study the audit details and conceptual proposal, look inside the **`docs/`** directory.
* To review or add new raw text information about the college, look inside the **`content_source/`** directory.
* You can open any HTML or JSON file directly in your web browser or code editor for easy reading.

---

## ☁️ Supabase Cloud Database Integration & Setup

### 1. Supabase Credentials Needed
Create a `.env` file in both `backend` and `frontend` directories with the following keys from your Supabase dashboard:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Database Schema Creation (SQL Migration)
1. Open the [Supabase Dashboard](https://supabase.com).
2. Go to your project's **SQL Editor** tab.
3. Copy the contents of the [supabase_schema.sql](file:///c:/Users/radhe/OneDrive/Desktop/COCSIT/supabase_schema.sql) file.
4. Paste the queries into the editor and click **Run**.
5. This will automatically configure all necessary relational tables (`users`, `student_details`, `notices`, `attendance`, `grades`, `fees_ledger`, `assignments`, `assignment_submissions`, `study_materials`, `website_settings`) and seed the initial master visual editor variables.

