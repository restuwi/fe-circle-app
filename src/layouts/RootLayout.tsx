import { Box, Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import Sidebar from "../components/sidebar";
import { FooterCard } from "../components/footer";
import { SuggestionCard } from "../components/suggestion";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { SET_LOGOUT } from "../store/slice/auth";
import { MdLogout } from "react-icons/md";
type Props = {
  childrenMain?: React.ReactNode;
  title: string;
  icon?: React.ReactElement;
  childrenAside?: React.ReactNode;
};
const RootLayout: React.FC<Props> = ({
  childrenMain,
  title,
  icon,
  childrenAside,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Flex minH="100vh" color={"white"} bgColor={"#1D1D1D"} overflowX={"hidden"}>
      <Box
        flex={{ base: "0", lg: "1.2" }}
        px={{ base: "0", lg: "20px" }}
        pt={{ base: "0", lg: "20px" }}
      >
        <Sidebar />
      </Box>
      <Box
        pt={`${title !== "" ? "" : "28px"}`}
        flex={2}
        borderX={"1px solid rgba(255,255,255,0.2)"}
      >
        {auth?.user && (
          <Button
            display={{ base: "block", lg: "none" }}
            position={"fixed"}
            onClick={() => dispatch(SET_LOGOUT())}
            right={0}
            m={2}
            variant={"link"}
            colorScheme="whiteAlpha"
            rightIcon={<MdLogout />}
            _hover={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Logout
          </Button>
        )}
        {title !== "" && (
          <Button
            ml={"20px"}
            fontSize={"1.5rem"}
            variant={"unstyled"}
            leftIcon={title && title !== "Home" ? <RiArrowLeftLine /> : icon}
            color={"white"}
            mt={"28px"}
            onClick={() => navigate("/")}
          >
            {title}
          </Button>
        )}
        {childrenMain}
      </Box>
      <Box
        flex={1.5}
        p={"20px"}
        flexDirection={"column"}
        gap={"10px"}
        overflowX={"hidden"}
        display={{ base: "none", lg: "flex" }}
      >
        {childrenAside}
        {auth?.user && <SuggestionCard />}
        <FooterCard />
      </Box>
      {!auth.user && (
        <Box
          position={"fixed"}
          bottom={0}
          left={0}
          right={0}
          bgColor={"#04A51E"}
          px={2}
          py={2}
        >
          <Flex justifyContent={"space-around"} alignItems={"center"}>
            <Box fontSize={"1rem"} display={{ base: "none", lg: "block" }}>
              <Text color={"white"} fontWeight={"bold"}>
                Don’t miss what’s happening
              </Text>
              <Text color={"white"}>Join circle now</Text>
            </Box>
            <Flex
              gap={2}
              flex={{ base: "1", lg: "0" }}
              justifyContent={{ base: "center", lg: "flex-end" }}
            >
              <Button
                rounded={"full"}
                variant={"outline"}
                colorScheme="white"
                size={"sm"}
                px={10}
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                variant={"solid"}
                rounded={"full"}
                px={10}
                size={"sm"}
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default RootLayout;
