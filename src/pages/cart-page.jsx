import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  Truck,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

import {
  removeFromCart,
  updateQuantity,
  useCurrentCart,
} from "@/store/slices/cartSlice";
import { toast } from "sonner";

const CartPage = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(useCurrentCart);

  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) {
      toast.error("Can't be reduced item less then 1");
      return;
    }

    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearItem = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const subtotal = cartProducts?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 10;
  const total = subtotal + shipping;

  if (cartProducts?.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center text-primary hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartProducts?.items?.map((item) => (
            <Card key={item?.product?.id} className="p-6 bg-foreground/5">
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item?.product?.images[0]}
                    alt={item?.product?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">
                    {item?.product?.title}
                  </h3>

                  {/* <p className="text-sm text-gray-500">
                      {item.product.categoryId.name}
                    </p> */}

                  <p className="text-lg font-bold text-primary">
                    ${item?.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateCartQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateCartQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Total Price */}
                <div className="text-right">
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleClearItem(item?.product?.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-bold text-muted-foreground mb-6">
              Order Summary
            </h2>

            {/* Summary Items */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6 p-4 border border-primary dark:border-white dark:bg-white rounded-lg">
              <div className="flex items-center space-x-2 text-green-700">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Free shipping on orders over $500
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout">
              <Button className="w-full" size="lg">
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
            </Link>

            {/* Payment Methods */}
            {/* <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">
                    AMEX
                  </div>
                  <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">
                    PP
                  </div>
                </div>
              </div> */}

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                We accept cash on delivery
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
