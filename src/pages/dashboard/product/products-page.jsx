import { toast } from "sonner";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/store/features/productsApi";

import LoadingButton from "@/components/shared/loading-button";
import DashboardHeader from "@/components/shared/dashboard-header";

export default function DProductsPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [productToDelete, setProductToDelete] = useState(null);

  const { data: productsData, isLoading } = useGetProductsQuery({
    page,
    limit: 10,
    search,
  });

  console.log("productsData: ", productsData);

  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  // Function to open the confirmation dialog
  const confirmDeleteCategory = (id) => {
    setProductToDelete(id);
  };

  const handleEditProduct = (data) => {
    navigate(`/dashboard/update-product/${data.id}`, { replace: true });
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    toast.info("Wait a moment!");

    try {
      const res = await deleteProduct(productToDelete).unwrap();

      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        toast.success(res.message || "Product deleted successfully!");

        setProductToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

  const columns = [
    {
      key: "images",
      label: "Image",
      render: (img) => (
        <div>
          <img src={img[0]} className="w-20 rounded-sm" />
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "regularPrice",
      label: "Regular Price",
      sortable: true,
    },
    {
      key: "discountPrice",
      label: "Discount Price",
      sortable: true,
    },
    {
      key: "categoryId",
      label: "Category",
      render: (value) => (
        <span className="max-w-[200px] truncate block" title={value?.name}>
          {value?.name}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="icon"
            className="text-info cursor-pointer"
            onClick={() => handleEditProduct(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="icon"
            disabled={deleting}
            className="text-destructive cursor-pointer"
            onClick={() => confirmDeleteCategory(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const pagination = productsData
    ? {
        currentPage: page,
        totalPages: productsData?.meta?.totalPages,
        total: productsData?.meta?.total,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, productsData?.meta?.total),
      }
    : null;

  return (
    <div className="container space-y-6">
      <DashboardHeader
        title="Products"
        button="Add product"
        href="/dashboard/create-product"
      />

      <DataTable
        data={productsData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search product..."
      />

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
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
