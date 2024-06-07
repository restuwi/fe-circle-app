import { Box, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../store";
import Sidebar from "../components/sidebar";
import { FooterCard } from "../components/footer";
import { SuggestionCard } from "../components/suggestion";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

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

  return (
    <Flex minH="100vh" color={"white"} bgColor={"#1D1D1D"} overflowX={"hidden"}>
      <Box
        flex={{ base: "0", md: "1.5" }}
        px={{ base: "0", md: "20px" }}
        pt={{ base: "0", md: "20px" }}
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
