import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IThread } from "../../types/app";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ThreadLikeButton } from "./ThreadLikeButton";
import ThreadDetailImage from "./ThreadDetailImage";
import ModalDialog from "../modalDialog/Index";

type Props = {
  thread: IThread;
};

export const ThreadDetailCard: React.FC<Props> = ({ thread }) => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
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

        {thread.image && (
            <Grid templateColumns={"repeat(2, 1fr)"} gap={2} my={"10px"}>
              {thread.image?.map((img, index: number) => (
                <GridItem
                  onClick={onOpen}
                  cursor={"pointer"}
                  key={index}
                  h={"150px"}
                  colSpan={
                    thread.image && thread.image?.length < 2 && index === 0
                      ? 2 // Jika hanya ada satu gambar, gunakan colSpan 2
                      : thread.image?.length === 3 && index === 0
                      ? 2 // Jika ada tiga gambar dan ini adalah gambar pertama, gunakan colSpan 2
                      : 1 // Untuk kasus lainnya, gunakan colSpan 1
                  }
                >
                  <ModalDialog
                    key={index}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    bgColor="#262626"
                    modalSize="full"
                    triggerBtn={
                      <Image
                        key={index}
                        rounded={"md"}
                        w={"full"}
                        h={"full"}
                        objectFit={"cover"}
                        src={img.image}
                        alt={"img"}
                      />
                    }
                    modalBody={
                      <>
                        <ThreadDetailImage thread={thread} index={index} />
                      </>
                    }
                  />
                </GridItem>
              ))}
            </Grid>
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
