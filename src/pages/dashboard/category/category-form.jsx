/* eslint-disable no-unused-vars */
import * as yup from "yup";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/features/categoriesApi";

import LoadingButton from "@/components/shared/loading-button";

// Define the base schema for required fields
const baseCategorySchema = yup.object().shape({
  name: yup.string().trim().required("Category name is required"),
  description: yup.string().trim().required("Category description is required"),
});

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const isEdit = Boolean(id);

  const { data: currentCategoryData, isLoading: isCategoryLoading } =
    useGetCategoryQuery(id, {
      skip: !id,
    });

  const [imagePreview, setImagePreview] = useState(null);

  // Dynamic schema based on edit mode
  const categorySchema = yup.object().shape({
    ...baseCategorySchema.fields,
    image: isEdit
      ? yup
          .mixed()
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || !value[0]) return true;
            return ["image/jpeg", "image/png", "image/gif"].includes(
              value[0].type
            );
          })
          .test("fileSize", "Image must be less than 5MB", (value) => {
            if (!value || !value[0]) return true;
            return value[0].size <= 5 * 1024 * 1024;
          })
          .optional()
      : yup
          .mixed()
          .required("Category image is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (value && value[0]) {
              return ["image/jpeg", "image/png", "image/gif"].includes(
                value[0].type
              );
            }
            return false;
          })
          .test("fileSize", "Image must be less than 5MB", (value) => {
            if (value && value[0]) {
              return value[0].size <= 5 * 1024 * 1024;
            }
            return false;
          }),
  });

  const form = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  // Use useEffect to set default values and initial image preview when data loads
  useEffect(() => {
    if (isEdit && currentCategoryData && !isCategoryLoading) {
      form.reset({
        name: currentCategoryData.data.name,
        description: currentCategoryData.data.description,
        image: undefined,
      });
      setImagePreview(currentCategoryData.data.image);
    }
  }, [isEdit, currentCategoryData, isCategoryLoading, form]);

  // Handle image file change for preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If user clears the file input, clear the preview
      setImagePreview(isEdit ? currentCategoryData?.data?.image : null);
    }
  };

  const handleFormSubmit = async (data) => {
    let imageUrl = imagePreview;

    // Only upload if a new image file is selected
    if (data.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
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
          imageUrl = result.data.url;
          toast.success("Image uploaded successfully!");
        } else {
          throw new Error(`ImgBB API error: ${result.error.message}`);
        }
      } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
        toast.error("Failed to upload image. Please try again.");
        return;
      }
    } else if (isEdit && !data.image && !imagePreview) {
      imageUrl = null;
    }

    // Prepare the object to send to your database
    const categoryDataForDatabase = {
      name: data.name,
      description: data.description,
      image: imageUrl,
    };

    try {
      let result;
      if (isEdit) {
        result = await updateCategory({
          id,
          data: categoryDataForDatabase,
        }).unwrap();
      } else {
        result = await createCategory(categoryDataForDatabase).unwrap();
      }

      if (result.success) {
        toast.success(result.message || "Category saved successfully!");

        await new Promise((resolve) => setTimeout(resolve, 300));
        
        navigate("/dashboard/categories", { replace: true });
      } else {
        toast.error(result.message || "Failed to save category.");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("An unexpected error occurred while saving the category.");
    }

    // Reset form only if it's a new category creation
    if (!isEdit) {
      reset();
      setImagePreview(null);
    }
  };

  if (isEdit && isCategoryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading category data...</p>
      </div>
    );
  }

  return (
    <div className="container w-full max-w-7xl">
      <Form {...form} className="w-full">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-8 p-4 max-w-3xl mx-auto"
        >
          {/* Category Name Field */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name for the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A short description of the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleImageChange(e);
                    }}
                    {...rest}
                  />
                </FormControl>
                {imagePreview && (
                  <div className="mt-4">
                    <Label>Image Preview:</Label>
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mt-2 h-auto rounded-md w-full"
                    />
                  </div>
                )}
                <FormDescription>
                  Upload an image for the category (
                  {isEdit ? "optional" : "required"}, max 5MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSubmitting ? (
            <LoadingButton />
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "Save Changes" : "Create Category"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
