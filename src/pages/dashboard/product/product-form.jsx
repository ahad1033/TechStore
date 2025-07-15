/* eslint-disable no-unused-vars */
import * as yup from "yup";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LoadingButton from "@/components/shared/loading-button";
import RichTextEditor from "@/components/text-editor/rich-text-editor";

import { useGetCategoriesQuery } from "@/store/features/categoriesApi";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/store/features/productsApi";
import CircularLoading from "@/components/shared/circular-loading";

const ProductForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // State for image previews (array of URLs)
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const { data: categories, isLoading: categoryLoading } =
    useGetCategoriesQuery({ page: 1, limit: 100 });

  const { data: currentProduct, isLoading: productLoading } =
    useGetProductQuery(id, {
      skip: !id,
    });

  const initialData = currentProduct && currentProduct?.data;

  const loadingState = categoryLoading && productLoading;

  // Determine if we are in edit mode
  const isEdit = Boolean(initialData && initialData.id);

  const [createProduct] = useCreateProductMutation();

  const [updateProduct] = useUpdateProductMutation();

  // --- Dynamic Yup Schema Definition ---
  const productSchema = yup.object().shape({
    categoryId: yup.string().required("Category is required"),
    title: yup.string().trim().required("Product title is required"),
    description: yup
      .string()
      .required("Product description is required")
      .min(10, "Description must be at least 10 characters"),
    features: yup.string(),
    specifications: yup.string(),
    regularPrice: yup
      .number()
      .typeError("Regular price must be a number")
      .positive("Regular price must be positive")
      .required("Regular price is required"),
    discountPrice: yup
      .number()
      .typeError("Discount price must be a number")
      .min(0, "Discount price cannot be negative")
      .lessThan(
        yup.ref("regularPrice"),
        "Discount price must be less than regular price"
      )
      .optional(),
    images: isEdit
      ? yup
          .array()
          .of(yup.mixed())
          .max(4, "You can upload a maximum of 4 images")
          .test(
            "atLeastOneImage",
            "At least one image is required",
            function (value) {
              return (
                (initialData?.images && initialData.images.length > 0) ||
                (value &&
                  value.length > 0 &&
                  value.some((file) => file instanceof File))
              );
            }
          )
          .optional()
      : yup
          .array()
          .of(yup.mixed())
          .min(1, "At least one image is required")
          .max(4, "You can upload a maximum of 4 images")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || value.length === 0) return true;
            return value.every((file) =>
              [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/jpeg",
                "image/webp",
              ].includes(file.type)
            );
          })
          .test("fileSize", "Each image must be less than 2MB", (value) => {
            if (!value || value.length === 0) return true;
            return value.every((file) => file.size <= 1 * 1024 * 1024);
          })
          .required("At least one image is required"),
  });

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      features: "",
      specifications: "",
      regularPrice: "",
      discountPrice: "",
      images: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form;

  // Effect to set default values and initial image previews when data loads for edit
  useEffect(() => {
    if (isEdit && initialData) {
      form.reset({
        categoryId: initialData.categoryId?.id || "",
        title: initialData.title || "",
        description: initialData.description || "",
        features: initialData.features || "",
        specifications: initialData.specifications || "",
        regularPrice: initialData.regularPrice || "",
        discountPrice: initialData.discountPrice || "",
        images: undefined,
      });

      setImagePreviews(initialData.images || []);
    } else {
      // Reset for create mode
      form.reset({
        categoryId: "",
        title: "",
        description: "",
        features: "",
        specifications: "",
        regularPrice: "",
        discountPrice: "",
        images: undefined,
      });
      setImagePreviews([]);
    }
  }, [initialData, isEdit, form]);

  // Handle image file change for preview
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const limitedFiles = files.slice(0, 4 - imagePreviews.length);

      const newPreviews = limitedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setValue(
        "images",
        [...(form.getValues("images") || []), ...limitedFiles],
        { shouldValidate: true }
      );
    } else {
      const existingImages = isEdit ? initialData?.images || [] : [];
      setImagePreviews(existingImages);
      setValue("images", existingImages, { shouldValidate: true });
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    const currentFiles = form.getValues("images") || [];
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setValue("images", updatedFiles, { shouldValidate: true });
  };

  const handleFormSubmit = async (data) => {
    setIsUploadingImages(true);
    let uploadedImageUrls = [];

    const filesToUpload = data.images.filter((file) => file instanceof File);
    const existingImageUrls = data.images.filter(
      (url) => typeof url === "string"
    );

    if (isEdit && filesToUpload.length === 0 && existingImageUrls.length > 0) {
      uploadedImageUrls = existingImageUrls;
    } else {
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", import.meta.env.VITE_IMGBB_API_KEY);

        try {
          const response = await fetch(import.meta.env.VITE_IMGBB_UPLOAD_URL, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Image upload failed: ${response.statusText}`);
          }

          const result = await response.json();
          if (result.success) {
            uploadedImageUrls.push(result.data.url);
          } else {
            throw new Error(`ImgBB API error: ${result.error.message}`);
          }
        } catch (error) {
          console.error("Error uploading image to ImgBB:", error);
          toast.error("Failed to upload image: " + error.message);
          setIsUploadingImages(false);
          return;
        }
      }
      uploadedImageUrls = [...existingImageUrls, ...uploadedImageUrls];
    }

    // Prepare the object to send to your database
    const productDataForDatabase = {
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      features: data.features,
      specifications: data.specifications,
      regularPrice: data.regularPrice,
      discountPrice: data.discountPrice || null,
      images: uploadedImageUrls,
    };

    try {
      let result;
      if (isEdit) {
        result = await updateProduct({
          id,
          data: productDataForDatabase,
        }).unwrap();
      } else {
        result = await createProduct(productDataForDatabase).unwrap();
      }

      if (result.success) {
        toast.success(result.message || "Product created successfully!");

        await new Promise((resolve) => setTimeout(resolve, 300));

        navigate("/dashboard/products", { replace: true });
      } else {
        toast.error(result.message || "Failed to save product.");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("An unexpected error occurred while saving the product.");
    }

    // Reset form only if it's a new product creation
    if (!isEdit) {
      // --- TODO ---
      //   reset();
      //   setImagePreviews([]);
    }
    setIsUploadingImages(false);
  };

  return (
    <div className="container w-full max-w-7xl">
      {id && loadingState ? (
        <CircularLoading />
      ) : (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-8 p-4 max-w-3xl mx-auto"
          >
            {/* Category Dropdown */}
            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => {
                console.log("category field: ", field);
                return (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.data?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the category this product belongs to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Product Title Field */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Regular Price Field */}
            <FormField
              control={control}
              name="regularPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regular Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 99.99"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Price Field */}
            <FormField
              control={control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 79.99"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Must be less than the regular price.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field (Rich Text Editor) */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter product description..."
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features Field (Rich Text Editor) */}
            <FormField
              control={control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="List product features..."
                    />
                  </FormControl>
                  <FormDescription>
                    Highlight key features of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specifications Field (Rich Text Editor) */}
            <FormField
              control={control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specifications</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Detail product specifications..."
                    />
                  </FormControl>
                  <FormDescription>
                    Provide technical specifications of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images Upload Field */}
            <FormField
              control={control}
              name="images"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Product Images (Max 4)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*, image/jpeg"
                      multiple
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                      disabled={imagePreviews.length >= 4}
                      {...rest}
                    />
                  </FormControl>
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {imagePreviews.map((src, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={src}
                            alt={`Product Image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 rounded-full p-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                          >
                            X
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormDescription>
                    Upload up to 4 images for the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isEdit ? "Save Changes" : "Create Product"}
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};

export default ProductForm;
