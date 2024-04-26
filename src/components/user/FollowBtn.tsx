import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { follow } from "../../libs/api/call/follow";
import { IUser } from "../../types/app";
import { useAppDispatch, useAppSelector } from "../../store";
import { AuthCheck } from "../../libs/api/call/auth";
import { SET_LOGIN } from "../../store/slice/auth";

type Props = {
  user: IUser;
};

const FollowBtn: React.FC<Props> = ({ user }) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollowing = () => {
    if (auth.user || user) {
      const following = auth.user?.follower.find(
        (following) => following.followingId === user.id
      );
      setIsFollowing(following ? true : false);
    }
  };

  useEffect(() => {
    checkFollowing();
  }, [user]);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await follow({ followingId: user.id });
      const res = await AuthCheck(localStorage.token);
      dispatch(
        SET_LOGIN({
          user: res.data.data,
          token: localStorage.token,
          message: "",
        })
      );
      setIsLoading(false);
      setIsFollowing(!isFollowing);
    } catch (error) {}
  };

  return (
    <Button
      isLoading={isLoading}
      variant={"outline"}
      color={"white"}
      size={"sm"}
      rounded={"full"}
      ml={"auto"}
      _hover={{ fontWeight: "bold" }}
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
