import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successfully", { position: "bottom-right" });
    navigate("/login");
  };
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      <div>
        <Link
          to="/home"
          style={{ margin: "0 10px", color: "white", textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          to="/history"
          style={{ margin: "0 10px", color: "white", textDecoration: "none" }}
        >
          History
        </Link>
        <Link
          to="/about"
          style={{ margin: "0 10px", color: "white", textDecoration: "none" }}
        >
          About Us
        </Link>
      </div>

      {localStorage.getItem("token") ? (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#666",
            color: "white",
            border: "none",
            padding: "5px 10px",
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#666",
            color: "white",
            border: "none",
            padding: "5px 10px",
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
