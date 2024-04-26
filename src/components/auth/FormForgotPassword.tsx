import {
  Button,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  changeForm: (form: string) => void;
};

const FormForgotPassword: React.FC<Props> = ({ changeForm }) => {

  const [formInput, setFormInput] = React.useState<{
    email: string;
  }>({
    email: "",
  });

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <Heading color={"#04A51E"}>circle</Heading>
      <Text mb={2} color={"white"} fontWeight={"bold"} fontSize={"1.2rem"}>
        Forgot Password
      </Text>
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
      <Button
        type="submit"
        variant={"solid"}
        color={"white"}
        bgColor={"#04A51E"}
        rounded={"full"}
        w={"full"}
        size={"md"}
        mb={"10px"}
        _hover={{ bgColor: "#018016" }}
      >
        Send Instruction
      </Button>
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
    </form>
  );
};

export default FormForgotPassword;
