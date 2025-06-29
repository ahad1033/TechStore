import * as yup from "yup";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/ui/data-table";
import FormModal from "@/components/ui/form-modal";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/store/features/productsApi";
import { useGetCategoriesQuery } from "@/store/features/categoriesApi";
import { useGetSubcategoriesQuery } from "@/store/features/subcategoriesApi";
import { Edit, Trash2, Eye } from "lucide-react";

const productSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  categoryId: yup.string().required("Category is required"),
  subcategoryId: yup.string().required("Subcategory is required"),
  stock: yup
    .number()
    .required("Stock is required")
    .min(0, "Stock cannot be negative"),
  status: yup.string().required("Status is required"),
});

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { data: productsData, isLoading } = useGetProductsQuery({
    page,
    limit: 10,
    search,
  });

  const { data: categoriesData } = useGetCategoriesQuery({
    page: 1,
    limit: 100,
  });

  const { data: subcategoriesData } = useGetSubcategoriesQuery({
    page: 1,
    limit: 100,
    categoryId: selectedCategoryId,
  });

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const handleCreateProduct = async (data) => {
    try {
      await createProduct(data).unwrap();
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      await updateProduct({ id: editingProduct.id, ...data }).unwrap();
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          {row.image && (
            <img
              src={row.image}
              alt={value}
              className="w-10 h-10 rounded-md object-cover"
            />
          )}
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">SKU: {row.sku}</div>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      type: "currency",
      sortable: true,
    },
    {
      key: "stock",
      label: "Stock",
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value > 10 ? "default" : value > 0 ? "outline" : "destructive"
          }
        >
          {value} in stock
        </Badge>
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
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingProduct(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteProduct(row.id)}
            disabled={deleting}
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
        totalPages: Math.ceil(productsData.total / 10),
        total: productsData.total,
        from: (page - 1) * 10 + 1,
        to: Math.min(page * 10, productsData.total),
      }
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Badge variant="outline">{productsData?.total || 0} products</Badge>
      </div>

      <DataTable
        data={productsData?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search products..."
        actions={
          <FormModal
            title="Create Product"
            description="Add a new product to your inventory"
            schema={productSchema}
            onSubmit={handleCreateProduct}
            loading={creating}
            mode="create"
          >
            {({ register, errors, setValue, watch }) => {
              const watchedCategoryId = watch("categoryId");

              // Update subcategories when category changes
              useEffect(() => {
                setSelectedCategoryId(watchedCategoryId);
                setValue("subcategoryId", "");
              }, [watchedCategoryId, setValue]);

              return (
                <>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Product Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter product name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Enter product description"
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">
                        Price
                      </label>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("price")}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-600">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="stock" className="text-sm font-medium">
                        Stock
                      </label>
                      <input
                        id="stock"
                        type="number"
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("stock")}
                      />
                      {errors.stock && (
                        <p className="text-sm text-red-600">
                          {errors.stock.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="categoryId"
                        className="text-sm font-medium"
                      >
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
                      <label
                        htmlFor="subcategoryId"
                        className="text-sm font-medium"
                      >
                        Subcategory
                      </label>
                      <select
                        id="subcategoryId"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("subcategoryId")}
                        disabled={!watchedCategoryId}
                      >
                        <option value="">Select subcategory</option>
                        {subcategoriesData?.data?.map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                      {errors.subcategoryId && (
                        <p className="text-sm text-red-600">
                          {errors.subcategoryId.message}
                        </p>
                      )}
                    </div>
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
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                    {errors.status && (
                      <p className="text-sm text-red-600">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </>
              );
            }}
          </FormModal>
        }
      />

      {/* Edit Modal */}
      {editingProduct && (
        <FormModal
          title="Edit Product"
          description="Update product information"
          schema={productSchema}
          defaultValues={editingProduct}
          onSubmit={handleUpdateProduct}
          loading={updating}
          mode="edit"
          trigger={<div style={{ display: "none" }} />}
        >
          {({ register, errors, setValue, watch }) => {
            const watchedCategoryId = watch("categoryId");

            useEffect(() => {
              setSelectedCategoryId(watchedCategoryId);
            }, [watchedCategoryId]);

            return (
              <>
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">
                    Product Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    placeholder="Enter product name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
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
                    placeholder="Enter product description"
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-price" className="text-sm font-medium">
                      Price
                    </label>
                    <input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("price")}
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-stock" className="text-sm font-medium">
                      Stock
                    </label>
                    <input
                      id="edit-stock"
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("stock")}
                    />
                    {errors.stock && (
                      <p className="text-sm text-red-600">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    <label
                      htmlFor="edit-subcategoryId"
                      className="text-sm font-medium"
                    >
                      Subcategory
                    </label>
                    <select
                      id="edit-subcategoryId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("subcategoryId")}
                      disabled={!watchedCategoryId}
                    >
                      <option value="">Select subcategory</option>
                      {subcategoriesData?.data?.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                    {errors.subcategoryId && (
                      <p className="text-sm text-red-600">
                        {errors.subcategoryId.message}
                      </p>
                    )}
                  </div>
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
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                  {errors.status && (
                    <p className="text-sm text-red-600">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </>
            );
          }}
        </FormModal>
      )}
    </div>
  );
}
