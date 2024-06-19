import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

function DeleteModal({ isDeleteOpen, onDeleteClose, onDelete }) {
  return (
    <>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Delete Data </ModalHeader>
            <ModalBody>
              <p className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">Are you sure want to delete this ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onDeleteClose}>
                Close
              </Button>
              <Button color="primary" onPress={onDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
