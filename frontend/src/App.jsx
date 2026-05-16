import React from "react";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Bag from "./pages/Bag";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyAccount from "./pages/MyAccount";
import Auth from "./pages/Auth";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Auth Route - No Header/Footer */}
        <Route path="/auth" element={<Auth />} />

        {/* Routes with Header/Footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/bag"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Bag />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Wishlist />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <FAQ />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/terms"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Terms />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/watches"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Collection />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/product/:slug"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Product />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <Checkout />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordersuccess"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <OrderSuccess />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/myaccount"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <MyAccount />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
