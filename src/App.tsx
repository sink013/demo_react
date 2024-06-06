import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<MainLayout />}>
        <Route path="index" element={<div>shouye</div>} />
        <Route path="user/list" element={<UserList />} />
        <Route path="product/product_list" element={<ProductList />} />
        <Route path="product/add_product" element={<ProductForm />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
