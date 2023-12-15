/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./signup";
import Login from "./login";
import Battery_Details from "./Battery_Details";
import Cart from "./cart";
import Checkout from "./Checkout";
import Payment from "./Payment";
import CardPayment from "./CardPayment";
import Success from "./Success";

export const Allroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/batterydetails/:id" element={<Battery_Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cardpayment" element={<CardPayment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
};
