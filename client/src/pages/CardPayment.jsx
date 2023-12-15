import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  export default function CardPayment() {
    const [cred, setCred] = useState({ card: "", cvv: "", expiry: "" });
  
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const HandleChange = (e) => {
      const { name, value } = e.target;
      setCred({ ...cred, [name]: value });
    };
    console.log(cred);
    const HandlePlaceOrder = () => {
      fetch(`http://localhost:8080/user/clear_cart`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("batterytoken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setFlag(!flag);
          toast({
            title: `order successfully placed`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/success");
        })
        .catch((err) => console.log(err.message));
    };
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Place order</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Card Number</FormLabel>
                <Input onChange={HandleChange} name="card" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>CVV</FormLabel>
                <Input onChange={HandleChange} name="cvv" type="password" />
              </FormControl>
              <FormControl>
                <FormLabel>Expiry</FormLabel>
                <Input onChange={HandleChange} name="expiry" type="date" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  onClick={HandlePlaceOrder}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isDisabled={
                    cred.cred === "" || cred.cvv === "" || cred.expiry === ""
                      ? true
                      : false
                  }
                >
                  Place Order
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  