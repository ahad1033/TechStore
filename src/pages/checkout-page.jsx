/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ArrowLeft, CreditCard, Package, MapPin, Truck } from "lucide-react";

// --- Yup Validation Schema for Shipping Address ---
const shippingSchema = yup.object().shape({
  fullName: yup.string().trim().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  addressLine1: yup.string().trim().required("Address Line 1 is required"),
  addressLine2: yup.string().trim().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State/Province is required"),
  zipCode: yup.string().trim().required("Zip/Postal Code is required"),
  country: yup.string().trim().required("Country is required"),
  deliveryNotes: yup.string().trim().optional(),
  paymentMethod: yup.string().required("Payment method is required"),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //   const { cartItems, subtotal, shipping, tax, total } = location.state || {};

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop",
      quantity: 1,
      category: "Smartphones",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      quantity: 2,
      category: "Audio",
    },
    {
      id: 3,
      name: "MacBook Air M2",
      price: 1199,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
      quantity: 1,
      category: "Laptops",
    },
  ]);

  // Redirect if cart data is missing (e.g., direct access to /checkout)
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const form = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      deliveryNotes: "",
      paymentMethod: "credit_card", // Default payment method
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handlePlaceOrder = async (data) => {
    console.log("Placing order with data:", data);
    console.log("Cart items:", cartItems);
    // console.log("Order totals:", { subtotal, shipping, tax, total });

    // Simulate API call
    try {
      // In a real application, you would send this data to your backend
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     shippingInfo: data,
      //     cartItems,
      //     subtotal,
      //     shipping,
      //     tax,
      //     total,
      //   }),
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to place order');
      // }
      // const result = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      toast.success("Order placed successfully!");
      // Redirect to an order confirmation page or clear cart
      navigate("/order-confirmation", {
        // state: { orderId: "ORD12345", total },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  //   if (!cartItems || cartItems.length === 0) {
  //     return null; // Or a loading spinner while redirecting
  //   }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-gray-600 hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

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
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...field}
                              />
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
                                placeholder="+1234567890"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Apt, Suite, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="USA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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

                    {/* Payment Method Selection */}
                    <Card className="p-6 mt-8">
                      <CardHeader className="px-0 pt-0">
                        <CardTitle className="text-xl font-bold mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-primary" />{" "}
                          Payment Method
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-0 pb-0">
                        <FormField
                          control={control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="credit_card" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Credit Card
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="paypal" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      PayPal
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="cash_on_delivery" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Cash on Delivery
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Place Order Button */}
                    <Button
                      type="submit"
                      className="w-full mt-6"
                      size="lg"
                      disabled={isSubmitting}
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
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" /> Order Summary
              </h2>

              {/* List of items in cart */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems?.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary Totals */}
              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  {/* <span className="font-medium">${subtotal.toFixed(2)}</span> */}
                  <span className="font-medium">$1245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {/* {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} */}
                    $15
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div> */}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      {/* ${total.toFixed(2)} */}
                      $450
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
