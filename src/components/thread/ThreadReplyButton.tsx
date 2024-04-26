import React, { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { Box, Button, Flex } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { ThreadForm } from "./ThreadForm";
import { ThreadCard } from "./ThreadCard";
import { getReplies } from "../../libs/api/call/thread";
import { useAppSelector } from "../../store";
type Props = {
  thread: IThread;
};

const ThreadReplyButton: React.FC<Props> = ({ thread }) => {
  const [isReplies, setIsReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<IThread[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const fetchReplies = async () => {
    try {
      const res = await getReplies(thread?.id!);
      setReplies(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [thread]);

  return (
    <>
      <Button
        variant={"link"}
        color={"white"}
        leftIcon={<BiCommentDetail />}
        _hover={{ textDecoration: "none" }}
        onClick={() => setIsReplies(!isReplies)}
      >
        {thread?._count?.replies} Replies
      </Button>
      {isReplies && (
        <>
          <Flex flexDir={"column"}>
            {user && (
              <ThreadForm
                btnName="Reply"
                placeholder="write your reply"
                threadId={thread.id}
                refetchReplies={fetchReplies}
              />
            )}
            {replies && replies.map((reply) => <ThreadCard thread={reply} />)}
          </Flex>
        </>
      )}
    </>
  );
};

export default ThreadReplyButton;
