import { Card, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {rsclogo} from "../rsclogo.png"

const Payment = () => {
  const adress = JSON.parse(localStorage.getItem("address"));
  const [cartData, setCartData] = useState([]);

  let total = 0;
  for (let i = 0; i < cartData.length; i++) {
    total += cartData[i].batteryID.price * cartData[i].qty;
  }
  console.log("total", total);

  const getCartProducts = () => {
    fetch("https://rich-tick-cloak.cyclic.app/user/cart_product", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("batterytoken"),
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((res) => {
        setCartData(res);
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: "40px", background: "#FAFAFA" }}>
        <div background={"gray"}>
          <Card
            w={"600px"}
            mt={"20px"}
            marginLeft={"150px"}
            bg={"#fef7ef"}
            h={"auto"}
          >
            <img src="https://www.moglix.com/blog/wp-content/uploads/2020/02/inverter-batteries-blog-banner.jpg" alt="" />
          </Card>
        </div>

        <div
          style={{
            width: "300px",
            border: "0px solid red",
            height: "auto",
            marginTop: "50px",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Select Address</Text>

            <Link to="/Checkout">
              <Text color={"red"}>CHANGE</Text>
            </Link>
          </div>
          <div
            style={{
              height: "auto",
              width: "95%",
              border: "0px solid red",
              bg: "white",
              padding: "20px",
              marginTop: "20px",
            }}
            id="adress-card"
          >
            <Text fontSize={"15px"} fontWeight={"bold"}>
              Home
            </Text>
            <Text fontSize={"12px"}>{adress.name}</Text>
            <Text fontSize={"12px"}>{adress.mobile}</Text>
            <Text fontSize={"12px"}>
              {adress.city},{adress.locality},{adress.flat_number}
            </Text>
          </div>

          <div
            style={{
              height: "auto",
              width: "95%",
              border: "0px solid red",
              marginTop: "50px",
              padding: "20px",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Text fontSize={"12px"}>Item Total(MRP)</Text>
              <Text fontSize={"12px"}>{total}</Text>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Text fontSize={"12px"}>Shipping free</Text>
              <hr color="red" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Text fontSize={"12px"}>To be paid</Text>
              <Text fontSize={"12px"}>$ {total}</Text>
            </div>

            <Link to={"/cardpayment"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "auto",
                  background: "#ff6f61",
                  marginTop: "30px",
                  height: "40px",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                }}
              >
                PROCEED TO PAYMENT
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
