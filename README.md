# Event Organizer Website

This is a modern, responsive event organizer company website built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

-   **Dynamic Hero Section**: Image slider with engaging titles and descriptions.
-   **Services Section**: Highlights various event planning services with icons and features.
-   **Testimonials Section**: Displays client reviews.
-   **About Section**: Provides company information, experience, and mission.
-   **Portfolio Section**: Showcases recent successful events.
-   **Contact Section**: Includes contact information and a form.
-   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
-   **Animations**: Smooth scroll, fade-in, and other subtle animations for an enhanced user experience.
-   **Image Gallery Page**: A dedicated page to showcase event images.
-   **Enhanced Navigation**: Aesthetic and animated navigation with smooth scroll.

## Technologies Used

-   Next.js (App Router)
-   React
-   Tailwind CSS
-   shadcn/ui
-   Lucide React (icons)

## Getting Started

1.  **Clone the repository:**
    \`\`\`bash
    git clone <repository-url>
    cd event-organizer-website
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`
3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project can be easily deployed to Vercel.

1.  **Install Vercel CLI (if not already installed):**
    \`\`\`bash
    npm i -g vercel
    \`\`\`
2.  **Deploy:**
    \`\`\`bash
    vercel
    \`\`\`
    Follow the prompts to deploy your project.

## Project Structure

\`\`\`
.
├── app/
│   ├── gallery/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── navigation.tsx
│   ├── scroll-progress.tsx
│   ├── smooth-scroll.tsx
│   ├── theme-provider.tsx
│   └── ui/ (shadcn/ui components)
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── public/
│   └── images/ (event images)
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── tsconfig.json
└── package.json
