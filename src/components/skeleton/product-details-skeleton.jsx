import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Skeleton */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col space-y-4">
            {/* Product Name Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>

            {/* Category Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>

            {/* Rating Skeleton */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-gray-300 fill-current"
                  />
                ))}
              </div>
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-7 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>

            {/* Features Skeleton */}
            <>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse"></div>
              </div>
            </>

            {/* Quantity Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="flex items-center border border-gray-300 rounded-md">
                <div className="px-3 py-1 h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="px-4 py-1 h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="px-3 py-1 h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex space-x-4">
              <div className="flex-1 h-12 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Features Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-16">
          <div className="grid w-full grid-cols-3 mb-4">
            <div className="h-10 bg-gray-200 rounded-t-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-t-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-t-md animate-pulse"></div>
          </div>

          <Card className="p-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-9/12 animate-pulse"></div>
            </div>
          </Card>
        </div>
      </div>

      {/* Services Section Placeholder (if it's a separate component) */}
      <div className="h-48 bg-gray-100 mt-16 flex items-center justify-center animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
