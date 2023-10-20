const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { router } = require("./Routes");
require("dotenv").config();
// Add this middleware to parse JSON in the request body
app.use(express.json());
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("mongoose is connected...."))
  .catch((e) => {
    console.log("mongose is not connected");
  });

  

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
