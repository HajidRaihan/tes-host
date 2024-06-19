import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

function ButtonModal({ isButtonOpen, onButtonClose, onStatusChange }) {
  const handleStatusChange = (status) => {
    onStatusChange(status);
    onButtonClose(); // Close the modal after selecting the status
  };

  return (
    <>
      <Modal isOpen={isButtonOpen} onClose={onButtonClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Verification data</ModalHeader>
            <ModalBody>
              <p className="bg-transparent p text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                Please select the status for this item:
              </p>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button color="primary" onPress={() => handleStatusChange('ontime')}>
                On Time
              </Button>
              <Button color="warning" onPress={() => handleStatusChange('late')}>
                Late
              </Button>
              <Button color="danger" onPress={() => handleStatusChange('doesntwork')}>
                Doesn't Work
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ButtonModal;
