import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <img
        style={{ height: "80vh" }}
        src="https://gregoryonlinestores.com/wp-content/uploads/2023/03/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
        alt=""
      />
      <Link to={"/"}>
        {" "}
        <Button
          w={"100%"}
          size={"md"}
          borderRadius="5px"
          bg={"#ff6f61"}
          _hover={{
            bg: "#fd7c70",
          }}
          color="#fff"
        >
          Shop Again
        </Button>
      </Link>
    </div>
  );
};

export default Success;
