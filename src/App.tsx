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
import ResetPassword from "./pages/reset-password";

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
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/follow" element={<Follow />} />
      <Route path="/thread/:id" element={<ThreadDetail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
