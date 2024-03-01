const connectToMongo = require("./db.js");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

//Connect to mongoDB
connectToMongo();

app.use(cors());
app.use(express.json());

app.use("/api", require("./route.js"));

app.get("/", (req, res) => {
  res.send("Welcome to the Blinkit app!");
});

app.listen(port, () => {
  console.log(`\n Server listening on port ${port}`);
});
