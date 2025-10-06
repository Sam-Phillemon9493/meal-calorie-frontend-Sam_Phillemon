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

- **Framework**: Next.js 15 (App Router)
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
```
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
`pnpm install`


3. Create `.env.local` file:
`cp .env.example .env.local`


4. Update the backend URL in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=https://flybackend-misty-feather-6458.fly.dev
```

6. Run the development server:

```pnpm run dev```


6. Open ```[http://localhost:3000](http://localhost:3000)```

## High Level Project Structure

```
app/
├── layout.tsx                    
├── page.tsx                    
├── (auth)/                     
│   ├── login/
│   │   └── page.tsx           
│   └── register/
│       └── page.tsx            
└── (protected)/              
    ├── dashboard/
    │   └── page.tsx            
    └── calories/
        └── page.tsx
components/
├── auth/
│   ├── LoginForm.tsx           
│   └── RegisterForm.tsx         
├── calories/
│   ├── MealForm.tsx             
│   ├── ResultCard.tsx           
│   └── MealHistory.tsx          
├── dashboard/
│   └── DashboardContent.tsx     
├── providers/
│   └── AuthProvider.tsx
|   |__ ThemeProvider.tsx 
├── layout/
    ├── Navbar.tsx              
    └── ThemeToggle.tsx         
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm start` - Start production server
- `pnpm run lint` - Run ESLint

## Deployment

Deploy to Vercel:


Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_BASE_URL`: Your backend API URL

## Screenshots

https://github.com/user-attachments/assets/2ade5ec8-b36b-410b-9406-ce6a91b9ab0f


## Live Demo

https://meal-calorie-frontend-sam-phillemon.vercel.app/

## Future Enhancements

- Add macro nutrient breakdown
- Implement meal planning features
- Add data visualization for calorie trends
- Export meal history to CSV
