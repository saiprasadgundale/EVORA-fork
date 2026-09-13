# EVORA — Enterprise AI Frontend

Clean, minimalist frontend for **EVORA (Enterprise Vision for Operations, Risk & Analytics)**.

---

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React Server/Client Components)
- **UI & Runtime**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Project Structure

The project strictly follows a minimal, standard Next.js App Router structure:

```text
frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard page displaying "Welcome to EVORA"
│   ├── login/
│   │   └── page.tsx        # Login / Authentication page (Google, GitHub, Email)
│   ├── favicon.ico         # Application favicon
│   ├── globals.css         # Clean design system tokens & base styles
│   ├── layout.tsx          # Root layout with Inter font and AuthProvider
│   └── page.tsx            # EVORA Landing Page
│
├── components/
│   ├── AuthForm.tsx        # In-place Sign In & Account Creation form
│   ├── CTA.tsx             # Conversion call-to-action & footer
│   ├── Features.tsx        # Core platform capabilities breakdown
│   ├── Hero.tsx            # Hero section with animated CTAs
│   ├── HowItWorks.tsx      # 3-step intelligence workflow
│   ├── Navbar.tsx          # Responsive sticky navigation bar
│   └── OAuthButtons.tsx    # Google and GitHub OAuth authentication buttons
│
├── lib/
│   ├── api.ts              # Typed API models & authentication client
│   └── auth.ts             # AuthContext provider, session persistence, guards
│
├── public/                 # Static assets directory
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind theme configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Application dependencies and scripts
```

---

## Application Flow

```text
Landing Page (/)
       ↓
Login / Authentication (/login)
   • Google OAuth
   • GitHub OAuth
   • Email Authentication
       ↓
Dashboard (/dashboard)
       ↓
"Welcome to EVORA"
```

---

## Getting Started

### Development Server
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
Validate types and compile production bundle:
```bash
npm run build
```

### Code Quality & Linting
Run ESLint to check code quality:
```bash
npm run lint
```
