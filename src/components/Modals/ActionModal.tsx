import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

const ActionModal = ({ isOpen, onOpenChange, handler, hapusLoading }) => {
  // const { close } = useDisclosure();

  // useEffect(() => {
  //   if (!hapusLoading && isOpen) {
  //     close();
  //   }
  // }, [hapusLoading, isOpen, close]);
  const deleteHandler = () => {
    handler();
    onOpenChange(false);
  };
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
                Apakah anda ingin menghapus activity ini?
              </ModalHeader>

              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Tutup
                </Button>
                <Button
                  color="danger"
                  onPress={deleteHandler}
                  isLoading={hapusLoading}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionModal;
