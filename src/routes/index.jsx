import {
  CartPage,
  HomePage,
  LoginPage,
  SignupPage,
  ContactPage,
  ProductsPage,
  ProductDetailPage,
} from "@/pages";
import { DashboardLayout } from "@/components/layouts";

import AnalyticsPage from "@/pages/dashboard/analytics-page";
import MainLayout from "@/components/layouts/main-layout.jsx";
import ProtectedRoute from "@/components/guard/protected-route";
import ProductForm from "@/pages/dashboard/product/product-form";
import CategoryForm from "@/pages/dashboard/category/category-form";
import DProductsPage from "@/pages/dashboard/product/products-page";
import SubcategoriesPage from "@/pages/dashboard/subcategories-page";
import CategoriesPage from "@/pages/dashboard/category/categories-page";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-category",
        element: (
          <ProtectedRoute>
            <CategoryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-category/:id",
        element: (
          <ProtectedRoute>
            <CategoryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <DProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-product",
        element: (
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategories",
        element: <SubcategoriesPage />,
      },
    ],
  },
];
