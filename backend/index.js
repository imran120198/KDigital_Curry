const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/Config");
const { ProductRouter } = require("./Routes/Product.routes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Server");
});

app.use("/product", ProductRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
  console.log("Running on port 8080");
});
