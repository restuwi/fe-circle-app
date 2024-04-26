import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { IThread } from "../../types/app";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ThreadLikeButton } from "./ThreadLikeButton";

type Props = {
  thread: IThread;
};

export const ThreadDetailCard: React.FC<Props> = ({ thread }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={"10px"} p={"10px"}>
        <WrapItem>
          <Avatar
            size={"sm"}
            src={`http://localhost:5000/uploads/${thread?.author?.profile?.avatar}`}
          />
        </WrapItem>

        <Box
          lineHeight={"20px"}
          onClick={() => navigate(`/profile/${thread?.author?.username}`)}
        >
          <Text>{thread?.author?.fullname}</Text>
          <Text color={"gray"}>@{thread?.author?.username}</Text>
        </Box>
      </Box>
      <Box px={"10px"}>
        <Text
          textAlign={"justify"}
          onClick={() => navigate(`/thread/${thread?.id}`)}
        >
          {thread?.content}
        </Text>

        {thread?.image && thread?.image?.length > 1 ? (
          <Flex gap={2} my={"10px"} flexWrap={"wrap"}>
            {thread?.image?.map((img, index: number) => (
              <Image
                key={index}
                flex={1}
                rounded={"sm"}
                h={"150px"}
                objectFit={"cover"}
                src={`http://localhost:5000/uploads/${img.image}`}
                alt={"img"}
              />
            ))}
          </Flex>
        ) : (
          thread?.image?.map((img, index: number) => (
            <Image
              key={index}
              w={"full"}
              rounded={"md"}
              maxH={"250px"}
              my={"10px"}
              objectFit={"cover"}
              src={`http://localhost:5000/uploads/${img.image}`}
              alt={"img"}
            />
          ))
        )}
      </Box>
      <Text p={"10px"} color={"gray"} fontSize={"sm"}>
        {moment(thread?.createdAt).format("h:mm A")} •{" "}
        {moment(thread?.createdAt).format("MMM D, YYYY")}
      </Text>
      <ButtonGroup variant={"link"} colorScheme="" spacing={"10px"} px={"10px"}>
        <ThreadLikeButton thread={thread} title="Likes" />
        <Button
          leftIcon={<BiCommentDetail />}
          _hover={{ textDecoration: "none" }}
        >
          {thread?._count?.replies} Replies
        </Button>
      </ButtonGroup>
    </>
  );
};
