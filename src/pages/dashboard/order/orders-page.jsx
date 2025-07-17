import { debounce } from "lodash";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";

import useBoolean from "@/hooks/use-boolean";

import { useCurrentUser } from "@/store/slices/authSlice";
import { useGetOrdersQuery } from "@/store/features/ordersApi";

import DashboardHeader from "@/components/shared/dashboard-header";
import OrderDetailsDialog from "@/components/dashboard/dialog/order-details-dialog";

export default function OrdersPage() {
  const limit = 10;

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const openOrderModel = useBoolean();

  const user = useSelector(useCurrentUser)?.user;

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearch(value);
    }, 500);

    handler(search);

    return () => {
      handler.cancel();
    };
  }, [search]);

  const { data: ordersData, isLoading } = useGetOrdersQuery(
    search !== "" ? { page, limit, search: debouncedSearch } : { page, limit },
    {
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
    }
  );

  // const { data: orderDetails, isLoading: orderDetailsLoading } =
  //   useGetSingleOrderQuery(selectedOrder?._id, { skip: !selectedOrder?._id });

  // const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();

  const handleViewOrder = (order) => {
    openOrderModel.onTrue();
    setSelectedOrder(order);
  };

  // const handleUpdateOrderStatus = async (orderId, status) => {
  //   try {
  //     await updateOrder({ id: orderId, status }).unwrap();
  //     // Refresh the orders list
  //   } catch (error) {
  //     console.error("Failed to update order status:", error);
  //   }
  // };

  const columns = [
    {
      key: "orderNumber",
      label: "Order #",
    },
    ...(isAdmin
      ? [
          {
            key: "userId",
            label: "Customer",
            render: (value) => (
              <div>
                <div className="font-medium">{value?.name || "N/A"}</div>
                <div className="text-sm text-muted-foreground">
                  {value?.email}
                </div>
              </div>
            ),
          },
        ]
      : []),
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
      label: "Action",
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
    <div className="container space-y-6">
      <DashboardHeader
        title="Orders"
        badge={<Badge>{ordersData?.data?.length || 0} orders</Badge>}
      />

      <DataTable
        dataType="order"
        columns={columns}
        loading={isLoading}
        onSearch={setSearch}
        onPageChange={setPage}
        pagination={pagination}
        data={ordersData?.data || []}
        searchPlaceholder="Search by order number or total amount..."
      />

      <OrderDetailsDialog
        order={selectedOrder || {}}
        openOrderModel={openOrderModel}
      />
    </div>
  );
}
