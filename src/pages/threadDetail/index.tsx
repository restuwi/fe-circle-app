import React, { useEffect } from "react";
import RootLayout from "../../layouts/RootLayout";
import { IThread } from "../../types/app";
import { useParams } from "react-router-dom";
import { getReplies, getThread } from "../../libs/api/call/thread";
import { ThreadDetailCard } from "../../components/thread/ThreadDetailCard";
import { Divider } from "@chakra-ui/react";
import { ThreadCard, ThreadForm } from "../../components/thread";
import { RiArrowLeftLine } from "react-icons/ri";
import { useAppSelector } from "../../store";

const ThreadDetail: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const [thread, setThread] = React.useState<IThread>({
    id: 0,
    content: "",
    image: [],
    authorId: 0,
    author: {
      id: 0,
      email: "",
      fullname: "",
      username: "",
      profile: {
        id: 0,
        avatar: "",
      },
      follower: [],
      following: [],
      _count: {
        follower: 0,
        following: 0,
      },
    },
    _count: {
      likes: 1,
      replies: 0,
    },
    likes: [],
    createdAt: "",
  });

  const [replies, setReplies] = React.useState<IThread[]>([]);

  const { id } = useParams();

  const refetch = async () => {
    try {
      const response = await getThread(+id!);
      setThread(response.data.data);
      const resRepliesThread = await getReplies(+id!);
      setReplies(resRepliesThread.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <RootLayout
      title="Status"
      icon={<RiArrowLeftLine />}
      childrenMain={
        <>
          <ThreadDetailCard thread={thread} />
          <Divider pt={"10px"} />
          {auth?.user && (
            <ThreadForm
              refetchReplies={refetch}
              threadId={Number(id)}
              placeholder="Type your reply!"
              btnName="Reply"
            />
          )}

          <Divider />
          {replies?.map((reply) => (
            <ThreadCard key={reply.id} thread={reply} />
          ))}
        </>
      }
    />
  );
};

export default ThreadDetail;
