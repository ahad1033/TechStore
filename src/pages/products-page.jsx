import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Star,
  ShoppingCart,
  Heart,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    rating: "",
    search: "",
  });

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1399,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Smartphones",
      rating: 4.8,
      reviews: 1247,
      discount: 14,
      isNew: true,
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
      discount: 12,
      isNew: false,
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
      discount: 8,
      isNew: false,
    },
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      price: 1299,
      originalPrice: 1499,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      category: "Smartphones",
      rating: 4.6,
      reviews: 743,
      discount: 13,
      isNew: true,
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Gen",
      price: 249,
      originalPrice: 279,
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
      category: "Audio",
      rating: 4.5,
      reviews: 1023,
      discount: 11,
      isNew: false,
    },
    {
      id: 6,
      name: 'iPad Pro 12.9"',
      price: 1099,
      originalPrice: 1199,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      category: "Tablets",
      rating: 4.8,
      reviews: 456,
      discount: 8,
      isNew: false,
    },
    {
      id: 7,
      name: "PlayStation 5",
      price: 499,
      originalPrice: 599,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
      category: "Gaming",
      rating: 4.9,
      reviews: 2341,
      discount: 17,
      isNew: false,
    },
    {
      id: 8,
      name: "Canon EOS R6 Mark II",
      price: 2499,
      originalPrice: 2799,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      category: "Photography",
      rating: 4.7,
      reviews: 189,
      discount: 11,
      isNew: true,
    },
  ];

  const categories = [
    "All",
    "Smartphones",
    "Laptops",
    "Audio",
    "Gaming",
    "Photography",
    "Tablets",
  ];
  const priceRanges = [
    "All",
    "Under $100",
    "$100 - $500",
    "$500 - $1000",
    "Over $1000",
  ];
  const ratings = ["All", "4+ Stars", "3+ Stars", "2+ Stars"];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handleAddToCart = (productId) => {
    console.log("Adding product to cart:", productId);
  };

  const handleAddToWishlist = (productId) => {
    console.log("Adding product to wishlist:", productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our complete collection of premium technology products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <Input
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setFilters({
                    category: "",
                    priceRange: "",
                    rating: "",
                    search: "",
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, products.length)}{" "}
                  of {products.length} products
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white">New</Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge variant="destructive">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 rounded-full"
                        onClick={() => handleAddToWishlist(product.id)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
