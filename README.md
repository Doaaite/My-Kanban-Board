This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


📋 Kanban Board - Technical Assessment
🚀 Project Overview
A fully-featured, single-user Kanban board application built with Next.js 14 App Router, TypeScript, and Tailwind CSS. The application allows users to manage personal tasks across three columns (To Do, In Progress, Completed) with full CRUD operations, persistent storage, and multiple bonus features.

📦 Tech Stack
Technology	Version	Purpose
Next.js	14.2.5	React framework with App Router
React	18.3.1	UI library
TypeScript	5.5.3	Type-safe JavaScript
Tailwind CSS	3.4.6	Utility-first CSS framework
LocalStorage	-	Client-side data persistence
✨ Core Features
1. Board Structure
Three fixed columns: To Do, In Progress, Completed

Real-time card count per column

Fully responsive (375px mobile → desktop)

Visual distinction with color-coded columns

2. Card Management
Create: Add cards with required title and optional description

Move: Transfer cards between columns using:

Keyboard-accessible dropdown menu

Drag and Drop (bonus)

Delete: Remove cards with confirmation step

Edit: Modify title, description, and due date (bonus)

3. Persistence & Resilience
Automatic save to localStorage after every change

Safe recovery from:

Missing localStorage keys

Malformed JSON data

Corrupted state

Falls back to empty board gracefully

4. Accessibility
ARIA labels on all interactive elements

Keyboard-navigable menus and forms

Auto-focus on form inputs

Semantic HTML structure

🎁 Bonus Features
1. Card Editing ✏️
Click the edit icon (✏️) on any card

Inline editing of title, description, and due date

Save or cancel changes

Visual feedback with blue border during editing

Accessible with keyboard

2. Due Dates 📅
Add deadlines when creating or editing tasks

Visual color-coding based on urgency:

🔴 Red: Overdue (past due date)

🟠 Orange: Due within 2 days

🟡 Yellow: Due within 5 days

🟢 Green: More than 5 days remaining

"⚠️ Overdue" warning for late tasks

Prevents selecting past dates when creating new tasks


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# My-Kanban-Board" 
