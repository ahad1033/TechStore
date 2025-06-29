import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { routes } from "./routes/index.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="techstore-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
