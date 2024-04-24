import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Image,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadLikeButton } from "./ThreadLikeButton";
import { IThread } from "../../types/app";
import { BiCommentDetail } from "react-icons/bi";
import interval from "../../libs/momment/interval";
import { ThreadCard } from "./ThreadCard";
import { getReplies } from "../../libs/api/call/thread";
import { useAppSelector } from "../../store";
import { ThreadForm } from "./ThreadForm";

type Props = {
  thread: IThread;
  index: number;
};

const ThreadDetailImage: React.FC<Props> = ({ thread, index }) => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [replies, setReplies] = React.useState<IThread[]>([]);

  const fetchReplies = async () => {
    try {
      const response = await getReplies(+thread.id);
      setReplies(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [thread]);

  const imageUrl = thread.image
    ? `http://localhost:5000/uploads/${thread.image[index].image}`
    : "";

  return (
    <Flex mt={"20px"}>
      <Box flex={2.5}>
        {imageUrl && ( // Only render Image component if imageUrl exists
          <Image
            w={"full"}
            h={"90vh"}
            objectFit={"cover"}
            src={imageUrl}
            rounded={"md"}
            alt="detailimage"
          />
        )}
      </Box>
      <Box flex={1} overflowY={"auto"} overflowX={"hidden"} h={"90vh"} className="customcustom-scrollbar" >
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
            </Box>
            <ButtonGroup variant={"link"} colorScheme="" spacing={"20px"}>
              <ThreadLikeButton thread={thread} title="Likes" />
              <Button
                leftIcon={<BiCommentDetail />}
                _hover={{ textDecoration: "none" }}
              >
                {thread._count.replies} Replies
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        <Divider />
        {auth.user && (
          <ThreadForm
            refetchReplies={fetchReplies}
            threadId={thread.id}
            btnName="Reply"
            placeholder="Write a reply"
          />
        )}
        {replies.map((reply) => (
          <ThreadCard thread={reply} />
        ))}
      </Box>
    </Flex>
  );
};

export default ThreadDetailImage;
