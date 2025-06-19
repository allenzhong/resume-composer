# Resume Composer

[🌐 Live Demo](https://resume-composer-trial.netlify.app/)

A modern, professional, and highly customizable resume builder built with React, Vite, DaisyUI, and TypeScript.

## ✨ Features

- **Beautiful, Responsive UI**: Clean, modern design with DaisyUI and Tailwind CSS
- **Tab Navigation**: Easily switch between Dashboard, Personal Info, Experience, Education, Skills, and Preview
- **Live Preview**: See your resume update in real time as you edit
- **Markdown Support**: Use markdown in descriptions for rich formatting (bold, italic, lists, links)
- **Accordion Sections**: Collapsible form sections for a focused editing experience
- **Reusable Components**: Floating label inputs, textareas, and more for consistent UX
- **Mock Data Loader**: Instantly load a sample professional resume to see the app in action
- **Global State Management**: All data is synced across pages using React Context
- **Print & PDF Ready**: Print or export your resume with professional formatting and minimal margins
- **No Login Required**: All data is local and private

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript**
- **DaisyUI** (Tailwind CSS)
- **Lucide React** (icons)
- **React Router v6**

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## 📝 Usage

- **Dashboard**: Overview and quick start. Click "Load Sample Resume" to see a pre-filled professional example.
- **Personal Info**: Enter your name, contact details, address, summary, and social links.
- **Experience**: Add multiple jobs, each with markdown-enabled descriptions.
- **Education**: Add degrees, certifications, and achievements.
- **Skills**: Organize skills by category, add proficiency and details.
- **Preview**: See your resume as it will appear to employers. Print or export as PDF (with navigation and controls hidden).

## 🖨️ Print & PDF Export
- Click the **Print** button on the Preview page for a clean, professional printout.
- Margins are optimized for maximum content width (top: 0.24in, sides/bottom: 0.08in).
- Navigation and controls are hidden automatically when printing/exporting.

## 💡 Customization
- All form sections are modular and easy to extend.
- Add new fields, categories, or templates as needed.
- Styles and layout can be easily tweaked via Tailwind/DaisyUI.

## 📦 Project Structure

```
resume-composer/
  src/
    components/         # Reusable UI components
    context/            # Global state management (ResumeProvider)
    data/               # Mock resume data
    hooks/              # Custom React hooks
    pages/              # Main app pages (PersonalInfo, Experience, etc.)
    style.css           # Tailwind & global styles
    App.tsx             # Main app shell and routing
    main.tsx            # Entry point
  README.md
  package.json
  ...
```

## 🛡️ License

This project is open source and free to use for personal and professional purposes.

---

**Resume Composer** — Build your perfect resume, your way.
