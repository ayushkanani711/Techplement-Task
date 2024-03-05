import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import History from "./pages/History";
import About from "./pages/About";

function App() {
  const [user, setUser] = useState(null);

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
        const json = await response.json();
        if (!json) {
          toast.error("Please login to continue", { position: "bottom-right" });
          navigate("/login");
        }
        setUser(json);
        setIsLoggedin(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
