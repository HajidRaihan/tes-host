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
  addJenisSoftware,
  deleteJenisSoftware,
  getJenisSoftware,
} from '../api/jenisSoftwareApi';

const JenisSoftware = () => {
  const [jenisSoftware, setJenisSoftware] = useState();
  const [newJenisSoftware, setNewJenisSoftware] = useState('');
  const [JadwalId, setJadwalId] = useState('');
  const [jenisSoftwareId, setJenisSoftwareId] = useState();
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
    getJenisSoftware().then((res) => {
      setJenisSoftware(res);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteJenisSoftware(id);
      setJenisSoftware(jenisSoftware.filter((item) => item.id !== id));
      toast.success('Delete successfully ', res);
    } catch (error) {
      toast.error(`error deleting: ${error.response.data.message}`);
      console.error(error);
    }
  };

  const handleAddJenisSoftware = async () => {
    const data = { nama_software: newJenisSoftware };

    try {
      const res = await addJenisSoftware(data);
      setJenisSoftware((prevData) => [...prevData, res.data]);
      toast.success('software added successfully');
    } catch (error) {
      toast.error('Failed to add software');
    }
  };

  const handleUpdate = async () => {
    const data = {
      nama_Software: updateJenisSoftware,
    };
    try {
      const res = await editJenisSoftware(data, jenisSoftwareId);
      const updatedJenisSoftware = res.data;
      const updatedIndex = jenisSoftware.findIndex(
        (item) => item.id === jenisSoftwareId,
      );
      if (updatedIndex !== -1) {
        setJenisSoftware((prevData) => {
          const newData = [...prevData];
          newData[updatedIndex] = updatedJenisSoftware;
          return newData;
        });
      }
      toast.success('Standart Aplikasi Berhasil di Update :', res);
    } catch (error) {
      toast.error('Error saat mengupdate Standart Aplikasi:', error);
      // Handle the error gracefully (e.g., display an error message to the user)
      console.error(error);
    }
  };

  const handleDeleteForm = (id) => {
    setJadwalId(id);
    onDeleteModalOpen();
  };

  const handlerUpdateOpen = (id) => {
    setJenisSoftwareId(id);
    onUpdateModalOpen();
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Standart Aplikasi" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Standart Aplikasi
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

        {jenisSoftware?.map((item, index) => (
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
                {item.nama_software}
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
        title="Standart Aplikasi"
        isOpen={addModalOpen}
        onAdd={handleAddJenisSoftware}
        onChange={(e) => setNewJenisSoftware(e.target.value)}
        value={newJenisSoftware}
        onClose={onAddModalClose}
      />
      <AddStuffModal
        title="Update Standart Aplikasi"
        isOpen={updateModalOpen}
        onAdd={handleUpdate}
        onChange={(e) => setUpdateJenisSoftware(e.target.value)}
        // value={updateJenisSoftware}
        onClose={onUpdateModalClose}
      />
      <UpdateLokasiModal
        isUpdateOpen={updateModalOpen}
        onAdd={handleUpdate}
        onChange={(e) => setUpdatelokasi(e.target.value)}
        // value={updatelokasi}
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

export default JenisSoftware;
