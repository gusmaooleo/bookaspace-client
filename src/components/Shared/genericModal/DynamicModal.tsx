import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  component: React.ReactNode;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  title,
  component,
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#1E1E1E">
        <ModalHeader color="white" alignItems={"center"} padding={"1.5rem"}>
          {title}
          <ModalCloseButton color={"#fff"} marginTop={"1rem"} />
        </ModalHeader>
        <ModalBody padding={"0rem"}>{component}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DynamicModal;
