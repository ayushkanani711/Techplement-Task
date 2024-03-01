import React, { useEffect, useState } from "react";

const Home = () => {
  const [calc, setCalc] = useState("");
  const [user, setUser] = useState(null);
  const [operation, setOperation] = useState("");

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, []);

  const handleClick = (val) => {
    setCalc(calc + val);
  };

  const backspace = () => {
    setCalc(calc.slice(0, -1));
  };

  const clearInput = () => {
    setCalc("");
    setOperation("");
  };

  const calculate = async () => {
    try {
      let result = eval(calc);
      result = Number(result.toFixed(4)); // limit to 4 decimal places and remove trailing zeros
      setOperation(calc);
      setCalc(result.toString());

      // Store the calculation in the database
      const response = await fetch(
        "http://localhost:8000/api/storeCalculation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ operation: calc, result }),
        }
      );
    } catch (error) {
      setCalc("Error");
      console.error(error);
    }
  };

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center  p-4">
        Welcome,{" "}
        {user?.name && user.name.length > 1 ? capitalize(user.name) : "there"}!
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            width: "445px",
            backgroundColor: "#333",
            padding: "20px",
            borderRadius: "10px",
            color: "white",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100px",
              marginBottom: "10px",
              backgroundColor: "#666",
              color: "white",
              textAlign: "right",
              paddingRight: "10px",
              fontSize: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <div style={{ color: "white", fontSize: "20px" }}>{operation}</div>
            <div>{calc}</div>
          </div>
          <div>
            {[
              ["1", "2", "3", "+"],
              ["4", "5", "6", "-"],
              ["7", "8", "9", "*"],
              [".", "0", "/", "="],
            ].map((row, i) => (
              <div key={i} style={{ display: "flex" }}>
                {row.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      item === "=" ? calculate() : handleClick(item)
                    }
                    style={{
                      width: "90px",
                      height: "70px",
                      margin: "5.5px",
                      backgroundColor: item === "=" ? "#59D5E0" : "#7E6363",
                      color: "white",
                      fontSize: "30px",
                      border: "none",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
            <div style={{ display: "flex" }}>
              <button
                onClick={clearInput}
                style={{
                  width: "190px",
                  height: "70px",
                  margin: "5.5px",
                  backgroundColor: "#B80000",
                  color: "white",
                  fontSize: "25px",
                  border: "none",
                }}
              >
                Clear
              </button>
              <button
                onClick={backspace}
                style={{
                  width: "190px",
                  height: "70px",
                  margin: "5.5px",
                  backgroundColor: "#DF826C",
                  color: "white",
                  fontSize: "25px",
                  border: "none",
                }}
              >
                Backspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
