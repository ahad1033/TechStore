import React from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";

import { useGetProductsQuery } from "@/store/features/productsApi";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { addToCart } from "@/store/slices/cartSlice";

import FeaturedProductSkeletonCard from "../skeleton/featured-product-skeleton";

const FeaturedProducts = () => {
  const dispatch = useDispatch();

  const { data: products, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 10,
  });

  const handleAddToCart = (cartProduct) => {
    const productToAdd = {
      product: cartProduct,
      price:
        cartProduct?.discountPrice > 0
          ? cartProduct?.discountPrice
          : cartProduct?.regularPrice,
    };
    dispatch(addToCart(productToAdd));

    toast.success(`${cartProduct?.title} added successfylly in the cart`);
  };

  // eslint-disable-next-line no-unused-vars
  const handleAddToWishlist = (productId) => {
    // TODO: Implement add to wishlist functionality
    console.log("Adding product to wishlist:", productId);
  };

  return (
    <section className="container section-padding">
      <div>
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 px-2 py-1">Featured Collection</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine
            innovation, quality, and exceptional value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <FeaturedProductSkeletonCard key={index} />
              ))
            : products?.data?.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 pt-0 pb-2 dark:bg-background/10 border-black/10 dark:border-white/5"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discountPrice > 0 && (
                        <Badge variant="destructive">
                          Save $
                          {Number(product.regularPrice) -
                            Number(product.discountPrice)}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 rounded-full"
                        onClick={() => handleAddToWishlist(product.id)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button> */}

                      <Link to={`/products/${product.id}`}>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
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
