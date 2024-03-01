import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../../public/bgImage.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    const response = await fetch(`http://localhost:8000/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/home');
      toast.success("Account created successfully", {position: "bottom-right"});
    } 
    else if(json.errors && json.errors[0].msg === "Enter valid Email"){
      toast.error("Enter valid Email", {position: "bottom-right"});
    }
    else {
      toast.error("Please try to login with a new email", {position: "bottom-right"});

    }
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
          padding: "10px",
          borderRadius: "10px",
          top: "30%",
          left: "50%",
          position: "absolute",
          width: "40%",
        }}
      >
        <div className="container">
          <h2 className="container my-2">Signup to continue Calculator</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                placeholder="name"
                onChange={handleChange}
                minLength={3}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                minLength={5}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-dark my-2">
                Sign up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
