import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // استدعاء ملف الـ CSS
import { ThemeProvider } from "./context/themeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // جعلنا App هو العنصر الرئيسي
    children: [
      {
        index: true, // يعني المسار "/" الافتراضي
        element: <Home />,
      },
      {
        path: "about", // المسار "/about"
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} /> {/* 💡 لاحظ: حذفنا App من هنا وجعلناه self-closing */}
    </ThemeProvider>
  </React.StrictMode>
);