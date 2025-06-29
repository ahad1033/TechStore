import React, { useState } from "react";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/ui/data-table";
import FormModal from "@/components/ui/form-modal";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/store/features/categoriesApi";
import { Edit, Trash2, Eye } from "lucide-react";

const categorySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
});

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: categoriesData, isLoading } = useGetCategoriesQuery({
    page,
    limit: 10,
    search,
  });

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const handleCreateCategory = async (data) => {
    try {
      await createCategory(data).unwrap();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create category:", error);
      throw error;
    }
  };

  const handleUpdateCategory = async (data) => {
    try {
      await updateCategory({ id: editingCategory.id, ...data }).unwrap();
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to update category:", error);
      throw error;
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  const columns = [
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
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      key: "createdAt",
      label: "Created",
      type: "date",
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingCategory(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteCategory(row.id)}
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Badge variant="outline">{categoriesData?.total || 0} categories</Badge>
      </div>

      <DataTable
        data={categoriesData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search categories..."
        actions={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Add New Category
          </Button>
        }
      />

      {/* Create Modal */}
      {isCreateModalOpen && (
        <FormModal
          title="Create Category"
          description="Add a new category to organize your products"
          schema={categorySchema}
          onSubmit={handleCreateCategory}
          loading={creating}
          mode="create"
          trigger={<div style={{ display: "none" }} />}
        >
          {({ register, errors }) => (
            <>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter category description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("status")}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </>
          )}
        </FormModal>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <FormModal
          title="Edit Category"
          description="Update category information"
          schema={categorySchema}
          defaultValues={editingCategory}
          onSubmit={handleUpdateCategory}
          loading={updating}
          mode="edit"
          trigger={<div style={{ display: "none" }} />}
        >
          {({ register, errors }) => (
            <>
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  placeholder="Enter category description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("status")}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </>
          )}
        </FormModal>
      )}
    </div>
  );
}
