# ⚡ PULSE. | Minimalist Link Engine

PULSE is a high-end, silver-neon styled link aggregator built with **Next.js 15**, **Tailwind CSS v4**, and **Firebase**. It features a secure admin dashboard to manage links in real-time and a public profile page for world-wide access.

![CI Status](https://github.com/junesdream/pulse_link/actions/workflows/main.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Framework-Next.js_15-black)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

- **Secure Authentication:** Google Login integration via Firebase Auth.
- **Real-time Database:** Instant link updates using Firestore (NoSQL).
- **Modern UI/UX:** Cyberpunk-inspired "Neon Silver" design with Glassmorphism effects.
- **Responsive:** Fully optimized for mobile and desktop views.

---

## 🏗️ Architecture

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router) & Tailwind CSS v4 |
| **Backend** | Firebase (Auth & Firestore) |
| **CI/CD** | Automated testing and linting via GitHub Actions |
| **DevOps** | Multi-stage Docker setup & Vercel Edge Deployment |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Backend** | [Firebase](https://firebase.google.com/) (Auth & Firestore) |
| **Language** | TypeScript |

---

## 📦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/junesdream/pulse_link.git
   cd pulse_link
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:** Create a `.env.local` file and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Commit your changes (`git commit -m 'feat: add your idea'`)
4. Push to the branch (`git push origin feature/your-idea`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — Created by [RainbowDev](https://github.com/junesdream).
