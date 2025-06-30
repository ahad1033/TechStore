import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Edit } from "lucide-react";

export default function FormModal({
  title,
  description,
  schema,
  defaultValues = {},
  onSubmit,
  loading = false,
  trigger = null,
  mode = "create", // "create" or "edit"
  children,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      reset();
    }
  };

  // eslint-disable-next-line no-unused-vars
  const renderField = (field) => {
    const { name, type, label, placeholder, options, ...rest } = field;

    switch (type) {
      case "select":
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Select
              onValueChange={(value) => setValue(name, value)}
              defaultValue={defaultValues[name]}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[name] && (
              <p className="text-sm text-destructive">{errors[name].message}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Textarea
              id={name}
              placeholder={placeholder}
              {...register(name)}
              {...rest}
            />
            {errors[name] && (
              <p className="text-sm text-destructive">{errors[name].message}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type="number"
              placeholder={placeholder}
              {...register(name)}
              {...rest}
            />
            {errors[name] && (
              <p className="text-sm text-destructive">{errors[name].message}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type={type || "text"}
              placeholder={placeholder}
              {...register(name)}
              {...rest}
            />
            {errors[name] && (
              <p className="text-sm text-destructive">{errors[name].message}</p>
            )}
          </div>
        );
    }
  };

  const defaultTrigger = (
    <Button variant={mode === "create" ? "default" : "outline"} size="sm">
      {mode === "create" ? (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </>
      ) : (
        <>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </>
      )}
    </Button>
  );

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger || defaultTrigger}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 mt-6"
        >
          <div className="space-y-4">
            {children ? children({ register, errors, setValue, watch }) : null}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
