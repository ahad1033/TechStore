import { Link } from "react-router-dom";
import { Star, Laptop, Smartphone, Headphones, ArrowRight } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
    <section className="w-full bg-gradient-to-tl from-primary via-gray-100 to-secondary/100">
      <div
        className="
      container section-padding mb-12 
      grid grid-cols-1 md:grid-cols-2 
      min-h-[auto] 
      md:min-h-[400px] 
      lg:min-h-[480px] 
      xl:min-h-[550px]
      items-center
    "
      >
        <div className="flex items-center justify-start">
          <div className="space-y-4 lg:space-y-6 max-w-xl">
            <Badge
              variant="default"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm"
            >
              <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
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

            <Link to="/products">
              <Button size="md" className="text-base px-6 py-3 mb-5">
                Shop Now
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>

            <div className="hidden md:grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
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
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-xl p-4 sm:p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
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

            <div className="absolute -top-5 -left-5 bg-white rounded-xl shadow-lg p-3 transform -rotate-6 hover:rotate-0 transition-transform duration-300 hidden sm:flex">
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

            <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-lg p-3 transform rotate-6 hover:rotate-0 transition-transform duration-300 hidden sm:flex">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredProducts[2].image}
                    alt={featuredProducts[2].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-xs text-black">
                    {featuredProducts[2].name}
                  </h4>
                  <div className="flex items-center space-x-0.5">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">
                      {featuredProducts[2].rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-3 z-0">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Headphones className="w-5 h-5 text-primary" />
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Laptop className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
