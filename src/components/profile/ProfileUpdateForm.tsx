import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiEdit2Line, RiImageAddLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUserProfile } from "../../libs/api/call/profile";
import { AuthCheck } from "../../libs/api/call/auth";
import { SET_LOGIN } from "../../store/slice/auth";
import { checkAsync } from "../../store/async/auth";

type Props = {
  onClose: () => void;
};

export const ProfileUpdateForm: React.FC<Props> = ({ onClose }) => {
  const user = useAppSelector((state) => state.auth).user;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [formInput, setFormInput] = useState<{
    fullname?: string;
    username?: string;
    cover?: File | null;
    avatar?: File | null;
    bio?: string;
  }>({
    fullname: user?.fullname ?? "",
    username: user?.username ?? "",
    cover: null,
    avatar: null,
    bio: user?.profile.bio ?? "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;
    const file = files ? files[0] : null;

    if (name === "avatar") {
      if (file) {
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setAvatarPreview(null);
      }
    } else if (name === "cover") {
      if (file) {
        setCoverPreview(URL.createObjectURL(file));
      } else {
        setCoverPreview(null);
      }
    }

    setFormInput({
      ...formInput,
      [name]: file || value,
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (
        formInput.avatar?.name === user?.profile.avatar ||
        !formInput.avatar
      ) {
        delete formInput.avatar;
      }

      if (formInput.cover?.name === user?.profile.cover || !formInput.cover) {
        delete formInput.cover;
      }

      if (formInput.username === user?.username || !formInput.fullname) {
        delete formInput.username;
      }

      if (formInput.fullname === user?.fullname || !formInput.fullname) {
        delete formInput.fullname;
      }

      if (formInput.bio === user?.profile.bio || !formInput.bio) {
        delete formInput.bio;
      }

      await updateUserProfile(formInput);
      const res = await AuthCheck(localStorage.token);
      dispatch(
        SET_LOGIN({
          user: res.data.data,
          token: localStorage.token,
          message: "",
        })
      );
      // await dispatch(checkAsync(localStorage.token));
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <Text mb={"10px"} color={"white"}>
        Edit Profile
      </Text>
      {user?.profile.cover ? (
        <FormControl
          position={"relative"}
          h={"100px"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <FormLabel
            position={"absolute"}
            top={"10px"}
            right={"0"}
            cursor={"pointer"}
          >
            <Box border={"1px solid white"} p={"5px"} rounded={"full"}>
              <RiEdit2Line />
            </Box>
          </FormLabel>
          {coverPreview ? (
            <Image src={coverPreview} boxSize={"full"} objectFit={"cover"} />
          ) : (
            <Image
              src={user?.profile.cover}
              boxSize={"full"}
              objectFit={"cover"}
            />
          )}
          <Input name="cover" onChange={handleChange} hidden type="file" />
        </FormControl>
      ) : (
        <FormControl
          h={"100px"}
          rounded={"md"}
          overflow={"hidden"}
          bgColor={"gray.700"}
        >
          <FormLabel w={"full"} h={"full"} cursor={"pointer"}>
            {coverPreview ? (
              <Image src={coverPreview} boxSize={"full"} objectFit={"cover"} />
            ) : (
              <Flex
                w={"full"}
                h={"full"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <RiImageAddLine size={"50px"} />
              </Flex>
            )}
          </FormLabel>

          <Input name="cover" onChange={handleChange} hidden type="file" />
        </FormControl>
      )}

      <FormControl
        display={"flex"}
        justifyContent={"flex-start"}
        ml={"28px"}
        mt={"-28px"}
        mb={4}
      >
        {user?.profile.avatar ? (
          <Box position={"relative"}>
            {avatarPreview ? (
              <Avatar
                size={"lg"}
                icon={<RiImageAddLine size={28} />}
                src={avatarPreview}
                border={"1px solid gray"}
                objectPosition={"center"}
              />
            ) : (
              <Avatar
                size={"lg"}
                icon={<RiImageAddLine size={28} />}
                src={user?.profile.avatar}
                border={"1px solid gray"}
                objectPosition={"center"}
              />
            )}
            <FormLabel
              cursor={"pointer"}
              bgColor={"white"}
              position={"absolute"}
              top={"0"}
              right={"-20px"}
              border={"1px solid #262626"}
              p={"5px"}
              rounded={"full"}
            >
              <RiEdit2Line color="#262626" />
            </FormLabel>
          </Box>
        ) : (
          <FormLabel cursor={"pointer"}>
            {avatarPreview ? (
              <Avatar
                size={"lg"}
                icon={<RiImageAddLine size={28} />}
                src={avatarPreview}
                border={"1px solid gray"}
                objectPosition={"center"}
              />
            ) : (
              <Avatar
                size={"lg"}
                icon={<RiImageAddLine size={28} />}
                src={user?.profile.avatar}
                border={"1px solid gray"}
                objectPosition={"center"}
              />
            )}
          </FormLabel>
        )}

        <Input name="avatar" onChange={handleChange} hidden type="file" />
      </FormControl>

      <FormControl position={"relative"} mb={4}>
        <FormLabel
          bgColor={formInput.fullname ? "#262626" : "transparent"}
          px={"5px"}
          zIndex={"10"}
          color={"gray"}
          top={formInput.fullname ? "-12px" : "12px"}
          rounded={"full"}
          left={formInput.fullname ? "20px" : "10px"}
          position={"absolute"}
          transition={"all 0.3s"}
        >
          Fullname
        </FormLabel>
        <Input
          name="fullname"
          defaultValue={user?.fullname}
          onChange={handleChange}
          color={"white"}
          focusBorderColor="white"
          height={"48px"}
        />
      </FormControl>
      <FormControl position={"relative"} mb={4}>
        <FormLabel
          bgColor={formInput.username ? "#262626" : "transparent"}
          px={"5px"}
          zIndex={"10"}
          color={"gray"}
          rounded={"full"}
          top={formInput.username ? "-12px" : "12px"}
          left={formInput.username ? "20px" : "10px"}
          position={"absolute"}
          transition={"all 0.3s"}
        >
          Username
        </FormLabel>
        <Input
          name="username"
          defaultValue={user?.username}
          onChange={handleChange}
          color={"white"}
          focusBorderColor="white"
          height={"48px"}
        />
      </FormControl>
      <FormControl position={"relative"} mb={4}>
        <FormLabel
          bgColor={formInput.bio ? "#262626" : "transparent"}
          px={"5px"}
          zIndex={"10"}
          color={"gray"}
          rounded={"full"}
          top={formInput.bio ? "-12px" : "12px"}
          left={formInput.bio ? "20px" : "10px"}
          position={"absolute"}
          transition={"all 0.3s"}
        >
          Bio
        </FormLabel>
        <Input
          name="bio"
          defaultValue={user?.profile.bio}
          onChange={handleChange}
          color={"white"}
          focusBorderColor="white"
          height={"48px"}
        />
      </FormControl>

      <Flex justify={"flex-end"}>
        <Button
          isLoading={isLoading}
          type="submit"
          variant={"solid"}
          color={"white"}
          bgColor={"#04A51E"}
          borderRadius={"full"}
          px={"22px"}
          size={"sm"}
          _hover={{ bgColor: "#018016" }}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};
