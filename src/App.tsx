import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import UserList from "./pages/UserList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<MainLayout />}>
        <Route path="index" element={<div>shouye</div>} />
        <Route path="user/list" element={<UserList />} />
        <Route path="product/product_list" element={<div>product_list</div>} />
        <Route path="product/add_product" element={<div>add_product</div>} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
