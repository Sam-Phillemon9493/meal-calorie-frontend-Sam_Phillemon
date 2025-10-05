export const siteConfig = {
    name: "Meal Calorie Counter",
    description: "Track your meal calories with accurate data from USDA FoodData Central",
    url: "https://your-domain.com",
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://flybackend-misty-feather-6458.fly.dev",
    links: {
        github: "https://github.com/yourusername/meal-calorie-frontend",
    },
};

export const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Calories",
        href: "/calories",
    },
];
