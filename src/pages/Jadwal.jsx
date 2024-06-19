import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React from 'react';
import {
  addJadwal,
  getJadwal,
  updatejadwal,
  deleteJadwal,
  updateStatusjadwal,
} from '../api/JadwalApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';
import { JadwalModal } from '../components/Modals/AddModal';
import { useDisclosure } from '@nextui-org/react';
import { UpdateJadwalModal } from '../components/Modals/UpdateLokasiModal';
import DeleteModal from '../components/Modals/DeleteModal';
import VerifiedModal from '../components/Modals/VerifiedModal';
import Paginate from '../components/Pagination/paginate';
import { exportToPdf, exportToExcel } from '../components/Modals/ExportUtils';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';

// import * as XLSX from 'xlsx';

const Jadwal = () => {
  const [data, setData] = useState([]);
  const [newJenisPerusahaan, setNewJenisPerusahaan] = useState('');
  const [newUraianKegiatan, setNewUraianKegiatan] = useState('');
  const [newTahun, setNewTahun] = useState(0);
  const [newLokasi, setNewLokasi] = useState('');
  const [newFrekuensi, setNewFrekuensi] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newWaktu, setNewWaktu] = useState([]);
  const [updateJenisPerusahaan, setUpdateJenisPerusahaan] = useState('');
  const [updateUraianKegiatan, setUpdateUraianKegiatan] = useState('');
  const [updateTahun, setUpdateTahun] = useState('');
  const [updateFrekuensi, setUpdateFrekuensi] = useState('');
  const [updateLokasi, setUpdateLokasi] = useState('');
  const [updateWaktu, setUpdateWaktu] = useState([]);
  const [JadwalId, setJadwalId] = useState('');
  const [verificationOption, setVerificationOption] = useState(null);

  const {
    isOpen: isOpenJadwalModal,
    onOpen: onOpenJadwalModal,
    onClose: onCloseJadwalModal,
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

  const {
    isOpen: VerifiedModalOpen,
    onOpen: onVerifiedModalOpen,
    onClose: onVerifiedModalClose,
  } = useDisclosure();

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [newTahunFilter, setNewTahunFilter] = useState('');
  const [selectedJenisPerusahaan, setSelectedJenisPerusahaan] = useState('');
  const [newLokasiFilter, setNewLokasiFilter] = useState('');

  const handleFilter = () => {
    const filtered = data.filter((item) => {
      const jenisPerusahaanFilter = selectedJenisPerusahaan
        ? item.jenis_perusahaan.toLowerCase() ===
          selectedJenisPerusahaan.toLowerCase()
        : true;
      const tahunFilter = newTahunFilter
        ? typeof item.tahun === 'number'
          ? item.tahun === parseInt(newTahunFilter)
          : item.tahun.includes(parseInt(newTahunFilter))
        : true;
      const lokasiFilter = newLokasiFilter
        ? item.lokasi.toLowerCase().includes(newLokasiFilter.toLowerCase())
        : true;
      return jenisPerusahaanFilter && tahunFilter && lokasiFilter;
    });
    setFilteredRecords(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [newLokasiFilter, selectedJenisPerusahaan, newTahunFilter, data]);

  const dropdownJenisPerusahaan = data.map((item) => item.jenis_perusahaan);

  const uniqueJenisPerusahaan = Array.from(new Set(dropdownJenisPerusahaan));

  const dropdownTahun = data.map((item) => item.tahun);

  const uniqueTahun = Array.from(new Set(dropdownTahun));

  const dropdownLokasi = data.map((item) => item.lokasi);

  const uniqueLokasi = Array.from(new Set(dropdownLokasi));

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  useEffect(() => {
    getJadwal().then((res) => {
      setData(res);
    });
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteJadwal(JadwalId);
      // Filter out the deleted location from the state
      setData(data.filter((item) => item.id !== JadwalId));
      toast.success('Delete successfully ', res);
    } catch (error) {
      toast.error('Error deleting Jadwal:', error);
    }
  };

  const handleAddJadwal = async () => {
    const newJadwalData = {
      jenis_perusahaan: newJenisPerusahaan,
      uraian_kegiatan: newUraianKegiatan,
      tahun: newTahun,
      lokasi: newLokasi,
      frekuensi: newFrekuensi,
      waktu: newWaktu,
    };

    try {
      const res = await addJadwal(newJadwalData);
      const addedJadwal = res.data;
      setData((prevData) => [...prevData, addedJadwal]);
      toast.success('Jadwal added successfully!', res);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error('Failed to add ');
    }
  };

  const handleJenisPerusahaan = (e) => {
    setNewJenisPerusahaan(e.target.value);
  };
  const handleUraianKegiatan = (e) => {
    setNewUraianKegiatan(e.target.value);
  };
  const handleTahun = (e) => {
    setNewTahun(parseInt(e.target.value));
  };

  const handleStatusontime = (e) => {
    setNewStatus(e.target.value);
  };

  const handleFrekuensi = (e) => {
    setNewFrekuensi(e.target.value);
  };
  const handleLokasi = (e) => {
    setNewLokasi(e.target.value);
  };
  const handleWaktu = (index, e) => {
    const newWaktuArray = [...newWaktu];
    newWaktuArray[index] = e.target.value;
    setNewWaktu(newWaktuArray);
  };

  const handleUpdateJenisPerusahaan = (e) => {
    setUpdateJenisPerusahaan(e.target.value);
  };
  const handleUpdateUraianKegiatan = (e) => {
    setUpdateUraianKegiatan(e.target.value);
  };
  const handleUpdateTahun = (e) => {
    setUpdateTahun(parseInt(e.target.value));
  };
  const handleUpdateFrekuensi = (e) => {
    setUpdateFrekuensi(e.target.value);
  };
  const handleUpdateLokasi = (e) => {
    setUpdateLokasi(e.target.value);
  };
  const handleUpdateWaktu = (index, e) => {
    const newWaktuArray = [...updateWaktu];
    newWaktuArray[index] = e.target.value;
    setUpdateWaktu(newWaktuArray);
  };

  const handleUpdate = async () => {
    const dataToUpdate = {
      jenis_perusahaan: updateJenisPerusahaan,
      uraian_kegiatan: updateUraianKegiatan,
      tahun: updateTahun,
      lokasi: updateLokasi,
      frekuensi: updateFrekuensi,
      waktu: updateWaktu,
    };
    try {
      const res = await updatejadwal(JadwalId, dataToUpdate);
      const updateJadwal = res.data;
      const updatedIndex = data.findIndex((item) => item.id === JadwalId);
      if (updatedIndex !== -1) {
        setData((prevData) => {
          const newData = [...prevData];
          newData[updatedIndex] = updateJadwal;
          return newData;
        });
      }
      toast.success('Jadwal updated successfully :', res);
    } catch (error) {
      toast.error('Error updating Jadwal', error);
      // Handle the error gracefully (e.g., display an error message to the user)
    }
  };

  const handleUpdateStatus = async () => {
    const dataToUpdate = {
      status: newStatus,
    };
    try {
      const res = await updateStatusjadwal(JadwalId, dataToUpdate);
      const updateJadwal = res.data;
      const updatedIndex = data.findIndex((item) => item.id === JadwalId);
      if (updatedIndex !== -1) {
        setData((prevData) => {
          const newData = [...prevData];
          newData[updatedIndex] = updateJadwal;
          return newData;
        });
      }
      toast.success('Jadwal Status updated successfully :', res);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error('Error updating Jadwal', error);
      // Handle the error gracefully (e.g., display an error message to the user)
    }
  };

  const handleDeleteForm = (id) => {
    setJadwalId(id);
    onDeleteModalOpen();
  };

  const handleVerifiedForm = (id) => {
    setJadwalId(id);
    onVerifiedModalOpen();
  };

  const handleUpdateForm = (id) => {
    setJadwalId(id);
    onUpdateModalOpen();
  };
  const handleUpdateStatusForm = (id) => {
    setJadwalId(id);
    onVerifiedModalOpen();
  };

  const handleAddForm = () => {
    onOpenJadwalModal();
  };

  const handleExportPdf = () => {
    const dataToExport = filteredRecords.map((data) => ({
      // jenis_perusahaan: data.jenis_perusahaan,
      lokasi: data.lokasi,
      waktu: data.waktu,
    }));
    exportToPdf(dataToExport);
  };

  const handleExportExcel = () => {
    const dataToExport = filteredRecords.map((data) => ({
      jenis_perusahaan: data.jenis_perusahaan,
      uraian_kegiatan: data.uraian_kegiatan,
      tahun: data.tahun,
      lokasi: data.lokasi,
      waktu: JSON.stringify(
        data.waktu.map((date) =>
          moment(date).tz('Asia/Makassar').format('DD-MM-YYYY'),
        ),
      ),
    }));
    exportToExcel(dataToExport);
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Jadwal" />
      <div className="container mx-auto">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Add Jadwal
          </h4>

          <div
            className="flex flex-grow items-center space-x-4"
            style={{ padding: '0 20px', fontFamily: 'Arial, sans-serif' }}
          >
            <div className="flex-1">
              <select
                value={selectedJenisPerusahaan}
                onChange={(e) => setSelectedJenisPerusahaan(e.target.value)}
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                }}
              >
                <option value="">Pilih Jenis Perusahaan</option>
                {uniqueJenisPerusahaan.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newTahunFilter}
                onChange={(e) => setNewTahunFilter(e.target.value)}
                placeholder="Pilih Tahun"
                list="TahunList"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                }}
              />
              <datalist id="TahunList">
                {uniqueTahun.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newLokasiFilter}
                onChange={(e) => setNewLokasiFilter(e.target.value)}
                placeholder="Pilih Lokasi"
                list="LokasiList"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                }}
              />
              <datalist id="LokasiList">
                {uniqueLokasi.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
          <button
            onClick={handleAddForm}
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

          <button
            onClick={handleExportPdf}
            className="flex items-center rounded-full px-1 py-1 bg-red-300 dark:bg-boxdark shadow-default text-white ml-4"
          >
            <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md">
              <FontAwesomeIcon
                icon={faFilePdf}
                className="text-red-500 text-md"
              />
            </div>
            <span className="ml-2"></span>
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center rounded-full px-1 py-1 bg-green-300 dark:bg-boxdark shadow-default text-white ml-4"
          >
            <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md">
              <FontAwesomeIcon
                icon={faFileExcel}
                className="text-green-500 text-md"
              />
            </div>
            <span className="ml-2"></span>
          </button>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Jenis Perusahaan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Uraian Kegiatan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Tahun
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Lokasi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Frekuensi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Waktu
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Aksi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-black dark:text-gray-400 tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 dark:bg-gray-800">
              {/* Table Body */}
              {filteredRecords.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.jenis_perusahaan}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.uraian_kegiatan}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.tahun}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.lokasi}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.frekuensi}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.waktu.map((date, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-900 dark:text-gray-100"
                      >
                        <div className="flex items-center">
                          <span>
                            {moment(date)
                              .tz('Asia/Makassar')
                              .format('DD-MM-YYYY')}
                          </span>
                          {index < item.waktu.length - 1 && (
                            <div className="h-px bg-gray-300 w-4 mx-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="mb-3  flex items-center">
                      <button
                        onClick={() => handleUpdateForm(item.id)}
                        className="hover:text-black-500"
                      >
                        <svg
                          className="fill-current text-black-500"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDeleteForm(item.id)}
                        className="hover:text-black-500"
                      >
                        <svg
                          className="fill-current text-black-500"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleUpdateStatusForm(item.id)}
                        className="hover:text-black-500"
                      >
                        <svg
                          className="fill-current text-black-500"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM9 16.2C4.8178 16.2 1.8 13.1822 1.8 9C1.8 4.8178 4.8178 1.8 9 1.8C13.1822 1.8 16.2 4.8178 16.2 9C16.2 13.1822 13.1822 16.2 9 16.2ZM9 4.5C8.60218 4.5 8.22064 4.65804 7.93934 4.93934C7.65804 5.22064 7.5 5.60218 7.5 6V10.5C7.5 10.8978 7.65804 11.2794 7.93934 11.5607C8.22064 11.842 8.60218 12 9 12C9.39782 12 9.77936 11.842 10.0607 11.5607C10.342 11.2794 10.5 10.8978 10.5 10.5V6C10.5 5.60218 10.342 5.22064 10.0607 4.93934C9.77936 4.65804 9.39782 4.5 9 4.5ZM9 14.25C8.60218 14.25 8.22064 14.408 7.93934 14.6893C7.65804 14.9706 7.5 15.3522 7.5 15.75C7.5 16.1478 7.65804 16.5294 7.93934 16.8107C8.22064 17.092 8.60218 17.25 9 17.25C9.39782 17.25 9.77936 17.092 10.0607 16.8107C10.342 16.5294 10.5 16.1478 10.5 15.75C10.5 15.3522 10.342 14.9706 10.0607 14.6893C9.77936 14.408 9.39782 14.25 9 14.25Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination
      <div className="flex justify-center mt-4">
        <Paginate currentPage={currentPage} onPageChange={handlePageChange} />
      </div> */}

      {/* Modals */}
      <JadwalModal
        isOpen={isOpenJadwalModal}
        onClose={onCloseJadwalModal}
        onAdd={handleAddJadwal}
        onChangeJenisPerusahaan={handleJenisPerusahaan}
        valueJenisPerusahaan={newJenisPerusahaan}
        onChangeUraianKegiatan={handleUraianKegiatan}
        valueUraianKegiatan={newUraianKegiatan}
        onChangeTahun={handleTahun}
        valueTahun={newTahun}
        onChangeFrekuensi={handleFrekuensi}
        valueFrekuensi={newFrekuensi}
        onChangeWaktu={handleWaktu}
        valueWaktu={newWaktu}
        onChangeLokasi={handleLokasi}
        valueLokasi={newLokasi}
      />
      <UpdateJadwalModal
        isUpdateOpen={updateModalOpen}
        onAdd={handleUpdate} // Perhatikan fungsi yang dipanggil saat tombol "simpan" ditekan
        onChangeUpdateJenisPerusahaan={handleUpdateJenisPerusahaan}
        valueUpdateJenisPerusahaan={updateJenisPerusahaan}
        onChangeUpdateUraianKegiatan={handleUpdateUraianKegiatan}
        valueUpdateUraianKegiatan={updateUraianKegiatan}
        onChangeUpdateLokasi={handleUpdateLokasi}
        valueUpdateLokasi={updateLokasi}
        onChangeUpdateTahun={handleUpdateTahun}
        valueUpdateTahun={updateTahun}
        onChangeUpdateFrekuensi={handleUpdateFrekuensi}
        valueUpdateFrekuensi={updateFrekuensi}
        onChangeUpdateWaktu={handleUpdateWaktu}
        valueUpdateWaktu={updateWaktu}
        onUpdateClose={onUpdateModalClose}
      />

      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onDelete={handleDelete}
        onDeleteClose={onDeleteModalClose}
      />

      {
        <VerifiedModal
          isVerifiedOpen={VerifiedModalOpen}
          onAdd={handleUpdateStatus}
          onChangeStatus1={handleStatusontime}
          valueStatus={newStatus}
          onVerifiedClose={onVerifiedModalClose}
        />
      }
    </DefaultLayout>
  );
};

export default Jadwal;
