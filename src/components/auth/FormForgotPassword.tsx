import { Button, FormControl, Heading, Input, Text } from "@chakra-ui/react";
import React from "react";
import { APIForgotPassword } from "../../libs/api/call/auth";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

type Props = {
  changeForm?: (form: string) => void;
};

const FormForgotPassword: React.FC<Props> = ({ changeForm }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [formInput, setFormInput] = React.useState<{
    email: string;
  }>({
    email: "",
  });

  const navigateLogin = () => {
    if (changeForm) {
      changeForm("login");
    } else {
      navigate("/login");
    }
  };
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await APIForgotPassword(formInput.email);
      console.log(res);
      const confirm = window.confirm("Tekan tombol ok untuk reset password");
      if (confirm) {
        open(res.data.data, "_blank");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        isLoading={isLoading}
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
          onClick={navigateLogin}
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
