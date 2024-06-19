import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { Fragment } from 'react';
import {
  getLokasi,
  addLokasi,
  updateLokasi,
  deleteLokasi,
} from '../api/lokasiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddStuffModal, LokasiModal } from '../components/Modals/AddModal';
import { useDisclosure } from '@nextui-org/react';
import { UpdateLokasiModal } from '../components/Modals/UpdateLokasiModal';
import DeleteModal from '../components/Modals/DeleteModal';
import Paginate from '../components/Pagination/paginate';
import {
  addJenisHardware,
  deleteJenisHardware,
  getJenisHardware,
} from '../api/jenisHardwareApi';
import {
  addAplikasiTol,
  deleteAplikasiTol,
  getAplikasiTol,
} from '../api/aplikasiTolApi';

const AplikasiItTol = () => {
  const [aplikasiTol, setAplikasiTol] = useState();
  const [newAplikasiTol, setNewAplikasiTol] = useState();
  const [JadwalId, setJadwalId] = useState('');
  const [aplikasiId, setAplikasiId] = useState();
  const {
    isOpen: addModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: updateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const {
    isOpen: deleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  useEffect(() => {
    getAplikasiTol().then((res) => {
      setAplikasiTol(res);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteAplikasiTol(id);
      setAplikasiTol(aplikasiTol?.filter((item) => item.id !== id));
      toast.success('Delete successfully ', res);
    } catch (error) {
      toast.error(`error deleting: ${error.response.data.message}`);
      console.error(error);
    }
  };

  const handleAddAplikasiTol = async () => {
    const data = { nama_aplikasiTol: newAplikasiTol };

    try {
      const res = await addAplikasiTol(data);
      setAplikasiTol((prevData) => [...prevData, res]);
      toast.success('aplikasi tol added successfully');
    } catch (error) {
      toast.error('Failed to add aplikasi tol');
    }
  };

  const handlerUpdateOpen = (id) => {
    setAplikasiId(id);
    onUpdateModalOpen();
  };

  const handleDeleteForm = (id) => {
    setJadwalId(id);
    onDeleteModalOpen();
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Aplikasi It Tol" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Aplikasi It Tol
          </h4>
          <button
            onClick={onAddModalOpen}
            className="flex items-center rounded-full px-1 py-1 bg-blue-300 dark:bg-boxdark shadow-default text-white"
          >
            <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-blue-500 text-md"
              />
            </div>
            <span className="ml-2"></span>
          </button>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium mr-2">No</p>
          </div>
          <div className="col-span-3 flex items-center sm:flex">
            <p className="font-medium">Nama</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Status</p>
          </div>
        </div>

        {aplikasiTol?.map((item, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-3 flex items-center">
              <p className="font-medium mr-2 text-black dark:text-white">
                {index + 1}
              </p>
            </div>
            <div className="col-span-3 flex items-center sm:flex">
              <p className="font-medium mr-3 text-black dark:text-white">
                {item.nama_aplikasiTol}
              </p>
            </div>
            <div className="mb-3  flex items-center">

              <button
                className="hover:text-primary"
                onClick={() => handleDeleteForm(item.id)}
              >
               <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {/* <Paginate currentPage={currentPage} onPageChange={handlePageChange} /> */}
      </div>
      <AddStuffModal
        title="Aplikasi IT Tol"
        isOpen={addModalOpen}
        onAdd={handleAddAplikasiTol}
        onChange={(e) => setNewAplikasiTol(e.target.value)}
        value={newAplikasiTol}
        onClose={onAddModalClose}
      />
      {/* <AddStuffModal
        title="Update Jenis Hardware"
        isOpen={updateModalOpen}
        onAdd={handleUpdate}
        onChange={(e) => setUpdateJenisHardware(e.target.value)}
        value={updateJenisHardware}
        onClose={onUpdateModalClose}
      /> */}
      {/* <UpdateLokasiModal
        isUpdateOpen={updateModalOpen}
        onAdd={handleUpdate}
        onChange={(e) => setUpdatelokasi(e.target.value)}
        value={updatelokasi}
        onUpdateClose={onUpdateModalClose}
      /> */}
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onDelete={handleDelete}
        onDeleteClose={onDeleteModalClose}
      />
    </DefaultLayout>
  );
};

export default AplikasiItTol;
