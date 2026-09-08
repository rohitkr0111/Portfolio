# Rohit Kumar — Developer Portfolio

A modern, responsive developer portfolio built with **React 19 and Vite** to showcase my projects, technical skills, experience, services, and contact information.

The portfolio focuses on a clean user experience, interactive animations, responsive layouts, persistent theme preferences, and reusable React components.

🌐 **Live Portfolio:** https://rohitkumar7004.netlify.app/

---

## ✨ Highlights

* Responsive single-page portfolio for desktop, tablet, and mobile
* Dark/light theme with `localStorage` persistence
* Animated hero section with typewriter effect and particle background
* Interactive skills marquee and animated statistics
* Data-driven services and project sections
* Interactive project cards with tilt and glare effects
* Functional contact form powered by Web3Forms
* Resume preview, download, and new-tab viewing
* Scroll progress indicator
* Custom cursor for desktop devices
* Toast-based form submission feedback
* Reusable component-based architecture

---

## 🛠️ Tech Stack

| Category      | Technologies                    |
| ------------- | ------------------------------- |
| Frontend      | React 19, JavaScript            |
| Build Tool    | Vite 6                          |
| Styling       | CSS, Tailwind CSS               |
| Animation     | Framer Motion, CSS animations   |
| Navigation    | React Anchor Link Smooth Scroll |
| Form Handling | Web3Forms API                   |
| State / Theme | React Context API, localStorage |
| Development   | ESLint, npm                     |

---

## 🏗️ Project Structure

```text
src/
├── assets/
│   ├── mywork_data.js
│   └── services_data.js
│
├── components/
│   ├── navbar/
│   ├── Hero/
│   ├── Marquee/
│   ├── About/
│   ├── Services/
│   ├── Work/
│   ├── Contact/
│   ├── ResumeModal/
│   ├── ScrollProgress/
│   ├── CustomCursor/
│   ├── GrainOverlay/
│   ├── Footer/
│   └── Loader.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── App.jsx
├── App.css
├── index.css
├── theme.css
└── main.jsx
```

The application follows a component-based structure to keep individual sections isolated, reusable, and easier to maintain.

---

## 🔧 Technical Implementation

### Theme Management

The portfolio uses React Context to manage the selected theme.

Theme preferences are persisted using `localStorage`, allowing the selected theme to remain active across page reloads.

### Data-Driven Content

Project and service information is separated from UI components:

* `mywork_data.js` → project information
* `services_data.js` → service information

This makes portfolio content easier to update without modifying the component structure.

### Interactive UI

The interface includes several custom interactions:

* Animated particle background
* Typewriter role animation
* Skills marquee
* Project card tilt/glare effects
* Scroll progress indicator
* Custom cursor
* Grain overlay
* Animated counters
* Responsive navigation

### Contact Form

The contact form submits user messages through the **Web3Forms API** and provides loading, success, and error feedback.

### Resume Integration

The resume is integrated directly into the application through a modal interface supporting:

* Inline PDF preview
* Download
* Opening the resume in a new tab

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm

### Installation

```bash
git clone https://github.com/rohitkr0111/Portfolio.git

cd Portfolio

npm install
```

### Development

```bash
npm run dev
```

The application will be available on the local development server.

### Production Build

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

---

## 📌 Why I Built This

I built this portfolio as a central place to present my software development work while also experimenting with modern frontend techniques such as component-driven architecture, animation, responsive design, theme management, and API-based form handling.

The project also serves as a practical example of how I approach building polished frontend experiences rather than relying only on static layouts.

---

## 👨‍💻 About Me

I'm **Rohit Kumar**, a Computer Science undergraduate and Full Stack Developer interested in building scalable web applications and AI-powered products.

My primary interests include:

* Full Stack Development
* React & TypeScript
* Node.js & REST APIs
* MongoDB
* Next.js
* AI/LLM Applications
* Developer Tools

---

## 📫 Connect

* **Portfolio:** https://rohitkumar7004.netlify.app/
* **GitHub:** https://github.com/rohitkr0111

---

⭐ If you find this project useful or interesting, feel free to explore the repository.
