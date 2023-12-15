const express = require("express");
const BatteryModel = require("../model/battery.model");
const { auth } = require("../middleware/auth.middleware");

const batteryRouter = express.Router();

// get route for battery
batteryRouter.get("/", async (req, res) => {
  try {
    let data = await BatteryModel.find();
    res.send(data);
  } catch (err) {
    res.send({
      msg: "somthing went wrong! cannot Get battery Details",
      error: err.message,
    });
  }
});

// add battery route

batteryRouter.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const data = new BatteryModel(req.body);
    await data.save();
    res.send({ msg: "Battery has been added successfully" });
  } catch (err) {
    res.send({
      msg: "somthing went wrong! cannot add the Battery",
      error: err.message,
    });
  }
});


//GET battery  BY ID
batteryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await BatteryModel.findOne({ _id: id });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { batteryRouter };
