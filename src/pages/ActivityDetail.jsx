import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { getActivityWorker, getDetailActivity } from '../api/activityApi';
import { Link, useParams } from 'react-router-dom';
import ChangeStatusModal from '../components/Modals/ChangeStatusModal';
import { toast, ToastContainer } from 'react-toastify';
import { useDisclosure, Button } from '@nextui-org/react';
import TableDetailActivity from '../components/Tables/TableDetailActivity';
import DoneActivityTable from '../components/Tables/DoneActivityTable';
import PdfModal from '../components/FormActivity/PdfModal';
import PendingActivityTable from '../components/Tables/PendingActivityTable';
import DetailSekeleton from '../components/Skeleton/DetailSekeleton';

const ActivityDetail = () => {
  const [detail, setDetail] = useState();
  const [fotoAkhir, setfotoAkhir] = useState();
  const [kondisiAkhir, setKondisiAkhir] = useState();
  const [workerPending, setWorkerPending] = useState();
  const [workerDone, setWorkerDone] = useState();
  const [workerProcess, setWorkerProcess] = useState();
  const [statusActivity, setStatusActivity] = useState();
  const [deskripsiPending, setDeskripsiPending] = useState();
  const [userId, setUserId] = useState();
  const [openPdfModal, setOpenPdfModal] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await getDetailActivity(id);
      setDetail(res.data.data[0]);
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    const fetchWorker = async () => {
      const res = await getActivityWorker(id);

      const workerPendingFilter = await res.data.filter(
        (worker) => worker.status === 'pending',
      );
      setWorkerPending(workerPendingFilter);
      const workerDoneFilter = await res.data.filter(
        (worker) => worker.status === 'done',
      );
      setWorkerDone(workerDoneFilter[0]);
      const workerProcessFilter = await res.data.filter(
        (worker) => worker.status === 'process',
      );

      setWorkerProcess(workerProcessFilter);
    };
    fetchWorker();
  }, []);

  // const handleApprove = async () => {
  //   const data = {
  //     status: 'done',
  //     foto_akhir: fotoAkhir,
  //     kondisi_akhir: kondisiAkhir,
  //   };
  //   try {
  //     const res = await changeStatus(id, data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const toastErrorMessage = (message) => {
    toast.error(message);
  };

  const pdfModalOpen = (status, deskripsi, id) => {
    onOpen();
    setStatusActivity(status);
    setDeskripsiPending(deskripsi);
    setUserId(id);
    setOpenPdfModal(true);
  };

  return (
    <DefaultLayout>
      {detail ? (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex gap-5">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${detail.foto_awal}`}
                alt="sdsd"
                className="w-1/3 h-full"
              />
              <div className="w-full">
                <TableDetailActivity data={detail} />
                {/* <Button
                  onPress={onOpen}
                  className={`my-5 w-full inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
                    detail.status === 'done'
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer'
                  }`}
                  // isDisabled={detail.status === 'done'}
                >
                  {detail.status === 'done' ? 'Selesai' : 'Selesaikan'}
                </Button> */}
              </div>
            </div>
          </div>

          {workerPending
            ? workerPending.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="mt-10 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
                  >
                    <h1 className="text-3xl font-semibold text-black dark:text-white text-center uppercase">
                      Pending
                    </h1>
                    <div className="h-0.5 mb-10 bg-stroke mt-5" />
                    <div className="mb-10">
                      <div className="w-full">
                        <PendingActivityTable data={data} />
                      </div>
                    </div>
                    <Button
                      onPress={() =>
                        pdfModalOpen(
                          'pending',
                          data.deskripsi_pending,
                          data.user_id,
                        )
                      }
                      color={'primary'}
                      className="w-full mt-3"
                    >
                      Cetak
                    </Button>
                  </div>
                );
              })
            : ''}

          {detail.status === 'done' && workerDone ? (
            <div className="mt-10 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <h1 className="text-3xl font-semibold text-black dark:text-white text-center uppercase">
                Handled
              </h1>
              <div className="h-0.5 mb-10 bg-stroke mt-5" />
              <div className="flex gap-5 mb-10">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${detail.foto_akhir}`}
                  alt="foto akhir"
                  className="w-1/3 h-full"
                />
                <div className="w-full">
                  <DoneActivityTable
                    data={detail}
                    user={workerDone?.username}
                  />
                  <Button
                    onPress={() => pdfModalOpen('done', '', workerDone.user_id)}
                    color={'primary'}
                    className="w-full mt-3"
                  >
                    Cetak
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {openPdfModal && (
            <PdfModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              deskripsiPending={deskripsiPending}
              status={statusActivity}
              id={userId}
              data={detail}
            />
          )}
        </>
      ) : (
        <DetailSekeleton />
      )}
      <ToastContainer autoClose={2000} />

      {/* <ChangeStatusModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={id}
        toastSuccess={() => toast.success('Success Approve Activity')}
        toastError={toastErrorMessage}
      /> */}
    </DefaultLayout>
  );
};

export default ActivityDetail;
