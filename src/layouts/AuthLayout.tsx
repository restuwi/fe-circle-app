import { Box, Image } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo-circle.png";
type Props = {
  children: React.ReactNode;
};
const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      minWidth={"100vw"}
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"#262626"}
    >
      <Box
        flex={{ base: "0", lg: "2" }}
        bgColor={{ base: "#262626", lg: "#0C0C0C" }}
        h={{ base: "auto", lg: "100vh" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src={logo} w={{ base: "200px", lg: "300px" }} />
      </Box>
      <Box flex={{ base: "0", lg: "1" }} px={10}>
        {" "}
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
