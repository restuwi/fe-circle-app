import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IThread } from "../../types/app";
import interval from "../../libs/momment/interval";
import { useNavigate } from "react-router-dom";
import { ThreadLikeButton } from "./ThreadLikeButton";
import ModalDialog from "../modalDialog/Index";
import ThreadDetailImage from "./ThreadDetailImage";
import { useAppDispatch, useAppSelector } from "../../store";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiEraserFill } from "react-icons/ri";
import { deleteThread } from "../../libs/api/call/thread";
import { getThreadsAsync } from "../../store/async/thread";
import ThreadReplyButton from "./ThreadReplyButton";

type Props = {
  thread: IThread;
};

export const ThreadCard: React.FC<Props> = ({ thread }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDelete = async () => {
    try {
      let textConfirm: string = "";
      if (thread.threadId) {
        textConfirm = "Are you sure you want to delete this Reply?";
      } else {
        textConfirm = "Are you sure you want to delete this thread?";
      }
      const confirm = window.confirm(textConfirm);

      if (confirm) {
        await deleteThread(thread.id, token);
        dispatch(getThreadsAsync());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      gap={"10px"}
      p={"10px"}
      position={"relative"}
    >
      <WrapItem>
        <Avatar
          size={"sm"}
          src={`http://localhost:5000/uploads/${thread.author.profile.avatar}`}
        />
      </WrapItem>

      <Box color={"white"} display={"flex"} flexDir={"column"} w={"full"}>
        <Box
          display={"flex"}
          gap={"10px"}
          onClick={() => navigate(`/profile/${thread.author.username}`)}
        >
          <Text>{thread.author.fullname}</Text>
          <Text color={"gray"}>
            @{thread.author.username} • {interval(thread.createdAt)}
          </Text>
        </Box>
        <Box>
          <Text
            textAlign={"justify"}
            onClick={
              thread?.threadId
                ? undefined
                : () => navigate(`/thread/${thread.id}`)
            }
          >
            {thread.content}
          </Text>

          {thread.image && (
            <Grid templateColumns={"repeat(2, 1fr)"} gap={2} my={"10px"}>
              {thread.image?.map((img, index: number) => (
                <GridItem
                  onClick={onOpen}
                  cursor={"pointer"}
                  key={index}
                  h={"250px"}
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
                        <ThreadDetailImage thread={thread} />
                      </>
                    }
                  />
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>
        <Flex gap={"10px"} alignItems={"flex-start"}>
          <ThreadLikeButton thread={thread} />
          <Box w={"full"}>
            <ThreadReplyButton thread={thread} />
          </Box>
        </Flex>
      </Box>
      {user && user.username === thread.author.username && (
        <Box position={"absolute"} right={"10px"}>
          <Menu placement="left">
            <MenuButton
              transition="all 0.2s"
              color={"gray"}
              _hover={{ color: "white" }}
            >
              <HiDotsHorizontal size={18} />
            </MenuButton>
            <MenuList
              bgColor={"#262626"}
              minW="0"
              w={"max-content"}
              border={"none"}
            >
              <MenuItem
                icon={<RiEraserFill size={16} />}
                bgColor={"#262626"}
                color={"gray"}
                py={"0"}
                _hover={{ color: "white" }}
                onClick={() => handleDelete()}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};
