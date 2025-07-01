/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import {
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "@/store/features/ordersApi";
import { Edit, Eye, Package, User, Calendar, DollarSign } from "lucide-react";
import { useCurrentUser } from "@/store/slices/authSlice";

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const user = useSelector(useCurrentUser)?.user;

  const isAdmin = user?.role === "admin";

  const { data: ordersData, isLoading } = useGetOrdersQuery(
    {
      // page,
      // limit: 10,
      search,
      // userId: isAdmin ? undefined : user?.id,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  console.log("ordersData: ", ordersData);

  const { data: orderDetails, isLoading: orderDetailsLoading } =
    useGetOrderQuery(selectedOrder?.id, { skip: !selectedOrder?.id });

  const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrder({ id: orderId, status }).unwrap();
      // Refresh the orders list
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const columns = [
    {
      key: "orderNumber",
      label: "Order #",
      sortable: true,
      render: () => (
        <span className="font-mono text-sm">
          {(() => Math.floor(Math.random() * (100 - 50 + 1)) + 3)()}
        </span>
      ),
    },
    {
      key: "name",
      label: "Customer",
      // render: (value) => (
      //   <div>
      //     <div className="font-medium">{value?.userId?.name || "N/A"}</div>
      //     <div className="text-sm text-muted-foreground">
      //       {value?.userId?.email}
      //     </div>
      //   </div>
      // ),
    },
    {
      key: "total",
      label: "Total",
      type: "currency",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      key: "createdAt",
      label: "Date",
      type: "date",
      sortable: true,
    },
    // {
    //   key: "actions",
    //   label: "Actions",
    //   render: (_, row) => (
    //     <div className="flex items-center space-x-2">
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         onClick={() => handleViewOrder(row)}
    //       >
    //         <Eye className="h-4 w-4" />
    //       </Button>
    //       {isAdmin && (
    //         <Button
    //           variant="ghost"
    //           size="sm"
    //           onClick={() => handleUpdateOrderStatus(row.id, "processing")}
    //           disabled={updating}
    //         >
    //           <Edit className="h-4 w-4" />
    //         </Button>
    //       )}
    //     </div>
    //   ),
    // },
  ];

  const pagination = ordersData
    ? {
        currentPage: page,
        // totalPages: Math.ceil(ordersData?.total / 10),
        totalPages: Math.ceil(ordersData?.data.length / 10),
        // total: ordersData.total,
        total: ordersData.data.length,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, ordersData.total),
      }
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Badge>{ordersData?.data?.length || 0} orders</Badge>
      </div>

      <DataTable
        data={ordersData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search orders..."
      />

      {/* Order Details Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <Button
                variant="ghost"
                onClick={() => setIsOrderModalOpen(false)}
              >
                ×
              </Button>
            </div>

            {orderDetailsLoading ? (
              <div className="text-center py-8">Loading order details...</div>
            ) : (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Order Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            #{orderDetails?.orderNumber}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(
                              orderDetails?.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            ${orderDetails?.total?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}

                  {/* <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Customer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {orderDetails?.customer?.name}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {orderDetails?.customer?.email}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {orderDetails?.customer?.phone}
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}

                  {/* <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="mb-2">
                        {orderDetails?.status}
                      </Badge>
                      {isAdmin && (
                        <div className="space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateOrderStatus(
                                orderDetails.id,
                                "processing"
                              )
                            }
                            disabled={updating}
                          >
                            Mark Processing
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateOrderStatus(
                                orderDetails.id,
                                "completed"
                              )
                            }
                            disabled={updating}
                          >
                            Mark Completed
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card> */}
                </div>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div>{ordersData?.data?.shippingAddress}</div>
                      {/* <div>
                        {ordersData?.data?.shippingAddress?.city},{" "}
                        {ordersData?.data?.shippingAddress?.state}
                      </div>
                      <div>{ordersData?.data?.shippingAddress?.zipCode}</div>
                      <div>{ordersData?.data?.shippingAddress?.country}</div> */}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderDetails?.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-4 last:border-b-0"
                        >
                          <div className="flex items-center space-x-4">
                            {item.product?.image && (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                            )}
                            <div>
                              <div className="font-medium">
                                {item.product?.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ${item.price?.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total: ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${orderDetails?.subtotal?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${orderDetails?.shipping?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${orderDetails?.tax?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>${orderDetails?.total?.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
