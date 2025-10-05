import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, Search, FileQuestion } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const NotFound = () => {
    return (
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <FileQuestion className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-4xl mb-2">404 - Page Not Found</CardTitle>
                    <CardDescription className="text-base">
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Link href={ROUTES.HOME} className="w-full">
                        <Button className="w-full" size="lg">
                            <Home className="mr-2 h-5 w-5" />
                            Go to Home
                        </Button>
                    </Link>
                    <Link href={ROUTES.DASHBOARD} className="w-full">
                        <Button variant="outline" className="w-full" size="lg">
                            <Search className="mr-2 h-5 w-5" />
                            Go to Dashboard
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

export default NotFound;
