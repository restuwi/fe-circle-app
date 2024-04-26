import { Box, Flex, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import Sidebar from "../components/sidebar";
import { FooterCard } from "../components/footer";
import { SuggestionCard } from "../components/suggestion";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { checkAsync } from "../store/async/auth";

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
  const AuthCheck = async () => {
    const token = localStorage.token;
    if (token) {
      await dispatch(checkAsync(token));
    }
  };

  useEffect(() => {
    AuthCheck();
  }, []);
  return (
    <Flex minH="100vh" color={"white"} bgColor={"#1D1D1D"} overflowX={"hidden"}>
      <Box
        flex={1.2}
        px={"20px"}
        pt={"20px"}
        display={{ base: "none", md: "inline-block" }}
      >
        <Sidebar />
      </Box>
      <Box
        pt={`${title !== "" ? "" : "28px"}`}
        flex={2}
        borderX={"1px solid rgba(255,255,255,0.2)"}
      >
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
        display={{ base: "none", md: "flex" }}
      >
        {childrenAside}
        {auth?.user && <SuggestionCard />}
        <FooterCard />
      </Box>
    </Flex>
  );
};

export default RootLayout;
