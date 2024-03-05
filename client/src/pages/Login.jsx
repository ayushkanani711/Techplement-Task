import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import backgroundImage from "../../public/bgImage.jpg";

const login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://techplement-server.vercel.app/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
      toast.success("Login successfully", { position: "bottom-right" });
    } else {
      toast.error("Login Denide", { position: "bottom-right" });
    }
    console.log("Login successfully");
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          top: "30%",
          left: "50%",
          position: "absolute",
          width: "40%",
        }}
      >
        <h2 className="container my-2">Login to continue Calculator</h2>
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={credentials.email}
              onChange={onChange}
              name="email"
              placeholder="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="password"
              name="password"
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-dark my-2">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-500">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
