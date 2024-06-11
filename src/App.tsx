import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Profile from "./pages/profile";
import Follow from "./pages/follow";
import "./App.css";
import ThreadDetail from "./pages/threadDetail";
import { useAppDispatch } from "./store";
import { checkAsync } from "./store/async/auth";
import NotFound from "./pages/not-found";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Register from "./pages/auth/register";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const AuthCheck = async () => {
    const token = localStorage.token;
    if (token) {
      await dispatch(checkAsync(token));
    }
  };

  useEffect(() => {
    AuthCheck();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/follow" element={<Follow />} />
      <Route path="/thread/:id" element={<ThreadDetail />} />

      <Route path="/:username" element={<Profile />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
