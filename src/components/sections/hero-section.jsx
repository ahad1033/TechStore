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
import { Link } from "react-router-dom";

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
    <section className="relative lg:h-[60vh] bg-gradient-to-tl from-primary via-white to-secondary/100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container section-padding h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div className="space-y-4 lg:space-y-6">
            <Badge
              variant="secondary"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-primary rounded-full text-sm"
            >
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>New Arrivals - Up to 40% Off</span>
            </Badge>

            <div className="space-y-2 lg:space-y-3">
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Discover the Latest
                <span className="block">Tech Innovations</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 max-w-lg">
                Explore our curated collection of premium electronics, audio
                equipment, and cutting-edge gadgets. Quality meets innovation at
                TechStore.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products">
                <Button size="md" className="text-base px-6 py-3">
                  Shop Now
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                disabled
                size="md"
                className="text-base px-6 py-3"
              >
                <Play className="mr-1.5 w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="text-xl font-bold text-gray-900">50K+</div>
                <div className="text-xs text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">10K+</div>
                <div className="text-xs text-gray-600">Products Available</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">24/7</div>
                <div className="text-xs text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>

          <div className="relative scale-75 lg:scale-60 origin-center">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-3 -right-3 bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                Featured
              </div>
              <div className="space-y-3">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredProducts[0].image}
                    alt={featuredProducts[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-black">
                    {featuredProducts[0].name}
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            /* Reduced size */
                            i < Math.floor(featuredProducts[0].rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({featuredProducts[0].reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 mt-1.5">
                    <span className="text-xl font-bold text-primary">
                      ${featuredProducts[0].price}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      ${featuredProducts[0].originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-3 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredProducts[1].image}
                    alt={featuredProducts[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-xs text-black">
                    {featuredProducts[1].name}
                  </h4>
                  <div className="flex items-center space-x-0.5">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">
                      {featuredProducts[1].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-3 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              {" "}
              {/* Reduced position and padding */}
              <div className="flex items-center space-x-2">
                {" "}
                {/* Reduced space-x */}
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                  {" "}
                  {/* Reduced size */}
                  <img
                    src={featuredProducts[2].image}
                    alt={featuredProducts[2].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-xs text-black">
                    {" "}
                    {/* Reduced font size */}
                    {featuredProducts[2].name}
                  </h4>
                  <div className="flex items-center space-x-0.5">
                    {" "}
                    {/* Reduced space-x */}
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />{" "}
                    {/* Reduced size */}
                    <span className="text-xs text-gray-600">
                      {featuredProducts[2].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Icons */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-3">
              {" "}
              {/* Reduced space-x */}
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                {" "}
                {/* Reduced size */}
                <Smartphone className="w-5 h-5 text-primary" />{" "}
                {/* Reduced size */}
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                {" "}
                {/* Reduced size */}
                <Headphones className="w-5 h-5 text-primary" />{" "}
                {/* Reduced size */}
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                {" "}
                {/* Reduced size */}
                <Laptop className="w-5 h-5 text-primary" /> {/* Reduced size */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave - Uncomment if needed */}
        {/* <div className="absolute bottom-0 left-0 right-0">
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
    </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
