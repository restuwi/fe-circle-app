import {
    Button,
    FormControl,
    Heading,
    Input,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  
  
  const FormResetPassword: React.FC = () => {
  
    const [formInput, setFormInput] = React.useState<{
      password: string;
    }>({
      password: "",
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
          Reset Password
        </Text>
        <FormControl mb={2}>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
            color={"white"}
            focusBorderColor="white"
            borderColor={"gray"}
            _placeholder={{ color: "gray" }}
          />
        </FormControl>
        <FormControl mb={2}>
          <Input
            type="password"
            placeholder="retype Password"
            name="password-confirmation"
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
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
          Reset
        </Button>
      </form>
    );
  };
  
  export default FormResetPassword;
  