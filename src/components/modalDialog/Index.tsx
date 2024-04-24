import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  triggerBtn: React.ReactNode;
  modalBody: React.ReactNode;
  bgColor?: string;
  modalSize?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const ModalDialog: React.FC<Props> = ({
  modalBody,
  modalSize,
  bgColor,
  isOpen,
  onClose,
  triggerBtn,
}) => {
  return (
    <>
      {triggerBtn}
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent bgColor={bgColor} color={"white"}>
          <ModalCloseButton />
          <ModalBody py={"18px"}>{modalBody}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDialog;
