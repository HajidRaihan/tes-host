import React, { useState } from 'react';
import { deleteUser } from '../../api/userApi';
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TableUser = ({ data, setUserData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      const res = await deleteUser(userId);
      setIsLoading(false);
      setUserData((prev) => {
        return prev.filter((user) => user.id !== userId);
      });
      toast.success('Berhasil delete user');
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('Gagal hapus user');
    }
  };

  const openModal = (id) => {
    onOpen();
    setUserId(id);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <ToastContainer />

      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        User
      </h4>

      <div className="table-container">
        <div className="table-wrapper" style={{ overflowX: 'auto' }}>
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Foto</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Username</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Email</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Role</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Tanda Tangan</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Action</h5>
            </div>
          </div>

          {data?.map((item, key) => (
            <div
              className={`grid grid-cols-6 items-center ${
                key === data.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/${item.foto}`}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white truncate">{item.username}</p>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white truncate">{item.email}</p>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white truncate">{item.role}</p>
              </div>
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/${item.ttd}`}
                    alt="ttd"
                    className="w-16 h-16 object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <Button onClick={() => openModal(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                Apakah anda ingin menghapus user ini?
              </ModalHeader>

              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Tutup
                </Button>
                <Button
                  color="danger"
                  onPress={deleteHandler}
                  isLoading={isLoading}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TableUser;
