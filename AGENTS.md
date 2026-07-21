# CLAUDE.md - Project Directives & Constraints

## 📌 Project Context
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Primary Goal:** Maintain clean code structure, high-performance UI components, and strict type safety.

---

## 🛠️ Commands & Scripts
- **Development Server:** `npm run dev`
- **Build Project:** `npm run build`
- **Linting:** `npm run lint`
- **Install Dependencies:** `npm install <package>` (Always ask before installing new major libraries)

---

## 🛑 Critical Rules & Constraints (DO NOT VIOLATE)

### 1. Git & Workflow Operations
- **NO Push Permissions:** Do NOT attempt to run `git push`, create remote branches, or interact with origin remotes unless explicitly instructed.
- **Local Scope Only:** Keep all file edits confined strictly to the local workspace.
- **Branch Discipline:** Work only on the current checked-out branch. Ask before creating new local branches.

### 2. Code Modifications & Safety
- **No Unrequested Refactoring:** Do NOT rewrite existing components, move folders, or change project architecture unless explicitly requested.
- **Incremental Edits:** Modify *only* the specific files or functions mentioned in the prompt.
- **Preserve Existing Logic:** Keep existing state logic, hooks, and audio/media references intact when styling or updating layouts.

### 3. Architecture & Style Standards
- **TypeScript:** Strict typing required. Avoid using `any`. Define interfaces in local files or dedicated type files.
- **Component Design:** Keep UI components modular in `/components`. Page routes reside in `/app`.
- **UI/Tailwind:** Use Utility classes cleanly. Do not invent custom CSS classes unless adding them to `globals.css`.

---

## 📋 Task Execution Protocol
Before executing any multi-file change or complex feature request:
1. **Analyze:** Inspect the target files.
2. **Plan:** State the proposed changes in 3-4 bullet points and list affected files.
3. **Confirm:** Wait for user approval if the change affects core logic or configuration (`package.json`, `tailwind.config`, `tsconfig`).
4. **Execute:** Apply minimal, clean code edits.
5. **Verify:** Check for syntax or linting errors.

## 💡 Content Expansion & Recommendations (Ideation Protocol)

### Theme Baseline
- **Web Theme:** Interactive Romantic Birthday Gift Web App (`gift-hbd`).
- **Core Elements:** Countdown, Letters, Memories/Gallery, Music, Surprises, Interactive Cards.

### When Asked for Content Recommendations:
1. **Context Analysis:** First scan existing components in `/components` (e.g., `Countdown`, `PolaroidSection`, `TimelineSection`, `SurpriseSection`) to avoid recommending duplicates.
2. **Interactive & Emotional Focus:** Suggest content ideas that blend **emotional value** (words, memories, milestones) with **interactive UI/animations** (Framer Motion).
3. **Structured Proposal:** Present recommendations using this format:
   - **Nama Fitur / Konten Baru**
   - **Konsep & Interaksi:** (Bagaimana pengguna berinteraksi)
   - **Mengapa Cocok:** (Alasan relevansi dengan tema web hadiah)
   - **Komponen Dibuat:** (File baru yang disarankan, misal: `components/WishListSection.tsx`)