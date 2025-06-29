import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
    },
    {
      id: 9,
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
      isFeatured: true,
    },
    {
      id: 10,
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
      isFeatured: true,
    },
    {
      id: 11,
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
      isFeatured: true,
    },
    {
      id: 12,
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
      isFeatured: true,
    },
  ];

  const handleAddToCart = (productId) => {
    // TODO: Implement add to cart functionality
    console.log("Adding product to cart:", productId);
  };

  const handleAddToWishlist = (productId) => {
    // TODO: Implement add to wishlist functionality
    console.log("Adding product to wishlist:", productId);
  };

  return (
    <section className="container section-padding">
      <div>
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-2 py-1">
            Featured Collection
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine
            innovation, quality, and exceptional value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 pt-0"
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
                    <Badge variant="destructive">-{product.discount}%</Badge>
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

              {/* Product Info */}
              <div className="p-4">
                {/* Category */}
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                {/* Product Name */}
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold  mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {product.name}
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
                  <span className="text-xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
