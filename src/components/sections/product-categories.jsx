import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Tablet,
  Speaker,
} from "lucide-react";

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      icon: <Smartphone className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      productCount: 150,
      description: "Latest mobile devices",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Laptops",
      icon: <Laptop className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      productCount: 89,
      description: "Powerful computing solutions",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      name: "Audio",
      icon: <Headphones className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      productCount: 234,
      description: "Premium sound experience",
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      name: "Smartwatches",
      icon: <Watch className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      productCount: 67,
      description: "Connected lifestyle",
      color: "from-red-500 to-red-600",
    },
    {
      id: 5,
      name: "Photography",
      icon: <Camera className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      productCount: 123,
      description: "Capture perfect moments",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 6,
      name: "Gaming",
      icon: <Gamepad2 className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      productCount: 98,
      description: "Ultimate gaming experience",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 7,
      name: "Tablets",
      icon: <Tablet className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      productCount: 45,
      description: "Portable computing",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 8,
      name: "Speakers",
      icon: <Speaker className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      productCount: 76,
      description: "Immersive audio",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="">
      <div className="container section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of technology products organized by
            category. Find exactly what you're looking for with our curated
            collections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 py-0">
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
                    className={`absolute top-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {category.icon}
                  </div>

                  {/* Product Count Badge */}
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 hover:bg-white">
                    {category.productCount} items
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
