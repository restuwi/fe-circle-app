import React from "react";
import ModalDialog from "../../modalDialog/Index";
import FormLogin from "../FormLogin";
import FormRegister from "../FormRegister";
import { Button, useDisclosure } from "@chakra-ui/react";

const AuthLayout: React.FC = () => {
  const [show, setShow] = React.useState(true);
  const handleClick = () => setShow(!show);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      bgColor="#262626"
      triggerBtn={
        <Button onClick={onOpen}>Login</Button>
      }
      modalBody={
        show ? (
          <FormLogin changeForm={handleClick} />
        ) : (
          <FormRegister changeForm={handleClick} />
        )
      }
    />
  );
};

export default AuthLayout;
