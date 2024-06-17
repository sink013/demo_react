import React, { lazy, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
// import UserLevel from "./pages/UserLevel";
const UserLevel = lazy(() => import("./pages/UserLevel"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <ErrorBoundary fallback={<p>出错了，请刷新重试或更换浏览器</p>}>
      <Suspense fallback={<h3>加载中...</h3>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route path="index" element={<div>首页</div>} />
            <Route path="user/level" element={<UserLevel />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
          <Route path="/" element={<Navigate to="/admin/user/level" />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
