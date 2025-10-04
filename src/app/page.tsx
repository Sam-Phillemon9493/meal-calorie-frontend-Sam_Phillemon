import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-4">Meal Calorie Counter</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Track your meals and monitor your calorie intake with accurate data from
        USDA FoodData Central
      </p>
      <div className="flex gap-4">
        <Link href="/register">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
