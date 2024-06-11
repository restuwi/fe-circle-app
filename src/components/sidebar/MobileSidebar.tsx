import React from "react";
import { ThreadForm } from "../thread";
import { RiAddCircleLine } from "react-icons/ri";
import { Box, Button, Icon } from "@chakra-ui/react";
import ModalDialog from "../modalDialog/Index";
import { IconType } from "react-icons";
import { useAppSelector } from "../../store";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

type Navlink = {
  name: string;
  to: string;
  icon: IconType;
};
type Props = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  navLinks: Navlink[];
  handleFollows: () => void;
};
const MobileSidebar: React.FC<Props> = ({
  onClose,
  onOpen,
  isOpen,
  navLinks,
  handleFollows,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  return (
    <Box
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
          link.name === "Profile" ? link.to + auth.user?.username : link.to;
        const isActive = location.pathname === `${linkTo}`;
        return (
          <ChakraLink
            key={index}
            display={"flex"}
            alignItems={"center"}
            onClick={link.name === "Follows" ? handleFollows : undefined}
            to={
              link.name === "Profile" ? link.to + auth.user?.username : link.to
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
    </Box>
  );
};

export default MobileSidebar;
