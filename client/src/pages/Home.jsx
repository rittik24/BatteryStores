import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Grid,
  Button,
  InputGroup,
  Input,
  Icon,
  InputLeftAddon,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
const Home = () => {
  const [battery, setBattery] = useState([]);

  //   get all battery
  const getAllBattery = async () => {
    try {
      let r = await fetch(`http://localhost:8080/battery`);
      let d = await r.json();
      setBattery(d);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBattery();
  }, []);


  return (
    <>
      <Grid
        templateColumns={{
          xl: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
          md: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
        }}
        w={"90%"}
        m={"auto"}
        mt={"2%"}
      >
        {battery.length === 0 ? (
          <Text
            textAlign={"center"}
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"darkgray"}
          >
            Results not found related to your search
          </Text>
        ) : (
          battery?.map((item, index) => {
            return (
              <Link to={`/batterydetails/${item._id}`}>
                <Box
                  key={index}
                  role={"group"}
                  p={4}
                  maxW={"330px"}
                  w={"full"}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  pos={"relative"}
                  zIndex={1}
                >
                  <Box
                    rounded={"lg"}
                    pos={"relative"}
                    _after={{
                      transition: "all .3s ease",
                      content: '""',
                      w: "full",
                      h: "full",
                      pos: "absolute",
                      top: 5,
                      left: 0,
                      filter: "blur(15px)",
                      zIndex: -1,
                    }}
                    _groupHover={{
                      _after: {
                        filter: "blur(20px)",
                      },
                    }}
                  >
                    <Image
                      rounded={"lg"}
                      height={230}
                      pl={"45px"}
                      objectFit={"cover"}
                      src={item.image}
                    />
                  </Box>
                  <Stack pt={10}>
                    <Heading
                      fontSize={"2xl"}
                      fontFamily={"body"}
                      fontWeight={500}
                    >
                      {item.weight}
                    </Heading>
                    <Text color={"gray.600"} fontSize={"sm"}>
                      <span style={{ fontWeight: "bold" }}>Desc </span>
                      {item.desc}
                    </Text>
                    <Stack>
                      <Text color={"gray.600"}>
                        <span style={{ fontWeight: "bold" }}>
                          Quantity{" "}
                        </span>
                        {item.qunty}
                      </Text>
                      <Text fontWeight={800} fontSize={"xl"}>
                        ${item.price}
                      </Text>
                    </Stack>
                  </Stack>
                  <Link to={`/batterydetails/${item._id}`}>
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
                      See more details
                    </Button>
                  </Link>
                </Box>
              </Link>
            );
          })
        )}
      </Grid>
    </>
  );
};

export default Home;
