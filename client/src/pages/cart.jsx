import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const token = localStorage.getItem("batterytoken");
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  let total = 0;
  for (let i = 0; i < cartData.length; i++) {
    total += cartData[i].batteryID.price * cartData[i].qty;
  }
  console.log("total", total)
console.log("first",cartData )
  // get cart product
  const getCartProducts = () => {
    fetch("http://localhost:8080/user/cart_product", {
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
      })
      .catch((err) => console.log(err.message));
  };

  // delete cart product
  const HandleDelete = (id) => {
    fetch(
      `http://localhost:8080/user/cart_product/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("batterytoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: `product has been deleted`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        getCartProducts();
      })
      .catch((err) => {
        toast({
          title: `Something went wrong !`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  // update quantity
  const UpdateQty = (id, qty) => {
    fetch(
      `http://localhost:8080/user/cart_product/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("batterytoken"),
        },
        body: JSON.stringify({ qty }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        getCartProducts();
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  const handleClick = (id, val) => {
    let ans = cartData.filter((x) => x._id === id);
    UpdateQty(id, ans[0].qty + val);
    console.log(ans[0].qty);
  };

  return (
    <>
      {!token ? (
        <Center>
          <Text as="b" fontSize={25} color="red">
            You are not Logged In
          </Text>
        </Center>
      ) : cartData.length === 0 ? (
        <Box bg="#f6f6f6" h="90vh">
          <Grid align={"center"} gap="30px" p="50px">
            <Image
              h="100%"
              w={{ lg: "20%", md: "20%", sm: "20%" }}
              src={
                "https://blogzine.webestica.com/rtl/assets/images/icon/empty-cart.svg"
              }
              alt={""}
              m="auto"
            />
            <Text fontWeight={"700"}>Oops!</Text>
            <Text>Looks like there is no item in your cart yet.</Text>
            <Button
              size={"md"}
              borderRadius="5px"
              bg={"#ff6f61"}
              color="#fff"
              m="auto"
              _hover={{
                bg: "#fd7c70",
              }}
              onClick={() => navigate("/")}
            >
              ADD BATTERIES
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box bg="#f6f6f6" pb="50px">
          <Text fontWeight="700" fontSize={"24px"} textAlign="center" p="20px">
            Batteries in your cart
          </Text>
          <Flex
            w="90%"
            m="auto"
            gap={{ base: "50px" }}
            direction={{ lg: "row", md: "column", base: "column" }}
            p={{ lg: "10px 80px", md: "10px 40px", base: "column" }}
          >
            <Box>
              {cartData?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    w={{ lg: "600px", md: "600px", base: "300px" }}
                    h="auto"
                    m="auto"
                    bg="white"
                    p="20px 40px"
                    display={{ lg: "flex", md: "flex", base: "row" }}
                    justifyContent="space-between"
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                  >
                    <Box>
                      <Text
                        fontSize={{ lg: "14px", md: "12px", base: "12px" }}
                        fontWeight="700"
                        color={"#212121"}
                        lineHeight={"25px"}
                      >
                        {item.batteryID.desc}
                      </Text>
                      <Text
                        fontSize={"13px"}
                        fontWeight="700"
                        color={"#9e9e9e"}
                        lineHeight={"40px"}
                        cursor="pointer"
                        onClick={() => HandleDelete(item._id)}
                      >
                        <DeleteIcon fontSize={"15px"} /> Remove
                      </Text>
                    </Box>

                    <Box>
                      <Text
                        fontSize={"14px"}
                        fontWeight="700"
                        color={"#212121"}
                        lineHeight={"25px"}
                        textAlign={{ lg: "right", md: "right" }}
                      >
                        ${item.batteryID.price}
                      </Text>
                      {/*  */}
                      <Box display={"flex"} pt="20px" gap={"5px"}>
                        <Button
                          size="xs"
                          bg="white"
                          color="#ff6f61"
                          fontSize="14px"
                          borderRadius="full"
                          border="1px solid #ff6f61"
                          _hover={{
                            bg: "white",
                          }}
                          isDisabled={item.qty === 1}
                          onClick={() => {
                            handleClick(item._id, -1);
                          }}
                        >
                          -
                        </Button>

                        <Text>{item.qty} </Text>
                        <Button
                          size="xs"
                          bg="#ff6f61"
                          color="white"
                          fontSize="14px"
                          borderRadius="full"
                          _hover={{
                            bg: "#ff6f61",
                          }}
                          isDisabled={item.qty === 5}
                          onClick={() => {
                            handleClick(item._id, 1);
                          }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box
              m="auto"
              mt="0px"
              bg="white"
              p="20px 40px"
              display={"grid"}
              justifyContent="space-between"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              color="#757575"
              fontSize="12px"
              fontWeight="500"
              gap="5px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                lineHeight="30px"
                gap={{ lg: "220px", md: "200px", base: "60px" }}
              >
                <Text textAlign="left">Item Total(MRP)</Text>{" "}
                <Text textAlign="right">$ {total}</Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                lineHeight="30px"
              >
                <Text> Price Discount</Text> <Text textAlign="right">0%</Text>
              </Box>
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                lineHeight="30px"
              >
                <Text>Shipping Fee</Text> <Text>Free</Text>
              </Box>
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                color="#767676"
                fontSize="13px"
                fontWeight="700"
                lineHeight="30px"
              >
                <Text>To be paid</Text> <Text>{total}</Text>
              </Box>

              <Button
                onClick={() => navigate("/checkout")}
                bg="white"
                color="#ff6f61"
                fontSize="14px"
                borderRadius="full"
                border="1px solid #ff6f61"
                _hover={{
                  bg: "#ff6f61",
                  color: "white",
                }}
              >
                Proceed to checkout
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Cart;
