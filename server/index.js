const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connecion } = require("./config/db");
const userRouter = require("./route/user.route");
const { batteryRouter } = require("./route/battery.route");
const PORT = 8080
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/battery",batteryRouter)

app.get("/",(req,res)=>{
  res.send("home page")
})
app.listen(PORT, async () => {
  try {
    await connecion;
    console.log("connected to DB");
  } catch (err) {
    console.log("server error");
  }
  console.log(`server is running at port ${PORT}`);
});
