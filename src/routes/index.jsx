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
import CategoriesPage from "@/pages/dashboard/categories-page";
import SubcategoriesPage from "@/pages/dashboard/subcategories-page";

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
        element: <AnalyticsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "subcategories",
        element: <SubcategoriesPage />,
      },
    ],
  },
];
