import React, { useEffect } from "react";
import RootLayout from "../../layouts/RootLayout";
import { ThreadCard, ThreadForm } from "../../components/thread";
import { useAppDispatch, useAppSelector } from "../../store";
import { Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import { getThreadsAsync } from "../../store/async/thread";
import { ProfileCard } from "../../components/profile";

const Home: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const { threads, loading } = useAppSelector((state) => state.thread);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getThreadsAsync());
  }, []);
  return (
    <RootLayout
      title="Home"
      childrenMain={
        <>
          <ThreadForm btnName="Post" placeholder="What's on your mind?" />
          <Divider color={"gray"} />
          {!loading ? (
            threads?.map((thread) => (
              <Box key={thread.id}>
                <ThreadCard key={thread.id} thread={thread} />
                <Divider color={"gray"} />
              </Box>
            ))
          ) : (
            <Flex justifyContent={"center"} mt={"20px"} gap={"20px"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#04D361"
                size="xl"
              />
            </Flex>
          )}
        </>
      }
      childrenAside={
        auth.user && (
          <ProfileCard
            key={auth?.user?.id}
            bgColor="#262626"
            user={auth?.user}
          />
        )
      }
    />
  );
};

export default Home;
