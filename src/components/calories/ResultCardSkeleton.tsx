import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ResultCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-28" />
                </div>

                <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-48" />
                </div>
            </CardContent>
        </Card>
    );
}
