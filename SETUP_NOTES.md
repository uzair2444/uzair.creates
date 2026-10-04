# Uzair Ahmad - Portfolio Website Setup Notes

## Project Location
`F:\Work\uzair.CREATES\Portfolio Website\New`

## How to Run

### Prerequisites
- Node.js installed at `C:\Program Files\nodejs`
- Add to PATH before running commands (if needed):
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

### Development Server
```powershell
cd "F:\Work\uzair.CREATES\Portfolio Website\New"
npm.cmd run dev
```
Site opens at: **http://localhost:3000**

### Production Build
```powershell
npm.cmd run build
```
Generates production-ready static assets in the `dist/` folder.

---

## Tech Stack
- React 19
- Vite 6
- Tailwind CSS 4
- TypeScript
- Framer Motion (motion package)
- Lucide React icons

---

## Admin Mode & Site Controls
- **Access Button**: The ⚙️ Settings gear icon on the top navbar.
- **Admin Password**: `uzair2444`
- **Features**:
  - **Section Reordering**: Use ⬆️/⬇️ buttons on any section or within the Site Settings modal.
  - **Element Nudging**: Hover over hero elements and use arrow controls (▲▼◀▶) to shift positions by 5px.
  - **Profile & Content Editor**: Edit Name, Title, Tagline, Bio, Phone, Email, Location directly in the modal.
  - **Auto-Save to Source**: All layout and content changes write directly into `src/positions.json` and `src/siteContent.json`.
  - **Auto-Publish**: Automatically triggers a background production build (`dist/`) so any viewer sees the updated website.
  - **Security**: Includes a **🔒 Lock** button in the Admin bar to immediately log out and protect admin controls.

---

## Theme Configuration
- **Primary Theme**: Luxury Dark Obsidian Studio Theme
- **Background**: `#0B0C10` (deep luxury obsidian base with smooth ambient lighting)
- **Accent Color**: `#FF0000` (crimson red)
- **Text Color**: `#F3F4F6` (crisp white) & muted text `#A1A1AA`
- **Glassmorphism**: Frosted glass panels with subtle inner highlights and glows (`.glass-panel`, `.glass-card`, `.glass-pill`)

---

## Project Structure
```
New/
├── index.html
├── package.json
├── positions.json             (Synced root layout configuration)
├── vite.config.ts
├── vite-plugin-positions.ts   (Handles /api/positions, /api/content, /api/publish)
├── tsconfig.json
├── dist/                      (Compiled production website for public viewers)
├── public/
│   ├── bg-still-dark.svg
│   ├── hero-image.png
│   ├── logo.png
│   └── product-design/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css              (Glassmorphism styles & design system)
    ├── data.ts
    ├── types.ts
    ├── positions.json         (Main source layout offsets & section order)
    ├── siteContent.json       (Main source editable profile info)
    ├── context/
    │   ├── AdminContext.tsx   (Password auth, layout state & save APIs)
    │   └── ThemeContext.tsx
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── About.tsx
        ├── Services.tsx
        ├── Portfolio.tsx
        ├── Journey.tsx
        ├── MarqueeStrip.tsx
        ├── FAQ.tsx
        ├── Contact.tsx
        ├── Footer.tsx
        ├── MovableElement.tsx
        ├── AdminPasswordModal.tsx
        └── AdminSettingsModal.tsx
```

---

## Date: September 22, 2026
