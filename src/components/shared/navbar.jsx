import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Support", path: "/support" },
  ];

  const megaMenuCategories = [
    {
      name: "Electronics",
      icon: <Smartphone className="w-5 h-5" />,
      items: [
        { name: "Smartphones", path: "/products?category=smartphones" },
        { name: "Laptops", path: "/products?category=laptops" },
        { name: "Tablets", path: "/products?category=tablets" },
        { name: "Smartwatches", path: "/products?category=smartwatches" },
      ],
    },
    {
      name: "Audio",
      icon: <Headphones className="w-5 h-5" />,
      items: [
        { name: "Wireless Earbuds", path: "/products?category=earbuds" },
        { name: "Bluetooth Speakers", path: "/products?category=speakers" },
        { name: "Gaming Headsets", path: "/products?category=headsets" },
        { name: "Home Audio", path: "/products?category=home-audio" },
      ],
    },
    {
      name: "Gaming",
      icon: <Gamepad2 className="w-5 h-5" />,
      items: [
        { name: "Gaming Consoles", path: "/products?category=consoles" },
        {
          name: "Gaming Accessories",
          path: "/products?category=gaming-accessories",
        },
        { name: "PC Gaming", path: "/products?category=pc-gaming" },
        { name: "VR Headsets", path: "/products?category=vr" },
      ],
    },
    {
      name: "Photography",
      icon: <Camera className="w-5 h-5" />,
      items: [
        { name: "DSLR Cameras", path: "/products?category=dslr" },
        { name: "Mirrorless Cameras", path: "/products?category=mirrorless" },
        { name: "Lenses", path: "/products?category=lenses" },
        { name: "Accessories", path: "/products?category=camera-accessories" },
      ],
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  T
                </span>
              </div>
              <span className="text-xl font-bold text-gray-900">TechStore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Mega Menu Trigger */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                onMouseEnter={() => setActiveMegaMenu("categories")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu */}
              {activeMegaMenu === "categories" && (
                <div
                  className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-lg border rounded-lg p-6 grid grid-cols-4 gap-6"
                  onMouseEnter={() => setActiveMegaMenu("categories")}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  {megaMenuCategories.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <div className="flex items-center space-x-2 text-primary font-semibold">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.path}
                              className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <Link
              to="/login"
              className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Sign In</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium hidden md:inline">Cart</span>
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="border-t pt-2 mt-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500">
                Categories
              </div>
              {megaMenuCategories.map((category) => (
                <div key={category.name} className="ml-4">
                  <div className="px-3 py-2 text-sm font-medium text-gray-700">
                    {category.name}
                  </div>
                  <ul className="ml-4 space-y-1">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="block px-3 py-1 text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile User Actions */}
            <div className="border-t pt-2 mt-2 space-y-1">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
