import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../../types/app";
import FollowBtn from "./FollowBtn";
import { useNavigate } from "react-router-dom";

type Props = {
  user?: IUser;
};

const ShowUser: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Flex key={user?.id} alignItems={"center"} gap={"15px"} mb={"10px"}>
      <Flex
        alignItems={"center"}
        onClick={() => navigate("/profile/" + user?.username)}
        cursor={"pointer"}
        gap={"15px"}
      >
        <Avatar
          src={user?.profile?.avatar}
          size={"sm"}
        />
        <Box lineHeight={1.2}>
          <Text as={"p"} fontSize={"sm"}>
            {user?.fullname}
          </Text>
          <Text as={"p"} fontSize={"sm"} color={"gray"}>
            @{user?.username}
          </Text>
        </Box>
      </Flex>

      <FollowBtn user={user!} />
    </Flex>
  );
};

export default ShowUser;
