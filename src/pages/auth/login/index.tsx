import React from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import FormLogin from "../../../components/auth/FormLogin";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <FormLogin />
    </AuthLayout>
  );
};

export default Login;
