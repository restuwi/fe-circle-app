import {
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { APIRegister } from "../../libs/api/call/auth";

type Props = {
  changeForm: () => void;
}

const FormRegister: React.FC<Props> = ({ changeForm }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [formInput, setFormInput] = React.useState<{
    fullname: string;
    email: string;
    username: string;
    password: string;
  }>({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await APIRegister(formInput);
      changeForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Heading color={"#04A51E"}>circle</Heading>
      <Text mb={2} color={"white"} fontWeight={"bold"} fontSize={"1.2rem"}>
        Create account Circle
      </Text>
      <FormControl mb={2}>
        <Input
          type="text"
          placeholder="Fullname"
          name="fullname"
          onChange={(e) =>
            setFormInput({ ...formInput, fullname: e.target.value })
          }
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
      </FormControl>
      <FormControl mb={2}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) =>
            setFormInput({ ...formInput, email: e.target.value })
          }
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
      </FormControl>
      <FormControl mb={2}>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) =>
            setFormInput({ ...formInput, username: e.target.value })
          }
          color={"white"}
          focusBorderColor="white"
          borderColor={"gray"}
          _placeholder={{ color: "gray" }}
        />
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
        </InputGroup>
      </FormControl>
      <Divider my={4} />
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
        <Text color={"white"} fontSize={"sm"}>
          Already have Account?{" "}
          <Button onClick={changeForm} variant={"link"} color={"#04A51E"} size={"sm"}>
            Login
          </Button>
        </Text>
        <Button
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
