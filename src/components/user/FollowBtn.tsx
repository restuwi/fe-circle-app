import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { follow } from "../../libs/api/call/follow";
import { IUser } from "../../types/app";
import { useAppSelector } from "../../store";

type Props = {
  user: IUser;
};

const FollowBtn: React.FC<Props> = ({ user }) => {
  const auth = useAppSelector((state) => state.auth);
  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollowing = () => {
    if (auth.user) {
      const following = auth.user.follower.find(
        (following) => following.followingId === user.id
      );
      if (following) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  };

  useEffect(() => {
    checkFollowing();
  }, []);

  const handleFollow = async () => {
    try {
      await follow({ followingId: user.id });
      setIsFollowing(!isFollowing);
    } catch (error) {}
  };

  return (
    <Button
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
