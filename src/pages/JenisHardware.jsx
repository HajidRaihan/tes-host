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

const JenisHardware = () => {
  const [jenisHardware, setJenisHardware] = useState();
  const [newJenisHardware, setNewJenisHardware] = useState('');
  const [newlokasi, setNewlokasi] = useState('');
  const [JadwalId, setJadwalId] = useState('');
  const [updatelokasi, setUpdatelokasi] = useState('');
  const [updateJenisHardware, setUpdateJenisHardware] = useState('');
  const [lokasiId, setlokasiId] = useState();
  const [jenisHardwareId, setJenisHardwareId] = useState();
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
    getJenisHardware().then((res) => {
      setJenisHardware(res);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteJenisHardware(id);
      // Filter out the deleted location from the state
      setJenisHardware(jenisHardware.filter((item) => item.id !== id));
      toast.success('Delete successfully ', res);
    } catch (error) {
      toast.error(`error deleting: ${error.response.data.message}`);
      console.error(error);
    }
  };

  const handleDeleteForm = (id) => {
    setJadwalId(id);
    onDeleteModalOpen();
  };

  const handleAddJenisHardware = async () => {
    const data = { nama_hardware: newJenisHardware };

    try {
      const res = await addJenisHardware(data);
      setJenisHardware((prevData) => [...prevData, res.data]);
      toast.success('Location added successfully');
    } catch (error) {
      toast.error('Failed to add Location');
    }
  };

  const handleUpdate = async () => {
    const data = {
      nama_hardware: updateJenisHardware,
    };
    try {
      const res = await editJenisHardware(data, jenisHardwareId);
      const updatedJenisHardware = res.data;
      const updatedIndex = jenisHardware.findIndex(
        (item) => item.id === jenisHardwareId,
      );
      if (updatedIndex !== -1) {
        setJenisHardware((prevData) => {
          const newData = [...prevData];
          newData[updatedIndex] = updatedJenisHardware;
          return newData;
        });
      }
      toast.success('Jenis Hardware Berhasil di Update :', res);
    } catch (error) {
      toast.error('Error saat mengupdate Jenis Hardware:', error);
      // Handle the error gracefully (e.g., display an error message to the user)
      console.error(error);
    }
  };

  const handlerUpdateOpen = (id) => {
    setJenisHardwareId(id);
    onUpdateModalOpen();
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Jenis Hardware" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Jenis Hardware
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

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium mr-2">No</p>
          </div>
          <div className="col-span-2 flex items-center sm:flex">
            <p className="font-medium">Nama</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Jumlah Kerusakan</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Status</p>
          </div>
        </div>

        {jenisHardware?.map((item, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-2 flex items-center">
              <p className="font-medium mr-2 text-black dark:text-white">
                {index + 1}
              </p>
            </div>
            <div className="col-span-2 flex items-center sm:flex">
              <p className="font-medium mr-3 text-black dark:text-white">
                {item.nama_hardware}
              </p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="font-medium text-black dark:text-white">
                {item.jumlah_kerusakan}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
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
        title="Jenis Hardware"
        isOpen={addModalOpen}
        onAdd={handleAddJenisHardware}
        onChange={(e) => setNewJenisHardware(e.target.value)}
        value={newJenisHardware}
        onClose={onAddModalClose}
      />
      <AddStuffModal
        title="Update Jenis Hardware"
        isOpen={updateModalOpen}
        onAdd={handleUpdate}
        onChange={(e) => setUpdateJenisHardware(e.target.value)}
        value={updateJenisHardware}
        onClose={onUpdateModalClose}
      />
      <UpdateLokasiModal
        isUpdateOpen={updateModalOpen}
        onAdd={handleUpdate}
        onChange={(e) => setUpdatelokasi(e.target.value)}
        value={updatelokasi}
        onUpdateClose={onUpdateModalClose}
      />

      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onDelete={handleDelete}
        onDeleteClose={onDeleteModalClose}
      />
    </DefaultLayout>
  );
};

export default JenisHardware;
