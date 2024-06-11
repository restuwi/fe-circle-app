import React from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import FormForgotPassword from "../../../components/auth/FormForgotPassword";

const ForgotPassword: React.FC = () => {
  return (
    <AuthLayout>
      <FormForgotPassword />
    </AuthLayout>
  );
};

export default ForgotPassword;
