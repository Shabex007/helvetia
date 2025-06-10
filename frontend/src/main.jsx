import React from "react";
import ReactDOM from "react-dom/client";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <ScrollToTop />
        <App />
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
);
