import {
  X,
  User,
  Mail,
  Home,
  Phone,
  Package,
  Calendar,
  DollarSign,
} from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export default function OrderDetailsDialog({ openOrderModel, order }) {
  const {
    createdAt,
    total,
    userId = {},
    name,
    shippingAddress,
    products = [],
    phone,
    orderNumber,
    subTotal,
    deliveryFee,
  } = order || {};

  return (
    <Dialog open={openOrderModel.value} onOpenChange={openOrderModel.onToggle}>
      <DialogContent className="max-w-4xl w-full p-0">
        <DialogHeader className="px-4 pt-4 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Order #{orderNumber || "N/A"}
          </DialogTitle>
          <DialogClose asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              onClick={openOrderModel.onFalse}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Order Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-medium">#{orderNumber || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Total Amount</p>
                  <p className="font-medium text-base">
                    ${total?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer and Shipping Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{userId?.name || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {userId?.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {userId?.phone || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{name || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {phone || "N/A"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {shippingAddress || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items and Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 items-center gap-4"
                  >
                    <div className="col-span-9 flex items-center gap-4">
                      <img
                        src={item.productId?.images?.[0]}
                        alt={item.productId?.title || "Product Image"}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {item.productId?.title || "Product Name"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right self-end">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(0)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price?.toFixed(0)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Order Summary Section */}
              <div className="grid grid-cols-12">
                <div className="col-start-7 col-span-6 ml-auto w-full max-w-xs space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${subTotal?.toFixed(0) || "0"}</span>
                  </div>

                  {deliveryFee !== 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span>${deliveryFee?.toFixed(0)}</span>
                    </div>
                  )}

                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total:</span>
                    <span>${total?.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
