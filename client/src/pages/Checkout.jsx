import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  let [address, setAddress] = React.useState({
    city: "",
    flat_number: "",
    locality: "",
    mobile: "",
    name: "",
    pincode: "",
    state: "",
  });

  const navigate = useNavigate();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const HandleAddress = () => {
    localStorage.setItem("address", JSON.stringify(address));
    navigate("/payment");
  };
  return (
    <>
      <Box padding={"50px"} backgroundColor={"gray.100"}>
        <Box
          backgroundColor={"gray.100"}
          style={{
            border: "0px solid gray",
            marginLeft: "200px",
            color: "333333",
            fontSize: "16px",
            fontFamily: "Clear SansHelvetica Neue",
          }}
        >
          Add New Address
        </Box>
        <Box
          style={{
            borderStyle: "ridge",
            width: "40%",
            height: "750px",
            marginLeft: "200px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <input
            onChange={HandleChange}
            name="flat_number"
            type={"text"}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "80px",
              borderRadius: "5px",
            }}
            placeholder="Flatnumber,BuildingName,Streetname,City"
          />
          <input
            onChange={HandleChange}
            name="pincode"
            type={"number"}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "40px",
              borderRadius: "5px",
            }}
            placeholder="Pincode"
          />
          <input
            onChange={HandleChange}
            name="locality"
            type={"text"}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "40px",
              borderRadius: "5px",
            }}
            placeholder="Locality"
          />
          <input
            onChange={HandleChange}
            name="city"
            type={"text"}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "40px",
              borderRadius: "5px",
            }}
            placeholder="City"
          />
          <input
            onChange={HandleChange}
            name="state"
            type={"text"}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "40px",
              borderRadius: "5px",
            }}
            placeholder="State"
          />
          <input
            onChange={HandleChange}
            name="name"
            type={""}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "40px",
              borderRadius: "5px",
            }}
            placeholder="Customer Name"
          />
          <input
            onChange={HandleChange}
            name="mobile"
            type={"tel"}
            style={{
              textAlign: "start",
              padding: "5px",
              fontFamily:
                "Clear Sans Helvetica Neue Helvetica Arial sans-serif",
              border: "1px solid gray",
              width: "95%",
              margin: "15px",
              height: "40px",
              borderRadius: "5px",
            }}
            placeholder="10 Digits Mobile Number"
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyItems: "end",
              justifyContent: "end",
            }}
          >
            <button
              onClick={() => navigate("/cart")}
              style={{
                backgroundColor: "white",
                color: "#ff6f61",
                fontFamily:
                  "Clear Sans Helvetica Neue HelveticaArial sans-serif",
                fontSize: "15px",
                width: "100px",
                height: "40px",
              }}
            >
              {" "}
              Back
            </button>
            <Button
              onClick={HandleAddress}
              style={{
                backgroundColor: "#ff6f61",
                color: "white",
                fontFamily:
                  "Clear Sans Helvetica Neue HelveticaArial sans-serif",
                fontSize: "15px",
                width: "100px",
                height: "40px",
              }}
              isDisabled={
                address.city === "" ||
                address.flat_number === "" ||
                address.locality === "" ||
                address.mobile === "" ||
                address.name === "" ||
                address.pincode === "" ||
                address.state === ""
                  ? true
                  : false
              }
            >
              SAVE
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Checkout;
