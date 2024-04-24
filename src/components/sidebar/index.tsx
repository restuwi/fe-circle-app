import { Box, Button, Icon, useDisclosure } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { RiUserSearchLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGOUT } from "../../store/slice/auth";
import ModalDialog from "../modalDialog/Index";
import { ThreadForm } from "../thread";
import { getFollowersAsync, getFollowingAsync } from "../../store/async/follow";

type Navlink = {
  name: string;
  to: string;
  icon: any;
};

const navLinks: Navlink[] = [
  { name: "Home", to: "/", icon: GoHomeFill },
  { name: "Search", to: "/search", icon: RiUserSearchLine },
  { name: "Follows", to: "/follow", icon: FaRegHeart },
  { name: "Profile", to: "/profile/", icon: FaRegCircleUser },
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const fetchFollows = async () => {
    try {
      if (auth.user) {
        await dispatch(getFollowersAsync(Number(auth.user.id)));
        await dispatch(getFollowingAsync(Number(auth.user.id)));
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <Box
        display={{ base: "none", md: "flex" }}
        flexDirection={"column"}
        gap={"15px"}
        px={"10px"}
      >
        <ChakraLink
          fontSize={"3rem"}
          fontWeight={"Bold"}
          color={"green"}
          as={ReactRouterLink}
          to="/"
          _hover={{ textDecoration: "none", color: "#04A51E" }}
        >
          Circle
        </ChakraLink>
        <Box display={"flex"} flexDirection={"column"} gap={"25px"}>
          {navLinks.map((link: Navlink, index: number) => (
            <ChakraLink
              key={index}
              display={"flex"}
              alignItems={"center"}
              onClick={link.name === "Follows" ? fetchFollows : undefined}
              to={
                link.name === "Profile"
                  ? link.to + auth.user?.username
                  : link.to
              }
              as={ReactRouterLink}
              color={location.pathname === `${link.to}` ? "#04A51E" : "white"}
              _hover={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#04A51E",
              }}
              fontWeight={location.pathname === `${link.to}` ? "bold" : ""}
            >
              <Icon as={link.icon} mr={"10px"} /> {link.name}
            </ChakraLink>
          ))}
        </Box>
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          modalSize="xl"
          bgColor="#262626"
          triggerBtn={
            <Button
              bgColor={"#04A51E"}
              color={"white"}
              rounded={"full"}
              _hover={{ bgColor: "#018016" }}
              onClick={onOpen}
            >
              Create Post
            </Button>
          }
          modalBody={
            <ThreadForm
              onClose={onClose}
              placeholder="what's on your mind"
              btnName="Post"
            />
          }
        />
      </Box>
      <Button
        position={"fixed"}
        onClick={() => dispatch(SET_LOGOUT())}
        bottom={"10px"}
        variant={"link"}
        colorScheme="whiteAlpha"
        leftIcon={<BiLogOut />}
        _hover={{ textDecoration: "none", fontWeight: "bold", color: "white" }}
      >
        Logout
      </Button>
    </>
  );
};

export default Sidebar;
