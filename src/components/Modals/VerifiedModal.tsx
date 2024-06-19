import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

function VerifiedModal({ isVerifiedOpen, onAdd, onChangeStatus1, valueStatus, onVerifiedClose }) {
  return (
    <>
      <Modal isOpen={isVerifiedOpen} onClose={onVerifiedClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              <h2 className="text-2xl font-semibold">Update Status</h2>
              <p className="text-sm text-gray-500">Select the status from the dropdown and click update.</p>
            </ModalHeader>
            <ModalBody className="flex flex-col items-center gap-4">
              <select
                value={valueStatus}
                onChange={onChangeStatus1}
                className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-form-input dark:text-white dark:border-form-strokedark dark:focus:ring-primary"
              >
                <option value="on time">On Time</option>
                <option value="late">Late</option>
                <option value="not done">Not Done</option>
              </select>
              <div className="flex justify-end gap-2 mt-4 w-full max-w-xs">
                <Button color="secondary" variant="flat" onPress={onVerifiedClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onAdd}>
                  Update
                </Button>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default VerifiedModal;
