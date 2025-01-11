/* eslint-disable react-refresh/only-export-components */

import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import ProductList from './components/ProductList.jsx';

// Lazy load the Cart, ProductDetails, and CheckOutPage components
const Cart = lazy(() => import("./components/Cart.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const CheckOutPage = lazy(() => import("./components/CheckOutPage.jsx"));

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading Cart...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<div>Loading Product Details...</div>}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<div>Loading Checkout Page...</div>}>
            <CheckOutPage />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRoutes} />
  </StrictMode>
);
