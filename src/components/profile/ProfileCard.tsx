import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import cover from "../../assets/cover.png";
import { IThread, IUser } from "../../types/app";
import ModalDialog from "../modalDialog/Index";
import { ProfileUpdateForm } from "./ProfileUpdateForm";
import { useAppSelector } from "../../store";
import FollowBtn from "../user/FollowBtn";

type Props = {
  bgColor?: string;
  user: IUser;
};
export const ProfileCard: React.FC<Props> = ({ bgColor, user }) => {
  const auth = useAppSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card bgColor={bgColor} color={"white"} rounded={"lg"} shadow={"none"}>
      <CardHeader mb={-8}>Profile</CardHeader>
      <CardBody>
        <Image
          src={
            user?.profile?.cover
              ? `http://localhost:5000/uploads/${user?.profile?.cover}`
              : cover
          }
          w={"full"}
          rounded={"md"}
          h={"115px"}
          objectFit={"cover"}
        />
        <Flex justifyContent={"space-between"} mt={3}>
          <WrapItem pl={6} mt={-10}>
            <Avatar
              border={"2px solid #1d1d1d"}
              src={`http://localhost:5000/uploads/${user?.profile?.avatar}`}
              size={"lg"}
            />
          </WrapItem>
          {auth?.user && auth?.user?.username === user?.username ? (
            <ModalDialog
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              bgColor="#262626"
              triggerBtn={
                <Button
                  variant={"outline"}
                  colorScheme="white"
                  size={"sm"}
                  _hover={{ fontWeight: "bold" }}
                  onClick={onOpen}
                >
                  Edit Profile
                </Button>
              }
              modalBody={<ProfileUpdateForm onClose={onClose} />}
            />
          ) : (
            <FollowBtn user={user} />
          )}
        </Flex>

        <Text as={"h1"} fontSize={"xl"} fontWeight={"bold"}>
          {user?.fullname}
        </Text>
        <Text as={"p"} color={"gray"}>
          @{user?.username}
        </Text>
        <Text as={"p"}>{user?.profile?.bio}</Text>
        <Text as={"span"} mr={4}>
          {user?._count?.following}
          <Text as={"span"} pl={1} color={"gray"}>
            Follower
          </Text>
        </Text>
        <Text as={"span"} mr={4}>
          {user?._count?.follower}
          <Text as={"span"} pl={1} color={"gray"}>
            Following
          </Text>
        </Text>
      </CardBody>
    </Card>
  );
};
