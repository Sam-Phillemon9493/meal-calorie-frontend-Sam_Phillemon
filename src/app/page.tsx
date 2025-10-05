import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import HomeActions from '@/components/home/HomeActions';
import HomeCTA from '@/components/home/HomeCTA';

export default function HomePage() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Accurate Data',
      description: 'Powered by USDA FoodData Central',
      color: 'text-green-600 dark:text-green-500',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your calorie intake with detailed history',
      color: 'text-primary',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant calorie information',
      color: 'text-amber-600 dark:text-amber-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely',
      color: 'text-red-600 dark:text-red-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <div className="inline-block mb-4">
          <span className="text-6xl">🍽️</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Meal Calorie Counter
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Track your meals and monitor your calorie intake with accurate data from
          USDA FoodData Central. Make informed decisions about your nutrition.
        </p>

        <HomeActions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <IconComponent className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <HomeCTA />
    </div>
  );
}
