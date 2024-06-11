import React from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import FormRegister from "../../../components/auth/FormRegister";

const Register: React.FC = () => {
  return (
    <AuthLayout>
      <FormRegister />
    </AuthLayout>
  );
};

export default Register;
