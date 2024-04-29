import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  WrapItem,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { createThread } from "../../libs/api/call/thread";
import { useAppDispatch, useAppSelector } from "../../store";
import { getThreadsAsync } from "../../store/async/thread";

type Props = {
  placeholder?: string;
  btnName?: string;
  threadId?: number;
  refetchReplies?: () => void;
  onClose?: () => void;
};

export const ThreadForm: React.FC<Props> = ({
  placeholder,
  btnName,
  threadId,
  refetchReplies,
  onClose,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<{
    content: string;
    threadId?: number;
    image: FileList | null;
  }>({
    content: "",
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;
    if (files && files.length > 0) {
      const fileList = Array.from(files); // Convert FileList to Array
      const filePromises = fileList.map((file) => {
        return new Promise<string>((resolve, reject) => {
          // Specify return type as string
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string); // Use type assertion to specify result as string
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises)
        .then((results) => {
          setPreviewImages(results); // Set array of preview images
          setFormInput({
            ...formInput,
            [name]: fileList, // Set fileList as value
          });
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    } else {
      setPreviewImages([]); // Clear preview images array
      setFormInput({
        ...formInput,
        [name]: value,
      });
    }
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (formInput.content === "" && formInput.image === null) {
        setIsError(true);
      }

      if (threadId) {
        formInput.threadId = threadId;
      }

      await createThread(formInput);
      dispatch(getThreadsAsync());

      if (refetchReplies) {
        refetchReplies();
      }

      if (onClose) {
        onClose();
      }

      setFormInput({
        ...formInput,
        content: "",
        image: null,
      });
      setPreviewImages([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        style={{
          margin: "10px 0",
          padding: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "15px",
        }}
        encType="multipart/form-data"
        onSubmit={handlePost}
      >
        <WrapItem>
          <Avatar
            size={"sm"}
            src={"http://localhost:5000/uploads/" + user?.profile.avatar}
          />
        </WrapItem>

        <FormControl isRequired isInvalid={isError}>
          <Input
            type="text"
            name="content"
            placeholder={placeholder}
            onChange={handleChange}
            variant={"flushed"}
            color={"white"}
            borderBottom={"1px solid gray"}
            focusBorderColor="white"
            _focus={{ borderBottom: "1px solid gray" }}
            _placeholder={{ color: "gray" }}
            value={formInput.content}
          />
          <FormErrorMessage>content is required.</FormErrorMessage>
        </FormControl>
        <Box display={"flex"}>
          <FormControl>
            <FormLabel
              color={"green"}
              cursor={"pointer"}
              _hover={{ color: "#04A51E" }}
            >
              <RiImageAddLine size={28} />
            </FormLabel>
            <Input
              name="image"
              onChange={handleChange}
              display="none"
              accept="image/*"
              multiple
              type="file"
            />
          </FormControl>
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
            {btnName}
          </Button>
        </Box>
      </form>

      {previewImages?.length > 0 && (
        <Flex
          gap={2}
          my={"10px"}
          flexWrap={"wrap"}
          p={"10px"}
          borderBottom={"1px solid rgba(255,255,255,0.2)"}
        >
          {previewImages?.map((img, index: number) => (
            <Image
              flex={1}
              key={index}
              rounded={"sm"}
              h={previewImages.length >= 2 ? "150px" : ""}
              objectFit={"cover"}
              src={img}
              alt={"img"}
            />
          ))}
        </Flex>
      )}
    </>
  );
};
