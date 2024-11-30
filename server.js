const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const foodRouter = require("./routes/food");
const paymentRouter = require("./routes/payment");
const addressRouter = require("./routes/address");
const orderRouter = require("./routes/order");
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running live on port ${process.env.PORT}`);
  mongoose.connect(process.env.MONGOOSE_URI, {});
  mongoose.connection.on("error", (error) => {
    console.error(error);
  });
});
