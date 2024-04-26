import React from "react";
import ModalDialog from "../../modalDialog/Index";
import FormLogin from "../FormLogin";
import FormRegister from "../FormRegister";
import { Button, useDisclosure } from "@chakra-ui/react";
import FormForgotPassword from "../FormForgotPassword";

type Props = {
  title: string;
  form: string;
  setForm: (form: string) => void;
};

const AuthLayout: React.FC<Props> = ({ form, title, setForm }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      bgColor="#262626"
      triggerBtn={
        <Button
          bgColor={"#04A51E"}
          color={"white"}
          rounded={"md"}
          _hover={{ bgColor: "#018016" }}
          onClick={onOpen}
        >
          {title}
        </Button>
      }
      modalBody={
        form === "login" ? (
          <FormLogin changeForm={setForm} />
        ) : form === "register" ? (
          <FormRegister changeForm={setForm} />
        ) : (
          <FormForgotPassword changeForm={setForm} />
        )
      }
    />
  );
};

export default AuthLayout;
