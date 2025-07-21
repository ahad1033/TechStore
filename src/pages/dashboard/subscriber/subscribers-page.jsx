import { toast } from "sonner";
import { debounce } from "lodash";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";

import {
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
  useUpdateSubscriberStatusMutation,
} from "@/store/features/subscribersApi";

import LoadingButton from "@/components/shared/loading-button";
import DashboardHeader from "@/components/shared/dashboard-header";

export default function SubscribersPage() {
  const limit = 10;

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [subscriberToDelete, setSubscriberToDelete] = useState(null);

  const { data: subscribersData, isLoading } = useGetSubscribersQuery(
    search !== "" ? { page, limit, search: debouncedSearch } : { page, limit }
  );

  const [deleteSubscriber, { isLoading: deleting }] =
    useDeleteSubscriberMutation();

  const [updateSubscriber] = useUpdateSubscriberStatusMutation();

  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearch(value);
    }, 500);

    handler(search);

    return () => {
      handler.cancel();
    };
  }, [search]);

  // Function to open the confirmation dialog
  const confirmDeleteSubscriber = (id) => {
    setSubscriberToDelete(id);
  };

  const handleDeleteSubscriber = async () => {
    if (!subscriberToDelete) return;

    toast.info("Wait a moment!");

    try {
      const res = await deleteSubscriber(subscriberToDelete).unwrap();

      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        toast.success(res.message || "Subscriber deleted successfully!");

        setSubscriberToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
      toast.error("Failed to delete subscriber! Please try again.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    toast.warning("Wait a moment!");

    try {
      const dataToSend = {
        status: newStatus,
      };

      await new Promise((resolve) => setTimeout(resolve, 300));

      const res = await updateSubscriber({ id, data: dataToSend }).unwrap();

      if (res.success) {
        toast.success(res.message || "Status updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getStatusBadge = (status, subscriberId) => {
    const lowerStatus = status?.toLowerCase();

    const statusConfig = {
      pending: { variant: "yellow", label: "Pending" },
      approved: { variant: "green", label: "Approved" },
      cancelled: { variant: "destructive", label: "Cancelled" },
    };

    const config = statusConfig[lowerStatus] || {
      variant: "secondary",
      label: status,
    };

    // Define which options to show based on status
    const options = [];

    if (lowerStatus === "pending") {
      options.push(
        { label: "Approve", value: "approved" },
        { label: "Cancel", value: "cancelled" }
      );
    } else if (lowerStatus === "approved") {
      options.push({ label: "Cancel", value: "cancelled" });
    } else if (lowerStatus === "cancelled") {
      options.push({ label: "Approve", value: "approved" });
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant={config.variant}
            className="cursor-pointer hover:opacity-80"
          >
            {config.label}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleStatusChange(subscriberId, option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const columns = [
    {
      key: "email",
      label: "Email",
    },
    {
      key: "status",
      label: "Status",
      render: (value, row) => getStatusBadge(value, row._id),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => confirmDeleteSubscriber(row._id)}
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const pagination = subscribersData
    ? {
        currentPage: page,
        totalPages: subscribersData?.meta?.totalPages,
        total: subscribersData.total,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, subscribersData?.meta?.total),
      }
    : null;

  return (
    <div className="container space-y-6">
      <DashboardHeader
        title="Subscribers"
        badge={
          <Badge>
            {subscribersData?.meta?.total || 0} subscriber
            {subscribersData?.meta?.total >= 1 ? "s" : ""}
          </Badge>
        }
      />

      <DataTable
        data={subscribersData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search by email..."
      />

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog
        open={Boolean(subscriberToDelete)}
        onOpenChange={(open) => !open && setSubscriberToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-bold text-red-600">
                This action cannot be undone. This will permanently the
                subscriber.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubscriber}
              disabled={deleting}
            >
              {deleting ? <LoadingButton /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
