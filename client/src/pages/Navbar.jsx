import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ setUser }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await fetch(
          `https://techplement-server.vercel.app/api/getuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          const json = await response.json();
          if (!json) {
            toast.error("Please login to continue", {
              position: "bottom-right",
            });
            navigate("/login");
          } else {
            setUser(json);
            setIsLoggedin(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    setUser("");
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

      {isLoggedin ? (
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
