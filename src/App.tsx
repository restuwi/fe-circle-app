import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Profile from "./pages/profile";
import Follow from "./pages/follow";
import "./App.css";
import ThreadDetail from "./pages/threadDetail";

const App: React.FC = () => {
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/follow" element={<Follow />} />
      <Route path="/thread/:id" element={<ThreadDetail />} />
    </Routes>
  );
};

export default App;
