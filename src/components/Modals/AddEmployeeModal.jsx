import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { addEmployee } from '../../api/employeeApi';

const AddEmployeeModal = ({
  isOpen,
  onOpenChange,
  toastSuccess,
  toastError,
  setEmployeeData,
}) => {
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('teknisi');
  const [ttd, setTtd] = useState();

  const addHandler = async (close) => {
    const data = {
      nama: nama,
      jabatan: jabatan,
      ttd: ttd,
    };
    try {
      const res = await addEmployee(data);
      toastSuccess();
      close();
      setEmployeeData((prev) => [...prev, res.data]);
    } catch (error) {
      toastError();
      console.error('Error adding employee:', error);
    }
  };

  const ttdOnChange = (e) => {
    setTtd(e.target.files[0]);
  };

  return (
    <>
      <Modal
        className="border-stroke bg-whiter shadow-default dark:border-strokedark dark:bg-black h-fit"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="dark:text-white flex flex-col gap-1">
                Add User (Teknisi / KSPT)
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jabatan
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                    >
                      <option value="teknisi">Teknisi</option>
                      <option value="kspt">KSPT</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Tanda Tangan
                    </label>
                    <input
                      type="file"
                      className="dark:text-white w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      onChange={ttdOnChange}
                    />
                  </div>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => addHandler(onClose)}
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

export default AddEmployeeModal;
