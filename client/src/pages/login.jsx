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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [cred, setCred] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  // function to store login cred from input
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };

  // login function
  const HandleLogin = async () => {
    try {
      let r = await fetch(
        `https://rich-tick-cloak.cyclic.app/user/login`,
        {
          method: "POST",
          body: JSON.stringify(cred),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let d = await r.json();
      if (d.token) {
        localStorage.setItem("batterytoken", d.token);
        toast({
          title: `${d.msg}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/");
        window.location.reload();
      } else {
        toast({
          title: `${d.msg}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      console.log(d);
    } catch (error) {
      toast({
        title: "Oops! something went wrong",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={HandleChange} name="email" type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={HandleChange} name="password" type="password" />
            </FormControl>
            <Button
              onClick={HandleLogin}
              w={"100%"}
              size={"md"}
              borderRadius="5px"
              bg={"#ff6f61"}
              _hover={{
                bg: "#fd7c70",
              }}
              color="#fff"
            >
              Login
            </Button>
            <Text>
              Don't have an account ?{" "}
              <Link style={{ color: "blue" }} to="/signup">
                Signup
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
