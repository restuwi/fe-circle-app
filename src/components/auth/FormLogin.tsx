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
// import { Link as ReactRouterLink } from "react-router-dom";
// import { Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../store";
import { checkAsync, loginAsync } from "../../store/async/auth";
import { useForm } from "react-hook-form";
import { IAuthLogin } from "../../types/app";
import { loginSchema } from "../../libs/yup/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertError } from "../../libs/sweetalert2";

type Props = {
  changeForm: (form: string) => void;
};

const FormLogin: React.FC<Props> = ({ changeForm }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthLogin>({
    resolver: yupResolver(loginSchema),
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleLogin = async (data: IAuthLogin) => {
    try {
      const action = await dispatch(loginAsync(data));
      if (loginAsync.fulfilled.match(action)) {
        localStorage.setItem("token", action.payload);
        await dispatch(checkAsync(action.payload));
      } else if (loginAsync.rejected.match(action)) {
        const errorText = action.payload as string;
        AlertError(errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Heading color={"#04A51E"}>circle</Heading>
      <Text mb={2} color={"white"} fontWeight={"bold"} fontSize={"1.2rem"}>
        Login
      </Text>
      <FormControl mb={2} isInvalid={!!errors.username}>
        <Input
          type="text"
          placeholder="Email or Username"
          {...register("username")}
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb={2} isInvalid={!!errors.password}>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            {...register("password")}
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
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <Flex justifyContent={"flex-end"}>
        <Button
          size={"sm"}
          variant={"link"}
          onClick={() => changeForm("forgot-password")}
          color={"gray"}
          _hover={{ color: "white" }}
        >
          Forgot Password?
        </Button>
      </Flex>

      <Divider my={4} />
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
        <Text color={"white"} fontSize={"sm"}>
          Don't have an account yet?
          <Button
            onClick={() => changeForm("register")}
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
