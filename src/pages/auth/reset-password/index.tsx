import React from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import FormResetPassword from "../../../components/auth/FormResetPassword";

const ResetPassword: React.FC = () => {
  return (
    <AuthLayout>
      <FormResetPassword />
    </AuthLayout>
  );
};

export default ResetPassword;
