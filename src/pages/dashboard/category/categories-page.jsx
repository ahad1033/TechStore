import { toast } from "sonner";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/store/features/categoriesApi";
import LoadingButton from "@/components/shared/loading-button";
import DashboardHeader from "@/components/shared/dashboard-header";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { data: categoriesData, isLoading } = useGetCategoriesQuery({
    page,
    limit: 10,
    search,
  });

  console.log("categoriesData: ", categoriesData);

  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  // Function to open the confirmation dialog
  const confirmDeleteCategory = (id) => {
    setCategoryToDelete(id);
  };

  const handleEditCategory = (data) => {
    navigate(`/dashboard/update-category/${data.id}`, { replace: true });
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    toast.info("Wait a moment!");

    try {
      const res = await deleteCategory(categoryToDelete).unwrap();

      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        toast.success(res.message || "Category deleted successfully!");

        setCategoryToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (img) => (
        <div>
          <img src={img} className="w-20 rounded-sm" />
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
      render: (value) => (
        <span className="max-w-[200px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditCategory(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => confirmDeleteCategory(row.id)}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const pagination = categoriesData
    ? {
        currentPage: page,
        totalPages: Math.ceil(categoriesData.total / 10),
        total: categoriesData.total,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, categoriesData.total),
      }
    : null;

  return (
    <div className="container space-y-6">
      <DashboardHeader
        title="Categories"
        button="Add category"
        href="/dashboard/create-category"
      />

      <DataTable
        data={categoriesData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search categories..."
      />

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected category.
              <br />
              <span className="font-bold text-red-600">
                Warning: If this category has any subcategories, they will also
                be permanently deleted.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
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
