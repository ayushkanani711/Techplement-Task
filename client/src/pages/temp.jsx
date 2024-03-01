import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  
  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
  };

  const [user, setUser] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
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

  

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    setUser("");
    toast.success("Logout successfully", { position: "bottom-right" });
    navigate("/login");
  };

  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://localhost:8000/api/uploadImage", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.status === 400) {
        toast.error("File size too large, File should less than 10 MB", { position: "bottom-right" });
      } else
      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          images: [...prevUser.images, data.imageUrl],
        }));
        toast.success("Image uploaded successfully", {
          position: "bottom-right",
        });
        setImage(null)
        window.location.reload();
      } else {
        toast.error("Failed to upload image", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image", { position: "bottom-right" });
    }
    setUploading(false);
  };


  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-semibold text-center mb-6 p-4">
          Welcome,{" "}
          {user.name && user.name.length > 1 ? capitalize(user.name) : "there"}!
        </h1>
        <div
          className="flex justify-end"
          style={{ position: "fixed", right: "0%" }}
        >
          {!isLoggedin ? (
            <>
              <Link to="/signup" className="btn btn-dark my-2 p-3 m-2 rounded">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-dark my-2 p-3 m-2 rounded">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-dark my-2 p-3 m-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className=" p-2  m-4">
        <label htmlFor="avatar" className="block">
          Avatar:
          {/* {cloudinaryRef.current && ( */}
          <input type="file" id="avatar" onChange={handleFileChange} />
          {/* )} */}
        </label>
        <button onClick={handleUpload} className="btn btn-primary" style={{
    backgroundColor: uploading ? 'darkgray' : 'green', 
    color: 'white'
  }}>
        {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      {image && (
        <div className="m-2 p-2">
          <h1>Image Preview</h1>
          <img
            src={image}
            alt="User avatar"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
      {user && (
        <>
          <h1>Uploaded images</h1>
          <div className="image-grid">
            {user.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index}`}
                style={{ width: "300px", height: "300px", objectFit: "cover", margin: "10px", borderRadius: "10px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"}}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
