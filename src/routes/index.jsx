import MainLayout from "@/components/layouts/main-layout.jsx";
import {
  CartPage,
  ContactPage,
  HomePage,
  LoginPage,
  ProductDetailPage,
  ProductsPage,
  SignupPage,
} from "@/pages";

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
  // Future dashboard routes (commented out for now)
  // {
  //   path: "/dashboard",
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <DashboardHome />,
  //     },
  //     // Add more dashboard routes here
  //   ],
  // },
];
