import React from "react";
import ModalDialog from "../../modalDialog/Index";
import FormLogin from "../FormLogin";
import FormRegister from "../FormRegister";
import FormForgotPassword from "../FormForgotPassword";

type Props = {
  form?: string;
  setForm?: (form: string) => void;
  triggerBtn: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const AuthLayout: React.FC<Props> = ({
  form,
  setForm,
  triggerBtn,
  isOpen,
  onClose,
  onOpen,
}) => {
  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      bgColor="#262626"
      triggerBtn={triggerBtn}
      modalBody={
        form === "login" ? (
          <FormLogin changeForm={setForm!} />
        ) : form === "register" ? (
          <FormRegister changeForm={setForm!} />
        ) : (
          <FormForgotPassword changeForm={setForm!} />
        )
      }
    />
  );
};

export default AuthLayout;
