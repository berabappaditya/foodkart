import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import { getProductItems } from "./features/product/productSlice";
import Header from "./features/Header";
import Cart from "./features/cart/Cart";
import Home from "./features/Home";
import Search from "./features/Search/Search";
import "./App.css";

function App() {
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductItems());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <HashRouter className="main-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
