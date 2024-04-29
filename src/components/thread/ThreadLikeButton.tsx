import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useAppSelector } from "../../store";
import { likeThread } from "../../libs/api/call/like";
import { IThread } from "../../types/app";
type Props = {
  thread: IThread;
  title?: string;
};
export const ThreadLikeButton: React.FC<Props> = ({ thread, title }) => {
  const auth = useAppSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  const checkLike = () => {
    if (auth.user) {
      const like = thread?.likes.find((like) => like.userId === auth.user?.id);
      setIsLiked(like ? true : false);
    }
  };

  useEffect(() => {
    checkLike();
    setLikesCount(thread?._count?.likes);
  }, [thread?.likes, auth?.user]);

  const handleLiked = async () => {
    try {
      await likeThread({ threadId: thread.id });
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleLiked}
      variant={"link"}
      color={"white"}
      _hover={{ textDecoration: "none" }}
      leftIcon={isLiked ? <RiHeart3Fill color="red" /> : <RiHeart3Line />}
    >
      {likesCount} {title}
    </Button>
  );
};
