import { Card } from "../ui/card";

const FeaturedProductSkeletonCard = () => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 pt-0 pb-2">
      {/* Product Image Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse"></div>

      <div className="px-4 py-2">
        {/* Category Badge Skeleton */}
        <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>

        {/* Product Title Skeleton */}
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-5 w-1/2 bg-gray-200 rounded mb-3 animate-pulse"></div>

        {/* Price Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedProductSkeletonCard;
