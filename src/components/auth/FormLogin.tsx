import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../store";
import { checkAsync, loginAsync } from "../../store/async/auth";
import { getThreadsAsync } from "../../store/async/thread";
import { IUser } from "../../types/app";
import { getFollowersAsync, getFollowingAsync } from "../../store/async/follow";

type Props = {
  changeForm: () => void;
};

const FormLogin: React.FC<Props> = ({ changeForm }) => {
  const dispatch = useAppDispatch();
  const { loading, errorMessage } = useAppSelector((state) => state.auth);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [formInput, setFormInput] = React.useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = (await dispatch(loginAsync(formInput))).payload;
      
      const user: IUser = (await dispatch(checkAsync(token))).payload;
      console.log(user);
      
      await dispatch(getFollowersAsync(Number(user.id)));
      await dispatch(getFollowingAsync(Number(user.id)));
      await dispatch(getThreadsAsync());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Heading color={"#04A51E"}>circle</Heading>
      <Text mb={2} color={"white"} fontWeight={"bold"} fontSize={"1.2rem"}>
        Login
      </Text>
      <FormControl mb={2}>
        <Input
          type="text"
          placeholder="Email or Username"
          name="username"
          onChange={(e) =>
            setFormInput({ ...formInput, username: e.target.value })
          }
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
      <FormControl mb={2}>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            name="password"
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
            color={"white"}
            focusBorderColor="white"
            borderColor={"gray"}
            _placeholder={{ color: "gray" }}
            placeholder="Enter password"
          />

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              variant={"ghost"}
              colorScheme="whiteAlpha"
              onClick={handleClick}
            >
              {show ? <RiEyeFill /> : <RiEyeCloseFill />}
            </Button>
          </InputRightElement>
          {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </InputGroup>
      </FormControl>

      <ChakraLink
        fontSize={"sm"}
        textAlign={"right"}
        display={"block"}
        as={ReactRouterLink}
        to={"/forgot-password"}
      >
        Forgot Password?
      </ChakraLink>
      <Divider my={4} />
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
        <Text color={"white"} fontSize={"sm"}>
          Don't have an account yet?
          <Button
            onClick={changeForm}
            variant={"link"}
            color={"#04A51E"}
            size={"sm"}
          >
            Create Account
          </Button>
        </Text>
        <Button
          isLoading={loading}
          type="submit"
          variant={"solid"}
          color={"white"}
          bgColor={"#04A51E"}
          px={"22px"}
          size={"sm"}
          _hover={{ bgColor: "#018016" }}
        >
          Login
        </Button>
      </Flex>
    </form>
  );
};

export default FormLogin;
