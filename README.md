# Portfolio

A modern personal portfolio website built with **React + Vite**.

## Overview

This project is a single-page portfolio for Rohit Kumar.  
It highlights profile details, services, projects, and contact information with animated UI effects and theme switching.

## Tech Stack

- **Frontend:** React 19
- **Build Tool:** Vite 6
- **Styling:** CSS modules/files + Tailwind dependency available
- **Animation/Interaction:** Framer Motion (dependency), custom CSS/JS effects
- **Navigation:** `react-anchor-link-smooth-scroll`
- **Form Backend:** Web3Forms API (contact form submission)

## Key Features

- Responsive single-page layout
- Dark/light theme toggle with persistence (`localStorage`)
- Interactive hero section:
  - typewriter role text
  - animated particles canvas
  - floating skill bubbles
- About section with:
  - animated skill bars
  - count-up stats
- Services section from data-driven card list
- Portfolio/work showcase with:
  - project metadata
  - tilt + glare card interaction
  - external live links
- Contact section with:
  - details/social links
  - working form submission + success/error toast
- Resume modal with inline PDF preview, download, and new-tab actions
- Custom cursor and top scroll progress indicator
- Global grain overlay visual effect

## Project Structure

```text
src/
├── main.jsx                     # React entry, wraps App with ThemeProvider
├── App.jsx                      # Main page composition and modal state
├── App.css
├── index.css
├── theme.css                    # Theme token styles
├── assets/
│   ├── mywork_data.js           # Portfolio cards data
│   └── services_data.js         # Services list data
├── context/
│   └── ThemeContext.jsx         # Theme context and toggle logic
└── components/
    ├── navbar/                  # Desktop/mobile navbar + section highlighting
    ├── Hero/                    # Hero UI, canvas particles, typewriter effect
    ├── Marquee/                 # Infinite skills marquee
    ├── About/                   # Bio, skills, and animated stats
    ├── Services/                # Services cards from assets data
    ├── Work/                    # Project gallery with interactive cards
    ├── Contact/                 # Contact form + Web3Forms submission
    ├── ResumeModal/             # PDF resume modal viewer
    ├── ScrollProgress/          # Page scroll progress bar
    ├── CustomCursor/            # Enhanced cursor for non-touch devices
    ├── GrainOverlay/            # Full-screen grain texture effect
    ├── Footer/                  # Footer links and contact snippet
    └── Loader.jsx               # Optional loading component (currently unused)
```

## Component Flow

1. `main.jsx` mounts the app and injects `ThemeProvider`.
2. `App.jsx` renders all page sections in order and controls `ResumeModal` open/close state.
3. `navbar` links to section IDs (`home`, `about`, `services`, `work`, `contact`) and updates active item by intersection observer.
4. `ThemeContext` applies `data-theme` to `<html>` and stores selected theme in `localStorage` key `rk-theme`.

## Data-Driven Sections

- `src/assets/services_data.js` controls service cards content.
- `src/assets/mywork_data.js` controls project image/link listing.
- `src/components/Work/Work.jsx` adds additional project metadata (`PROJECT_META`) like description/tags.

## Contact Form Details

- Submits `FormData` to `https://api.web3forms.com/submit`
- Includes `access_key` and message fields
- Shows success/error toast and submit loading state

## Getting Started

### Prerequisites

- Node.js (recommended latest LTS)
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Notes

- Resume file expected at: `public/Rohit_Kumar.pdf`
- Theme defaults to `dark` on first load
- Some assets and profile content are personalized for the portfolio owner
