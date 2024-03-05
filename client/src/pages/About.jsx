import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const About = () => {
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

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p
        style={{
          fontSize: "18px",
          color: "#666",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h1 className="text-3xl font-semibold text-center  p-4">
          Welcome,{" "}
          {user?.name && user.name.length > 1 ? capitalize(user.name) : "there"}
          !
        </h1>
        Hi{" "}
        <span
          style={{
            fontSize: "25px",
            color: "brown",
          }}
        >
          {user?.name && user.name.length > 1 ? capitalize(user.name) : "there"}{" "}
          ,
        </span>
        I'm Ayush Kanani, a third-year student studying Information Technology
        at L.D. College of Engineering. I'm passionate about using technology to
        solve everyday problems. I'm skilled in the MERN stack development.
        Together, we're finding new ways to engage students through digital
        solutions. I'm excited to be here and eager to share my experiences with
        you.
        <br />
        <br />
        We are a team of passionate software developers dedicated to creating
        the best Web App. Our mission is to make calculations easy and
        accessible for everyone. We believe in the power of technology to
        transform lives and we are committed to using our skills and expertise
        to make a positive impact in the world.
      </p>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          marginTop: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Connect with me:</h2>
        <a
          href="https://www.linkedin.com/in/ayushkanani/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "10px 20px", fontSize: "25px" }}
        >
          <FaLinkedin
            style={{ color: "darkgrey", margin: "0 5px" }}
            size={30}
          />
          LinkedIn
        </a>
        <a
          href="https://github.com/ayushkanani711"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "10px 20px", fontSize: "25px" }}
        >
          <FaGithub style={{ color: "darkgrey", margin: "0 5px" }} size={30} />
          GitHub
        </a>
        <a
          href="https://twitter.com/ayushkanani711"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "10px 20px", fontSize: "25px" }}
        >
          <FaTwitter style={{ color: "darkgrey", margin: "0 5px" }} size={30} />{" "}
          X
        </a>
      </div>
    </div>
  );
};

export default About;
