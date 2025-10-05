'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/constants';

export default function HomeActions() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <>
          <Link href={ROUTES.DASHBOARD}>
            <Button size="lg" className="text-lg px-8 cursor-pointer">
              Go to Dashboard
            </Button>
          </Link>
          <Link href={ROUTES.CALORIES}>
            <Button size="lg" variant="outline" className="text-lg px-8 cursor-pointer">
              Search Calories
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="text-lg px-8 cursor-pointer">
              Get Started Free
            </Button>
          </Link>
          <Link href={ROUTES.LOGIN}>
            <Button size="lg" variant="outline" className="text-lg px-8 cursor-pointer">
              Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
