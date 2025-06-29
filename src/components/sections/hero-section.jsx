import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  ArrowRight,
  Play,
  Star,
  ShoppingCart,
  Smartphone,
  Headphones,
  Laptop,
  Watch,
} from "lucide-react";

const HeroSection = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      originalPrice: 1199,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Smartphones",
      rating: 4.8,
      reviews: 1247,
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      price: 349,
      originalPrice: 399,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Audio",
      rating: 4.9,
      reviews: 892,
    },
    {
      id: 3,
      name: "MacBook Air M2",
      price: 1199,
      originalPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      category: "Laptops",
      rating: 4.7,
      reviews: 567,
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="inline-flex items-center space-x-2 px-4 py-2"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>New Arrivals - Up to 40% Off</span>
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover the Latest
                <span className="text-primary block">Tech Innovations</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Explore our curated collection of premium electronics, audio
                equipment, and cutting-edge gadgets. Quality meets innovation at
                TechStore.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Products Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Products */}
          <div className="relative">
            {/* Main Product Showcase */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-4 -right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredProducts[0].image}
                    alt={featuredProducts[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {featuredProducts[0].name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(featuredProducts[0].rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({featuredProducts[0].reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-2xl font-bold text-primary">
                      ${featuredProducts[0].price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${featuredProducts[0].originalPrice}
                    </span>
                  </div>
                </div>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Floating Product Cards */}
            <div className="absolute -top-8 -left-8 bg-white rounded-xl shadow-lg p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredProducts[1].image}
                    alt={featuredProducts[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">
                    {featuredProducts[1].name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">
                      {featuredProducts[1].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-lg p-4 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredProducts[2].image}
                    alt={featuredProducts[2].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">
                    {featuredProducts[2].name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">
                      {featuredProducts[2].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Icons */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Laptop className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current text-gray-100"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-current text-gray-100"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current text-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
