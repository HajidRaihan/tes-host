import React, { useState, useEffect } from 'react';
import { differenceInMinutes, differenceInSeconds, format } from 'date-fns';

const TimeDisplay = ({ timeString }) => {
  // Parse time string
  let [hours, minutes, seconds] = timeString.split(':').map(Number);
  let days = 0;

  // Handle hours > 24
  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours = hours % 24;
  }

  // Format output based on conditions
  const formattedTime = () => {
    if (days > 0) {
      return `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
    }
    if (hours === 0 && minutes === 0) {
      return `${seconds} detik`;
    }
    if (hours === 0) {
      return `${minutes} menit, ${seconds} detik`;
    }
    return `${hours} jam, ${minutes} menit, ${seconds} detik`;
  };

  return (
    <div>
      <p>{formattedTime()}</p>
    </div>
  );
};
const DoneActivityTable = ({ data, user }) => {
  const [tanggalSelesai, setTanggalSelesai] = useState();
  const [tanggalMulai, setTanggalMulai] = useState();
  const [lamaHandle, setLamaHandle] = useState();

  const convertsecondsToReadableString = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  function totalSeconds({ hari, jam, menit, detik }) {
    return hari * 24 * 60 * 60 + jam * 60 * 60 + menit * 60 + detik;
  }

  useEffect(() => {
    const tanggalMulaiFormat = data.created_at
      //   .replace('T', ' ')
      .replace('Z', '')
      .replace(/\.\d+/g, '');

    const tanggalSelesaiFormat = data.ended_at.replace(' ', 'T');

    const selisihDetik = differenceInSeconds(
      tanggalSelesaiFormat,
      tanggalMulaiFormat,
    );
    const lama = konversiDetik(selisihDetik);
    setLamaHandle(lama);
    setTanggalSelesai(format(tanggalSelesaiFormat, 'd MMMM yyyy, HH:mm:ss'));
    setTanggalMulai(format(tanggalMulaiFormat, 'd MMMM yyyy, HH:mm:ss'));
  }, []);

  function konversiDetik(detik) {
    const hari = Math.floor(detik / (60 * 60 * 24));
    const sisaDetik = detik % (60 * 60 * 24);
    const jam = Math.floor(sisaDetik / (60 * 60));
    const sisaDetik2 = sisaDetik % (60 * 60);
    const menit = Math.floor(sisaDetik2 / 60);
    const sisaDetik3 = sisaDetik2 % 60;

    return { hari, jam, menit, detik: sisaDetik3 };
  }

  const hasil = konversiDetik(200000);

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-fixed">
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Pelapor Hanlde
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{user}</p>
            </td>
          </tr>
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Tanggal Report
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{tanggalMulai}</p>
            </td>
          </tr>
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Tanggal Selesai
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{tanggalSelesai}</p>
            </td>
          </tr>

          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Waktu Handle
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                <TimeDisplay timeString={data.waktu_pengerjaan} />
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Kondisi Akhir
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{data.kondisi_akhir}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DoneActivityTable;
