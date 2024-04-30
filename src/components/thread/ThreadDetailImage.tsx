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
import React, { useEffect, useState } from "react";
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
};

const ThreadDetailImage: React.FC<Props> = ({ thread }) => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [replies, setReplies] = React.useState<IThread[]>([]);

  console.log(thread);
  
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


  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slides = thread.image?.map((img) => {
    return img.image;
  });

  const slidesCount = slides?.length;
  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount! - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount! - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex mt={"20px"}>
      <Flex w="full" overflow="hidden" rounded={"md"} pos="relative" flex={2.5}>
        <Flex h="90vh" w="full" {...carouselStyle}>
          {slides?.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide}
                alt="carousel image"
                w={"full"}
                h={"full"}
                backgroundSize="cover"
                objectFit={"cover"}
              />
            </Box>
          ))}
        </Flex>
        <Text
          position={"absolute"}
          cursor={"pointer"}
          top={"50%"}
          left="10px"
          onClick={prevSlide}
        >
          &#10094;
        </Text>
        <Text
          position={"absolute"}
          cursor={"pointer"}
          top={"50%"}
          right="10px"
          onClick={nextSlide}
        >
          &#10095;
        </Text>
      </Flex>
      <Box
        flex={1}
        overflowY={"auto"}
        overflowX={"hidden"}
        h={"90vh"}
        className="customcustom-scrollbar"
      >
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          gap={"10px"}
          p={"10px"}
          position={"relative"}
        >
          <WrapItem>
            <Avatar size={"sm"} src={thread.author.profile.avatar} />
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
          <ThreadCard key={reply.id} thread={reply} />
        ))}
      </Box>
    </Flex>
  );
};

export default ThreadDetailImage;
