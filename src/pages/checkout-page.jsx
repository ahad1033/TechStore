import * as yup from "yup";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Package, MapPin, Truck } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useCurrentUser } from "@/store/slices/authSlice";
import { useCreateOrderMutation } from "@/store/features/ordersApi";
import { clearCart, useCurrentCart } from "@/store/slices/cartSlice";

// --- Yup Validation Schema for Shipping Address ---
const shippingSchema = yup.object().shape({
  name: yup.string().trim().required("Full Name is required"),
  phone: yup
    .string()
    .matches(
      /^(013|014|015|016|017|018|019)\d{8}$/,
      "Please enter a valid Bangladeshi phone number (11 digits)"
    )
    .required("Phone number is required"),
  shippingAddress: yup.string().trim().required("Shipping is required"),
  deliveryNotes: yup.string().trim().optional(),
});

const CheckoutPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = useSelector(useCurrentUser)?.user;

  const cartProducts = useSelector(useCurrentCart);

  const [createOrder] = useCreateOrderMutation();

  const subTotal = cartProducts?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subTotal > 500 ? 0 : 10;

  const total = subTotal + shipping;

  // Redirect if cart data is missing (e.g., direct access to /checkout)
  useEffect(() => {
    if (!cartProducts || cartProducts?.items?.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");

      navigate("/cart");
    }
  }, [cartProducts, navigate]);

  const form = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues: {
      name: currentUser?.name || "",
      phone: "",
      shippingAddress: "",
      deliveryNotes: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handlePlaceOrder = async (data) => {
    const productData = cartProducts?.items.map((item) => ({
      productId: item?.product.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const dataToSend = {
      ...data,
      total,
      subTotal,
      products: productData,
      deliveryFee: shipping,
    };

    try {
      const response = await createOrder(dataToSend);

      if (response.success) {
        toast.success(response.message || "Order created successfully!");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(clearCart());

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container section-padding">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center text-primary hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      {!currentUser && (
        <div className="mb-6">
          <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm">
            <svg
              className="w-5 h-5 mr-2 text-red-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
              />
            </svg>
            <span className="font-semibold">
              Please log in first to confirm your order!
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" /> Shipping
                Address
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0 pb-0">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(handlePlaceOrder)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="01636******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name="shippingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="deliveryNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Leave package at back door"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Place Order Button */}
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isSubmitting || !currentUser}
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Package className="w-5 h-5 mr-2 text-primary" /> Order Summary
            </h2>

            {/* List of items in cart */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cartProducts?.items?.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-xs">Qty: {item.quantity}</p>
                  </div>

                  <p className="font-semibold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary Totals */}
            <div className="space-y-3 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span className="">Subtotal</span>
                <span className="font-medium">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="">Shipping</span>
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
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Free shipping on orders over $500
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
