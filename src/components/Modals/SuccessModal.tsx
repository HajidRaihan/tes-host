import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

const SuccessModal = ({ isOpen, onOpenChange }) => {
  return (
    <>
      <Modal
        className="dark:bg-black py-5 flex flex-col items-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="dark:text-white flex flex-col gap-1">
                Success Menambahkan Activity
              </ModalHeader>

              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;
