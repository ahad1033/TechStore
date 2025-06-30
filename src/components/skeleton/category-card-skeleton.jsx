import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <Card className="overflow-hidden py-0">
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="w-full h-full" />

        <Skeleton className="absolute top-4 left-4 w-8 h-8 rounded-lg" />
        <Skeleton className="absolute top-4 right-4 w-16 h-6 rounded-full" />
        <Skeleton className="absolute bottom-3 left-3 right-3 lg:hidden h-6 rounded" />
      </div>

      <div className="p-6 hidden lg:block">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  );
};

export default CategoryCardSkeleton;
