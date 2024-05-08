import { Box } from "@chakra-ui/react";
import React from "react";
import FormResetPassword from "../../components/auth/FormResetPassword";

const ResetPassword: React.FC = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} minH={"100vh"} bgColor={"#262626"}>
      <Box width={"30%"}>
        <FormResetPassword />
      </Box>
    </Box>
  );
};

export default ResetPassword;
