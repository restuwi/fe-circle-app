import React, { useEffect, useState } from "react";
import RootLayout from "../../layouts/RootLayout";
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { ProfileCard } from "../../components/profile";
import { IThread, IUser } from "../../types/app";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../libs/api/call/profile";
import { getThreadUser } from "../../libs/api/call/thread";
import { ThreadCard } from "../../components/thread";
import { RiArrowLeftLine } from "react-icons/ri";
import { useAppSelector } from "../../store";
import ModalDialog from "../../components/modalDialog/Index";
import ThreadDetailImage from "../../components/thread/ThreadDetailImage";

const Profile: React.FC = () => {
  const { username } = useParams();
  const user = useAppSelector((state) => state.auth).user;
  const [active, setActive] = useState<Boolean>(true);
  const [profile, setProfile] = useState<IUser>({
    follower: [],
    following: [],
    email: "",
    fullname: "",
    username: "",
    id: 0,
    profile: {
      id: 0,
    },
    _count: {
      follower: 0,
      following: 0,
    },
  });

  const [threadsUser, setThreadsUser] = useState<IThread[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(username!);
      const userId = response.data.data.id;
      const resThreadUser = await getThreadUser(+userId);
      setProfile(response.data.data);
      setThreadsUser(resThreadUser.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <RootLayout
      icon={<RiArrowLeftLine />}
      title={profile.fullname}
      childrenMain={
        <>
          <ProfileCard
            bgColor="transparent"
            user={user && user?.username === username ? user : profile}
          />
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
              All Post
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
              Media
            </Button>
          </ButtonGroup>
          {active ? (
            threadsUser?.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              {threadsUser?.map(
                (thread) =>
                  thread.image &&
                  thread.image.map((img, idx) => (
                    <GridItem
                      onClick={onOpen}
                      cursor={"pointer"}
                      key={idx}
                      h={"250px"}
                    >
                      <ModalDialog
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        bgColor="#262626"
                        modalSize="full"
                        triggerBtn={
                          <Image
                            rounded={"md"}
                            w={"full"}
                            h={"full"}
                            objectFit={"cover"}
                            src={img.image}
                            alt={"img"}
                          />
                        }
                        modalBody={
                          <>
                            <ThreadDetailImage thread={thread} />
                          </>
                        }
                      />
                    </GridItem>
                  ))
              )}
            </Grid>
          )}
        </>
      }
      childrenAside={
        <>
          {user && username && username !== user?.username && (
            <ProfileCard bgColor="#262626" user={user!} />
          )}
        </>
      }
    />
  );
};

export default Profile;
