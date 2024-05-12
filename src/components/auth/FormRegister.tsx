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
import React from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { APIRegister } from "../../libs/api/call/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../libs/yup/validation/auth";
import { IAuthRegister } from "../../types/app";

type Props = {
  changeForm: (form: string) => void;
};

const FormRegister: React.FC<Props> = ({ changeForm }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthRegister>({
    resolver: yupResolver(registerSchema),
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleRegister = async (data: IAuthRegister) => {
    try {
      setIsLoading(true);
      await APIRegister(data);
      changeForm("login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Heading color={"#04A51E"}>circle</Heading>
      <Text mb={2} color={"white"} fontWeight={"bold"} fontSize={"1.2rem"}>
        Create account Circle
      </Text>
      <FormControl mb={2} isInvalid={!!errors.fullname}>
        <Input
          type="text"
          placeholder="Fullname"
          {...register("fullname")}
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
        <FormErrorMessage>
          {errors.fullname && errors.fullname.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb={2} isInvalid={!!errors.email}>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb={2} isInvalid={!!errors.username}>
        <Input
          type="text"
          placeholder="Username"
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
            color={"white"}
            {...register("password")}
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
      <Divider my={4} />
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
        <Text color={"white"} fontSize={"sm"}>
          Already have Account?{" "}
          <Button
            onClick={() => changeForm("login")}
            variant={"link"}
            color={"#04A51E"}
            size={"sm"}
          >
            Login
          </Button>
        </Text>
        <Button
          isLoading={isLoading}
          type="submit"
          variant={"solid"}
          color={"white"}
          bgColor={"#04A51E"}
          px={"22px"}
          size={"sm"}
          _hover={{ bgColor: "#018016" }}
        >
          Register
        </Button>
      </Flex>
    </form>
  );
};

export default FormRegister;
