# 🎭 Artistly

[![Next.js](https://img.shields.io/badge/Framework-Next.js-blue)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/UI-shadcn%2Fui-red)](https://ui.shadcn.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![React Hook Form](https://img.shields.io/badge/Form-react--hook--form-yellowgreen)](https://react-hook-form.com/)
[![GSAP](https://img.shields.io/badge/Animations-GSAP-88CE02)](https://greensock.com/gsap/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer--Motion-ff69b4)](https://www.framer.com/motion/)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel-black)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🔥 Overview

**Artistly** is a modern artist discovery and onboarding platform built with **Next.js**. It allows users to browse performing artists by category, filter them based on preferences, and onboard new artists via a structured, validated form. Designed for performance, accessibility, and responsive UI, it's perfect for real-world web development evaluations.

---

## 🧩 Pages Implemented

### ✅ 1. Homepage
- Overview of the platform
- Hero section with CTA buttons
- 3–4 artist category cards (Singers, Dancers, Speakers, DJs)
- Responsive navigation bar linking to onboard and listing pages

### ✅ 2. Artist Listing Page
- Grid layout for reusable artist cards
- Each card shows:
  - Artist Name
  - Category
  - Price Range
  - Location
  - "Ask for Quote" CTA
- Filter controls:
  - Category
  - Price Range
  - Location
- Data populated using dummy JSON or static API

### ✅ 3. Artist Onboarding Page
- Multi-section artist form using `react-hook-form`
- Inputs:
  - Name, Bio
  - Category (multi-select with checkboxes)
  - Languages Spoken (multi-select)
  - Fee Range
  - Profile Image Upload
  - Location
- Validated with Yup and React Hook Form
- Submit to console or mock API
- Save as Draft (to `localStorage`) + Restore Draft on Reload

---

## 🎯 Task and Status

| ✅ Task                        | 💡 Status |
|-----------------------------------|-----------|
| Filter Logic Working              | ✔️        |
| Component Reuse (Card, Filters)   | ✔️        |
| Mobile Responsive Design          | ✔️        |
| Form Validation & State Mgmt      | ✔️ useForm + useState/useContext |
| Side Effect Handling              | ✔️ useEffect used for hydration, restoration |
| Code Structure                    | ✔️ Modular, neat folder hierarchy |
| Hosting on Vercel                 | ✔️ [Live Site](https://artistly-lyart.vercel.app/) |
| SEO Optimized                     | ✔️ Head tags, meta & image alt attributes |
| Commented Code                    | ✔️ Basic inline comments |
| Data Fetching                     | ✔️ getStaticProps / API simulation |

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + Yup
- **Routing & Navigation**: Next.js Routing with `<Link>`
- **Animations**: [GSAP](https://greensock.com/gsap/) + [Framer Motion](https://www.framer.com/motion/)
- **State Management**: `useState`, `useContext`, `useEffect`
- **Form Persistence**: `localStorage`
- **Hosting**: [Vercel](https://vercel.com/)

---


## ⚙️ Running Locally

```bash
git clone https://github.com/neeleshkr22/Artistly.git
cd Artistly
yarn install
yarn dev
```

---

## 🌐 Live Demo

[View deployed site on Vercel →](https://your-vercel-url.vercel.app)

---

## 💡 Core Concepts Demonstrated

- ✅ Working knowledge of `useState`, `useEffect`, `useContext`
- ✅ Form handling with `react-hook-form`
- ✅ Filter logic using controlled components
- ✅ `getStaticProps` for pre-rendered data fetching
- ✅ `localStorage` draft persistence
- ✅ GSAP & Framer Motion for smooth animations

---

## 📸 Screenshots

> Add real screenshots here showcasing:
> - Homepage hero & cards  
> - Listing with working filters  
> - Onboarding form with dropdowns and image upload  

---

## ✅ To-Do (Optional Enhancements)

- [ ] Integrate real backend or GraphQL mock API
- [ ] Add image cloud upload (e.g., Cloudinary)
- [ ] Add user login & profile management
- [ ] Notifications for quotes and artist messages

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/artistly/issues).

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👏 Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)