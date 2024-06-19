import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import SelectStatus from '../Forms/SelectGroup/SelectStatus';
import { changeStatus } from '../../api/activityApi';

const ChangeStatusModal = ({
  isOpen,
  onOpenChange,
  id,
  toastSuccess,
  toastError,
}) => {
  const [status, setStatus] = useState();
  const [kondisiAkhir, setKondisiAkhir] = useState();
  const [fotoAkhir, setFotoAkhir] = useState();
  const [biaya, setBiaya] = useState();

  const changeStatusHandler = async (close) => {
    const data = {
      biaya: biaya,
      kondisi_akhir: kondisiAkhir,
      foto_akhir: fotoAkhir,
    };

    try {
      const res = await changeStatus(data, id);
      toastSuccess();
      close();
    } catch (error) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const statusOnChange = (e) => {
    setStatus(e.target.value);
  };

  const fotoAkhirOnChange = (e) => {
    setFotoAkhir(e.target.files[0]);
  };

  return (
    <>
      <Modal
        className="border-stroke bg-whiter shadow-default dark:border-strokedark dark:bg-black h-fit "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="dark:text-white flex flex-col gap-1">
                Approve
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-5">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kondisi Akhir
                    </label>
                    <textarea
                      rows={4}
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Catatan jika diperlukan"
                      value={kondisiAkhir}
                      onChange={(e) => setKondisiAkhir(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Biaya
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Catatan jika diperlukan"
                      value={biaya}
                      onChange={(e) => setBiaya(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Foto
                    </label>
                    <input
                      type="file"
                      className="dark:text-white w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      onChange={fotoAkhirOnChange}
                    />
                  </div>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  // onPress={onClose}
                  onClick={() => changeStatusHandler(onClose)}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeStatusModal;
