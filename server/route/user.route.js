const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const UserModel = require("../model/user.model");
const { CartProductsModel } = require("../model/cart.model");

const userRouter = express.Router();
// signup
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.find({ email });
  if (user.length <= 0) {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went Wrong", error: err.message });
        } else {
          const user = new UserModel({
            name,
            email,
            password: hash,
          });
          await user.save();
          res.send({ msg: "New user has been registered" });
        }
      });
    } catch (error) {
      res.send({ msg: "Something went Wrong", error: error.message });
    }
  } else {
    res.send({ msg: "User already exist, please login" });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id }, "rittik");
          await UserModel.findByIdAndUpdate(
            { _id: user._id },
            { is_active: true }
          );
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "User not found!" });
    }
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot login", error: err.message });
  }
});

// get all battery which are added by users 
userRouter.get("/cart_product", auth, async (req, res) => {
  const userID = req.body.userID;
  console.log("userId", userID)
  try {
    const cart = await CartProductsModel.find({ userID }).populate("batteryID");
    res.send(cart);
  } catch (err) {
    res.send({
      msg: "somthing went wrong! cannot Get cart Products",
      error: err.message,
    });
  }
});

// add to cart by users
userRouter.post("/cart_product/add/:id", auth, async (req, res) => {
  const batteryID = req.params.id;
  try {
    const cart = new CartProductsModel({ ...req.body, batteryID, qty: 1 });
    await cart.save();
    res.send({ msg: "Product added to cart" });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot add", error: err.message });
  }
});

// update quantity and size of the battery by users
userRouter.patch("/cart_product/update/:id", async (req, res) => {
  const ID = req.params.id;
  const { qty } = req.body;
  try {
    await CartProductsModel.findByIdAndUpdate({ _id: ID }, { qty });
    res.send({ msg: "Product has been updated" });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot update", error: err.message });
  }
});

//delete battery from cart by users---------------->
userRouter.delete("/cart_product/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await CartProductsModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: "Product has been deleted from cart" });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot delete", error: err.message });
  }
});

//delete all battery from cart by users
userRouter.delete("/clear_cart",auth, async (req, res) => {
  const userID = req.body.userID;
  console.log(userID)
  try {
   let ans =  await CartProductsModel.deleteMany({ userID });
    res.send(ans)
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot delete", error: err.message });
  }
});

module.exports = userRouter;