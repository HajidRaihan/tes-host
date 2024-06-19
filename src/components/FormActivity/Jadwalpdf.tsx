import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import Logo from '../../assets/logo/logo1.jpg';
import { getJadwal } from '../../api/JadwalApi.js';
const MonthIndex = (tanggal) => {
  const date = new Date(tanggal);
  const index = date.getMonth();
  return <p>{index}</p>;
};
const Jadwalpdf = () => {
  const [data, setData] = useState();
  const [jumlahBulan, setJumlahBulan] = useState(
    Array.from({ length: 12 }, (_, index) => index + 1),
  );

  const dataJuniCambayya = '13-06-2024';
  const generatePDF = () => {
    const element = document.getElementById('pdf-content');
    const opt = {
      margin: 0.5,
      filename: 'jadwal-maintenance.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    getJadwal().then((res) => {
      setData(res);
    });
  }, []);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      {data && (
        <div className="PdfModal m-5">
          <div
            id="pdf-content"
            className="form-content p-5 border border-black"
          >
            <table className="w-full mb-5">
              <tr>
                <td className="border w-1/3 p-2">
                  <div className="flex items-center justify-center">
                    <div>
                      <img src={Logo} alt="Logo" className="w-32 mb-2" />
                    </div>
                  </div>
                </td>
                <td className="border w-1/3 p-2">
                  <div className="flex items-center justify-center h-full">
                    <h1
                      className="text-center font-bold"
                      style={{ fontSize: '18px' }}
                    >
                      Form Jadwal Maintenance 2024
                    </h1>
                  </div>
                </td>
                <td className="border w-1/3 text-xs">
                  <table className="w-full border-collapse">
                    <tr>
                      <td className="border-r p-2">No Dok :</td>
                      <td className="p-2">FO-MMN-MIS-02-03</td>
                    </tr>
                    <tr>
                      <td className="border-r border-t p-2">Tgl Terbit :</td>
                      <td className="border-t p-2">--/--/----</td>
                    </tr>
                    <tr>
                      <td className="border-r border-t p-2">No. Rev :</td>
                      <td className="border-t p-2">05</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="p-4 border mb-5">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '10vh',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>
                  Hardware dan Software Perawatan Toll
                </span>
              </div>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 w-1/13">Toll</th>
                    <th className="border p-2 w-1/13">Jan</th>
                    <th className="border p-2 w-1/13">Feb</th>
                    <th className="border p-2 w-1/13">Mar</th>
                    <th className="border p-2 w-1/13">Apr</th>
                    <th className="border p-2 w-1/13">Mei</th>
                    <th className="border p-2 w-1/13">Jun</th>
                    <th className="border p-2 w-1/13">Jul</th>
                    <th className="border p-2 w-1/13">Agu</th>
                    <th className="border p-2 w-1/13">Sep</th>
                    <th className="border p-2 w-1/13">Okt</th>
                    <th className="border p-2 w-1/13">Nov</th>
                    <th className="border p-2 w-1/13">Des</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kaluku Bodoa
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Tamalanrea
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Parangloe
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Biringkanaya
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Ramp Tallo Timur
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Ramp Tallo Barat
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Ramp Bira Barat
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Ramp Bira Timur
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border mb-5 page-break">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '10vh',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>
                  Hardware dan Software Perawatan Kantor
                </span>
              </div>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 w-1/13">Kantor</th>
                    <th className="border p-2 w-1/13">Jan</th>
                    <th className="border p-2 w-1/13">Feb</th>
                    <th className="border p-2 w-1/13">Mar</th>
                    <th className="border p-2 w-1/13">Apr</th>
                    <th className="border p-2 w-1/13">Mei</th>
                    <th className="border p-2 w-1/13">Jun</th>
                    <th className="border p-2 w-1/13">Jul</th>
                    <th className="border p-2 w-1/13">Agu</th>
                    <th className="border p-2 w-1/13">Sep</th>
                    <th className="border p-2 w-1/13">Okt</th>
                    <th className="border p-2 w-1/13">Nov</th>
                    <th className="border p-2 w-1/13">Des</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kantor Operasional Cambayya
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kantor Menara Bosowa
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kantor Pelayanan Lalin
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kantor Workshop
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kantor Satelit
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    >
                      Kantor Project
                    </th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                    <th
                      className="border p-2 w-1/13"
                      style={{ fontWeight: 'normal' }}
                    ></th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={generatePDF}>Generate PDF</button>
        </div>
      )}
    </>
  );
};

export default Jadwalpdf;
