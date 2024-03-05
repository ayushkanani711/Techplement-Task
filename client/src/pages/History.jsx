import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "https://techplement-server.vercel.app/api/getHistory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setHistory(data.history);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center  p-4">History</h1>
      {history?.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: "5px 0", fontWeight: "bold", fontSize: "20px" }}>
            {item?.operation}
            <span style={{ margin: "5px 0", color: "#333" }}>
              {" "}
              = {item?.result}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default History;
