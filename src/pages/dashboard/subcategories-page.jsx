import * as yup from "yup";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import FormModal from "@/components/ui/form-modal";

import {
  useGetSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} from "@/store/features/subcategoriesApi";
import { useGetCategoriesQuery } from "@/store/features/categoriesApi";

const subcategorySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  description: yup.string().required("Description is required"),
  categoryId: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),
});

export default function SubcategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: subcategoriesData, isLoading } = useGetSubcategoriesQuery({
    page,
    limit: 10,
    search,
  });

  const { data: categoriesData } = useGetCategoriesQuery({
    page: 1,
    limit: 100,
  });

  const [createSubcategory, { isLoading: creating }] =
    useCreateSubcategoryMutation();
  const [updateSubcategory, { isLoading: updating }] =
    useUpdateSubcategoryMutation();
  const [deleteSubcategory, { isLoading: deleting }] =
    useDeleteSubcategoryMutation();

  const handleCreateSubcategory = async (data) => {
    try {
      await createSubcategory(data).unwrap();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create subcategory:", error);
      throw error;
    }
  };

  const handleUpdateSubcategory = async (data) => {
    try {
      await updateSubcategory({ id: editingSubcategory.id, ...data }).unwrap();
      setEditingSubcategory(null);
    } catch (error) {
      console.error("Failed to update subcategory:", error);
      throw error;
    }
  };

  const handleDeleteSubcategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubcategory(id).unwrap();
      } catch (error) {
        console.error("Failed to delete subcategory:", error);
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
      key: "category",
      label: "Category",
      render: (_, row) => row.category?.name || "N/A",
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
            onClick={() => setEditingSubcategory(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteSubcategory(row.id)}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const pagination = subcategoriesData
    ? {
        currentPage: page,
        totalPages: Math.ceil(subcategoriesData.total / 10),
        total: subcategoriesData.total,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, subcategoriesData.total),
      }
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subcategories</h1>
        <Badge variant="outline">
          {subcategoriesData?.total || 0} subcategories
        </Badge>
      </div>

      <DataTable
        data={subcategoriesData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search subcategories..."
        actions={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Add New Subcategory
          </Button>
        }
      />

      {/* Create Modal */}
      {isCreateModalOpen && (
        <FormModal
          title="Create Subcategory"
          description="Add a new subcategory to organize your products"
          schema={subcategorySchema}
          onSubmit={handleCreateSubcategory}
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
                  placeholder="Enter subcategory name"
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
                  placeholder="Enter subcategory description"
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
                <label htmlFor="categoryId" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="categoryId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("categoryId")}
                >
                  <option value="">Select category</option>
                  {categoriesData?.data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-sm text-red-600">
                    {errors.categoryId.message}
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
      {editingSubcategory && (
        <FormModal
          title="Edit Subcategory"
          description="Update subcategory information"
          schema={subcategorySchema}
          defaultValues={editingSubcategory}
          onSubmit={handleUpdateSubcategory}
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
                  placeholder="Enter subcategory name"
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
                  placeholder="Enter subcategory description"
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
                <label
                  htmlFor="edit-categoryId"
                  className="text-sm font-medium"
                >
                  Category
                </label>
                <select
                  id="edit-categoryId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("categoryId")}
                >
                  <option value="">Select category</option>
                  {categoriesData?.data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-sm text-red-600">
                    {errors.categoryId.message}
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
