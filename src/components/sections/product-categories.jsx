import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Gamepad2 } from "lucide-react";

import { useGetCategoriesQuery } from "@/store/features/categoriesApi";

import SectionHeading from "../shared/section-heading";
import CategoryCardSkeleton from "../skeleton/category-card-skeleton";

const ProductCategories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery({
    page: 1,
    limit: 8,
  });

  return (
    <section className="">
      <div className="container section-padding">
        <SectionHeading
          title="Shop by Category"
          subtitle="Discover our wide range of technology products organized by category.
        Find exactly what you're looking for with our curated collections."
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))
            : categories?.data?.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 py-0 dark:bg-background/10 border-black/10 dark:border-white/5">
                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Overlay with smooth transition */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 opacity-100 group-hover:opacity-90"></div>

                      {/* Icon */}
                      <div
                        className={`absolute top-4 left-4 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg`}
                      >
                        <Gamepad2 className="h-4 w-4" />
                      </div>

                      {/* Product Count Badge */}
                      <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 hover:bg-white">
                        {(() => Math.floor(Math.random() * (20 - 3 + 1)) + 3)()}{" "}
                        items
                      </Badge>

                      {/* Mobile Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 lg:hidden">
                        <div className="bg-white/80 text-black px-3 py-1 text-sm rounded font-medium text-center shadow">
                          {category.name}
                        </div>
                      </div>
                    </div>

                    {/* Category Info - Hidden on Mobile */}
                    <div className="p-6 hidden lg:block">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {category.description}
                      </p>

                      {/* View More Link */}
                      <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                        View Products
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
