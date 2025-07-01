import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetProductQuery } from "@/store/features/productsApi";
import { ServicesSection } from "@/components/sections";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: currentProduct } = useGetProductQuery(id);

  // Mock product data - in real app, fetch by ID

  const handleAddToCart = () => {
    const productToAdd = {
      product: currentProduct?.data,
      quantity,
      price:
        currentProduct?.data?.discountPrice > 0
          ? currentProduct?.data?.discountPrice
          : currentProduct?.data?.rgularPrice,
    };
    dispatch(addToCart(productToAdd));

    toast.success(
      `${currentProduct?.data?.title} added successfylly in the cart`
    );
  };

  const handleAddToWishlist = () => {
    // console.log("Adding to wishlist:", product.id);
    dispatch(addToCart({ product: currentProduct, quantity }));
  };

  const nextImage = () => {
    setSelectedImage(
      (prev) => (prev + 1) % currentProduct?.data?.images?.length
    );
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + currentProduct?.data?.images?.length) %
        currentProduct?.data?.images?.length
    );
  };

  return (
    <>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm my-8">
          <a href="/" className="hover:text-primary">
            Home
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-primary">
            Products
          </a>
          <span>/</span>
          <span className="text-muted-foreground">
            {currentProduct?.data?.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white/20 rounded-lg overflow-hidden">
              <img
                src={currentProduct?.data?.images[selectedImage]}
                alt={currentProduct?.data.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {currentProduct?.data?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct?.data?.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            {/* <div className="flex items-center space-x-2">
              {product.isNew && (
                <Badge className="bg-green-500 text-white">New</Badge>
              )}
              {product.discount > 0 && (
                <Badge variant="destructive">-{product.discount}% OFF</Badge>
              )}
            </div> */}

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-primary">
              {currentProduct?.data?.title}
            </h1>

            {/* Category */}
            <Badge className="">{currentProduct?.data?.categoryId?.name}</Badge>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(2)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">2 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {currentProduct?.data.discountPrice &&
              Number(currentProduct?.data.discountPrice) <
                Number(currentProduct?.data.regularPrice) ? (
                <>
                  <span className="text-xl font-bold text-primary">
                    ${currentProduct?.data.discountPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${currentProduct?.data.regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-primary">
                  ${currentProduct?.data.regularPrice}
                </span>
              )}
            </div>

            {currentProduct?.data?.features && (
              <>
                <h3 className="font-semibold">Key features: </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentProduct?.data?.features,
                  }}
                />
              </>
            )}

            {/* Stock Status */}
            {/* <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm">
                {product.inStock
                  ? `${product.stockCount} in stock`
                  : "Out of stock"}
              </span>
            </div> */}

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span className="text-sm">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3  mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="p-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentProduct?.data?.description,
                  }}
                />
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card className="p-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentProduct?.data?.features,
                  }}
                />
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card className="p-6">
                {currentProduct?.data?.specification ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentProduct?.data?.specification,
                    }}
                  />
                ) : (
                  <p className="text-yellow-500">
                    This product has no specification!
                  </p>
                )}
              </Card>
            </TabsContent>

            {/* <TabsContent value="reviews" className="mt-6">
            <Card className="p-6">
              <p className="text-gray-600">Reviews coming soon...</p>
            </Card>
          </TabsContent> */}
          </Tabs>
        </div>
      </div>

      <ServicesSection />
    </>
  );
};

export default ProductDetailPage;
