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
  Eye,
} from "lucide-react";
import { useGetProductsQuery } from "@/store/features/productsApi";
import { useGetCategoriesQuery } from "@/store/features/categoriesApi";
import FeaturedProductSkeletonCard from "@/components/skeleton/featured-product-skeleton";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState("grid");

  const [page, setPage] = useState(1);

  const limit = 8;

  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    rating: "",
    search: "",
  });

  const { data: products, isLoading } = useGetProductsQuery({
    page,
    limit,
    search: filters.search,
  });

  const { data: categories } = useGetCategoriesQuery({ page: 1, limit: 50 });

  const priceRanges = [
    "All",
    "Under $100",
    "$100 - $500",
    "$500 - $1000",
    "Over $1000",
  ];

  const totalPages = products?.meta?.totalPages;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentProducts = products?.data;

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setPage(1);
  };

  const handleAddToCart = (productId) => {
    console.log("Adding product to cart:", productId);
  };

  const handleAddToWishlist = (productId) => {
    console.log("Adding product to wishlist:", productId);
  };

  return (
    <div className="min-h-screen">
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
            <div className="rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
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
                <label className="block text-sm font-medium  mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories?.data?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
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
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, products?.meta?.total)} of{" "}
                  {products?.meta?.total} products
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
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <FeaturedProductSkeletonCard key={index} />
                  ))
                : currentProducts?.map((product) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300 pt-0 pb-2 dark:bg-background/10 border-black/10 dark:border-white/5"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.discountPrice > 0 && (
                            <Badge>
                              Save $
                              {Number(product.regularPrice) -
                                Number(product.discountPrice)}
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
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quick Add to Cart */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Button
                            className="w-full"
                            onClick={() => handleAddToCart(product.id)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>

                      <div className="px-4">
                        <Badge
                          className="border border-primary text-primary mb-2"
                          variant="ghost"
                        >
                          {product?.categoryId?.name}
                        </Badge>

                        {/* Product Name */}
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>

                        {/* Rating */}
                        {/* <div className="flex items-center space-x-2 mb-3">
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
                </div> */}

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          {product.discountPrice &&
                          Number(product.discountPrice) <
                            Number(product.regularPrice) ? (
                            <>
                              <span className="text-xl font-bold text-primary">
                                ${product.discountPrice}
                              </span>
                              <span className="text-lg text-gray-400 line-through">
                                ${product.regularPrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-primary">
                              ${product.regularPrice}
                            </span>
                          )}
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
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
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
