import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IThread } from "../../types/app";
import interval from "../../libs/momment/interval";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThreadLikeButton } from "./ThreadLikeButton";
import ModalDialog from "../modalDialog/Index";
import ThreadDetailImage from "./ThreadDetailImage";
import { useAppDispatch, useAppSelector } from "../../store";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiEraserFill } from "react-icons/ri";
import { deleteThread } from "../../libs/api/call/thread";
import { getThreadsAsync } from "../../store/async/thread";

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
      const confirm = window.confirm("Are you sure you want to delete this thread?");

      if (confirm) {
        await deleteThread(thread.id, token);
        dispatch(getThreadsAsync());
      }
    } catch (error) {}
  };
  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      gap={"10px"}
      p={"10px"}
      borderBottom={"1px solid rgba(255,255,255,0.2)"}
      position={"relative"}
    >
      <WrapItem>
        <Avatar
          size={"sm"}
          src={`http://localhost:5000/uploads/${thread.author.profile.avatar}`}
        />
      </WrapItem>

      <Box
        color={"white"}
        display={"flex"}
        flexDir={"column"}
        w={"full"}
        gap={"7px"}
      >
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
            onClick={() => navigate(`/thread/${thread.id}`)}
          >
            {thread.content}
          </Text>

          {thread.image && thread.image.length > 1 ? (
            <Grid templateColumns={"repeat(2, 1fr)"} gap={2} my={"10px"}>
              {thread.image?.map((img, index: number) => (
                <GridItem
                  onClick={onOpen}
                  cursor={"pointer"}
                  key={index}
                  h={"250px"}
                  colSpan={
                    thread.image && thread.image?.length < 4 && index === 2
                      ? 2
                      : 1
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
                        src={`http://localhost:5000/uploads/${img.image}`}
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
          ) : (
            thread.image?.map((img, index: number) => (
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
        <ButtonGroup variant={"link"} colorScheme="" spacing={"20px"}>
          <ThreadLikeButton thread={thread} />
          <Button
            leftIcon={<BiCommentDetail />}
            _hover={{ textDecoration: "none" }}
          >
            {thread._count.replies} Replies
          </Button>
        </ButtonGroup>
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
                as={"button"}
                bgColor={"#262626"}
                py={"0"}
                color={"gray"}
                _hover={{ color: "white" }}
              >
                Edit
              </MenuItem>
              <MenuDivider color={"gray"} />
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
