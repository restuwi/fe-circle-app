import { Box, Button, Icon, Image, useDisclosure } from "@chakra-ui/react";
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
import { IconType } from "react-icons";
import MobileSidebar from "./MobileSidebar";
import logo from "../../assets/logo-circle.png";

type Navlink = {
  name: string;
  to: string;
  icon: IconType;
};

const navLinks: Navlink[] = [
  { name: "Home", to: "/", icon: GoHomeFill },
  { name: "Search", to: "/search", icon: RiUserSearchLine },
  { name: "Follows", to: "/follow", icon: FaRegHeart },
  { name: "Profile", to: "/", icon: FaRegCircleUser },
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleFollows = async () => {
    if (auth.user) {
      await dispatch(getFollowingAsync(auth.user.id));
      await dispatch(getFollowersAsync(auth.user.id));
    }
  };

  return (
    <>
      <ChakraLink
        fontSize={"3rem"}
        fontWeight={"Bold"}
        color={"green"}
        as={ReactRouterLink}
        to="/"
        _hover={{ textDecoration: "none", color: "#04A51E" }}
        display={{ base: "none", lg: "flex" }}
        gap={"10px"}
        alignItems={"center"}
      >
        <Box>
          <Image src={logo} w={20} objectFit={"cover"} />
        </Box>
        Circle
      </ChakraLink>
      {!auth?.user ? (
        <Box display={{ base: "none", lg: "flex" }} gap={"10px"}></Box>
      ) : (
        <>
          <Box
            display={{ base: "none", lg: "flex" }}
            flexDirection={"column"}
            gap={"15px"}
            px={"10px"}
          >
            <Box display={"flex"} flexDirection={"column"} gap={"25px"}>
              {navLinks.map((link: Navlink, index: number) => {
                const linkTo =
                  link.name === "Profile"
                    ? link.to + auth.user?.username
                    : link.to;
                const isActive = location.pathname === `${linkTo}`;
                return (
                  <ChakraLink
                    key={index}
                    display={"flex"}
                    alignItems={"center"}
                    to={
                      link.name === "Profile"
                        ? link.to + auth.user?.username
                        : link.to
                    }
                    onClick={
                      link.name === "Follows" ? handleFollows : undefined
                    }
                    as={ReactRouterLink}
                    color={isActive ? "#04A51E" : "white"}
                    _hover={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "#04A51E",
                    }}
                    fontWeight={isActive ? "bold" : ""}
                  >
                    <Icon as={link.icon} mr={"10px"} /> {link.name}
                  </ChakraLink>
                );
              })}
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
            display={{ base: "none", lg: "flex" }}
            position={"fixed"}
            onClick={() => dispatch(SET_LOGOUT())}
            bottom={"10px"}
            variant={"link"}
            colorScheme="whiteAlpha"
            leftIcon={<BiLogOut />}
            _hover={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Logout
          </Button>
          {/* <Box
            bg={"#262626"}
            display={{ base: "flex", lg: "none" }}
            position={"fixed"}
            bottom={0}
            left={0}
            right={0}
            zIndex={999}
            justifyContent={"space-around"}
            py={"12px"}
          >
            {navLinks.map((link: Navlink, index: number) => {
              const linkTo =
                link.name === "Profile"
                  ? link.to + auth.user?.username
                  : link.to;
              const isActive = location.pathname === `${linkTo}`;
              return (
                <ChakraLink
                  key={index}
                  display={"flex"}
                  alignItems={"center"}
                  onClick={link.name === "Follows" ? handleFollows : undefined}
                  to={
                    link.name === "Profile"
                      ? link.to + auth.user?.username
                      : link.to
                  }
                  as={ReactRouterLink}
                  color={isActive ? "#04A51E" : "white"}
                  _hover={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#04A51E",
                  }}
                  fontWeight={isActive ? "bold" : ""}
                >
                  <Icon as={link.icon} mr={"10px"} />
                </ChakraLink>
              );
            })}
            <Box position={"absolute"} top={"-10px"}>
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
                    <RiAddCircleLine />
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
          </Box> */}
          <MobileSidebar
            navLinks={navLinks}
            handleFollows={handleFollows}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
        </>
      )}
    </>
  );
};

export default Sidebar;
