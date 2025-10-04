# Meal Calorie Count Generator - Frontend

A production-ready Next.js application for tracking meal calories using the USDA FoodData Central API.

## Features

- User authentication (register/login)
- Calorie lookup by dish name and servings
- Meal history tracking
- Responsive design with dark/light mode
- Type-safe with TypeScript
- State management with Zustand

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Validation**: Zod + React Hook Form
- **HTTP Client**: Axios

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Backend server running (see backend repo)

### Installation

1. Clone the repository:

git clone <your-repo-url>
cd meal-calorie-fe


2. Install dependencies:
npm install


3. Create `.env.local` file:
cp .env.example .env.local


4. Update the backend URL in `.env.local`:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000


5. Run the development server:

pnpm run dev


6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

├── app/ # Next.js App Router pages
├── components/ # Reusable React components
├── lib/ # Utility functions and API calls
├── stores/ # Zustand state stores
├── types/ # TypeScript type definitions
└── public/ # Static assets


## Key Design Decisions

### Authentication
- JWT tokens stored in localStorage via Zustand persist
- Axios interceptors for automatic token injection
- Route guards using custom `useAuthGuard` hook

### State Management
- Zustand for auth state and meal history
- Persisted to localStorage for session continuity
- Keeps last 10 meal searches in history

### Form Validation
- Zod schemas for runtime type validation
- React Hook Form for form state management
- Client-side validation with user-friendly error messages

### UI/UX
- Mobile-first responsive design
- Loading states and error handling
- Dark/light mode support
- Accessible components via shadcn/ui

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

Deploy to Vercel:


Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_BASE_URL`: Your backend API URL

## Screenshots

[Add screenshots here]

## Live Demo

[Add deployed URL here]

## Future Enhancements

- Add macro nutrient breakdown
- Implement meal planning features
- Add data visualization for calorie trends
- Export meal history to CSV
