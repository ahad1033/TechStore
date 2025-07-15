/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import DataTable from "@/components/ui/data-table";

import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/store/features/ordersApi";
import {
  Edit,
  Eye,
  Package,
  User,
  Calendar,
  DollarSign,
  X,
} from "lucide-react";
import { useCurrentUser } from "@/store/slices/authSlice";
import useBoolean from "@/hooks/use-boolean";
import OrderDetailsDialog from "@/components/dashboard/dialog/order-details-dialog";

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openOrderModel = useBoolean();

  const user = useSelector(useCurrentUser)?.user;

  const isAdmin = user?.role === "admin";

  const { data: ordersData, isLoading } = useGetOrdersQuery(
    {
      page,
      limit: 10,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  console.log("ordersData: ", ordersData);

  // const { data: orderDetails, isLoading: orderDetailsLoading } =
  //   useGetSingleOrderQuery(selectedOrder?._id, { skip: !selectedOrder?._id });

  const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();

  const handleViewOrder = (order) => {
    openOrderModel.onTrue();
    setSelectedOrder(order);
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
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="icon"
            className="text-green-600 cursor-pointer"
            onClick={() => handleViewOrder(row)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const pagination = ordersData
    ? {
        currentPage: page,
        totalPages: ordersData?.meta?.totalPages,
        total: ordersData?.meta?.total,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, ordersData?.data?.length),
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
        dataType="order"
      />

      <OrderDetailsDialog
        order={selectedOrder || {}}
        openOrderModel={openOrderModel}
      />
    </div>
  );
}
