import { Package } from '../../types/package';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddActivityModal from '../Modals/AddActivityModal';
import { format } from 'date-fns';

import { Button, useDisclosure } from '@nextui-org/react';
import ActionModal from '../Modals/ActionModal';
import CsvIcon from '../../assets/icon/csv-icon.png';
import { exportToPdf, exportToExcel } from '../../helper/ExportUtils';
import { getAllActivityList } from '../../api/activityApi';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';

const ListActivityTable = ({
  data,
  deleteHandler,
  toastSuccess,
  setData,
  hapusLoading,
  toastError,
}) => {
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [activityId, setActivityId] = useState('');
  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onOpenChange: onOpenChangeAddModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onOpenChange: onOpenChangeEditModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSuccessModal,
    onOpen: onOpenSuccessModal,
    onOpenChange: onOpenChangeSuccessModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const openEditModalHandler = (id) => {
    setActivityId(id);
    setOpenEditModal(true);
  };

  const openDeleteModal = (id) => {
    setActivityId(id);
    onOpenDeleteModal();
  };

  const openAddModalHandler = () => {
    setOpenAddModal(true);
    onOpenAddModal();
  };

  const handleExportPdf = async () => {
    exportToPdf(); // Call your exportToPdf function with currentItems
  };

  const handleExportExcel = async () => {
    const res = await getAllActivityList();
    exportToExcel(res.data, 'activity'); // Call your exportToExcel function with currentItems
  };

  return (
    <div
      className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
    >
      <div className="pb-6 px-4  flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          List Activity
        </h4>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModalHandler}
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
      </div>

      <div className="max-w-full h-fit overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Tanggal
              </th>
              {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Uraian Jenis Hardware
              </th> */}
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Shift
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Kategori
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Nama
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {format(new Date(item.created_at), 'yyyy-MM-dd')}
                  </h5>
                  {/* <p className="text-sm">${item.biaya}</p> */}
                </td>
                {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.uraian_hardware}
                  </p>
                </td> */}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.shift}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.category_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.nama_user}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status === 'done'
                        ? 'bg-success text-success'
                        : item.status === 'process'
                        ? 'bg-warning text-warning'
                        : 'bg-red-500 text-red-500'
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => navigate(`/detail/activity/${item.id}`)}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    {/* <button
                      className="hover:text-primary"
                      onClick={onOpenEditModal}
                    >
                      <svg
                        className="fill-current"
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
                    </button> */}
                    <button
                      className="hover:text-primary"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      <svg
                        className="fill-current"
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
                    {/* <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <div className="w-full flex justify-center mt-10">
            <Pagination showControls total={10} initialPage={1} showShadow />
          </div> */}
        </table>
      </div>

      {/* <UpdateActivityModal
        isOpen={isOpenEditModal}
        onOpen={onOpenEditModal}
        onOpenChange={onOpenChangeEditModal}
        id={activityId}
      /> */}
      {openAddModal && (
        <AddActivityModal
          isOpen={isOpenAddModal}
          // onOpen={onOpenAddModal}
          onOpenChange={onOpenChangeAddModal}
          // isOpenSuccessModal={isOpenSuccessModal}
          onOpenSuccessModal={onOpenSuccessModal}
          toastSuccess={toastSuccess}
          toastError={toastError}
          setData={setData}
          // onOpenChangeSuccessModal={onOpenChangeSuccessModal}
        />
      )}

      {/* <SuccessModal
        isOpen={isOpenSuccessModal}
        onOpenChange={onOpenChangeSuccessModal}
      /> */}
      <ActionModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
        handler={() => deleteHandler(activityId)}
        hapusLoading={hapusLoading}
      />
    </div>
  );
};

export default ListActivityTable;
