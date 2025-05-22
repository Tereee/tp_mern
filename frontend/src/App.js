import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterForm from "./components/LoginRegisterForm";
import AdList from "./components/AdList";
import AdDetails from "./components/AdDetails";
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <Header token={token} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <LoginRegisterForm onAuth={setToken} />
            ) : (
              <AdList token={token} />
            )
          }
        />
        <Route path="/ads/:id" element={<AdDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
