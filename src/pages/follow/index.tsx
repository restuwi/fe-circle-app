import React, { useEffect, useState } from "react";
import RootLayout from "../../layouts/RootLayout";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import ShowUser from "../../components/user/ShowUser";
import { getFollowersAsync, getFollowingAsync } from "../../store/async/follow";
import { ProfileCard } from "../../components/profile";

const Follow: React.FC = () => {
  const { followers, following } = useAppSelector((state) => state.follow);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth).user;
  const [active, setActive] = useState<boolean>(true);

  const handleActive = async () => {
    if (user) {
      if (active) {
        await dispatch(getFollowersAsync(user?.id));
      } else {
        await dispatch(getFollowingAsync(user?.id))
      }
    }
    setActive(!active);
  };

  useEffect(() => {
    dispatch(getFollowersAsync(user?.id!))
    dispatch(getFollowingAsync(user?.id!))
  }, [user])

  return (
    <RootLayout
      title={""}
      childrenMain={
        <>
          <ButtonGroup display={"flex"} borderBottom={"1px solid gray"}>
            <Button
              onClick={handleActive}
              variant={"link"}
              color={active ? "white" : "gray"}
              borderBottom={active ? "3px solid #04A51E" : ""}
              flex={"1"}
              rounded={"none"}
              _hover={{ textDecoration: "none" }}
            >
              Followers
            </Button>
            <Button
              onClick={handleActive}
              variant={"link"}
              color={!active ? "white" : "gray"}
              flex={"1"}
              rounded={"none"}
              borderBottom={!active ? "3px solid #04A51E" : ""}
              _hover={{ textDecoration: "none" }}
            >
              Following
            </Button>
          </ButtonGroup>
          {user && (
            <Box p={"20px"}>
              {active
                ? followers?.map((follower) => (
                    <ShowUser
                      key={follower.follower?.id}
                      user={follower.follower}
                    />
                  ))
                : following?.map((following) => (
                    <ShowUser
                      key={following.following?.id}
                      user={following.following}
                    />
                  ))}
            </Box>
          )}
        </>
      }
      childrenAside={
        <>{user && <ProfileCard user={user} bgColor="#262626" />}</>
      }
    />
  );
};

export default Follow;
