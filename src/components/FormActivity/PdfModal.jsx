import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import Logo from '../../assets/logo/logo1.jpg';
import './Pdf.css';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { getJenisHardware } from '../../api/jenisHardwareApi';
import { getJenisSoftware } from '../../api/jenisSoftwareApi';
import { getAplikasiTol } from '../../api/aplikasiTolApi';
import { getUser } from '../../api/userApi';
import { getEmployee } from '../../api/employeeApi';
import { atasanData } from './atasanData';
import TTD1 from './ttd/ttd1.png';
import TTD2 from './ttd/ttd2.png';

const PdfModal = ({
  isOpen,
  onOpenChange,
  data,
  status,
  deskripsiPending,
  id,
}) => {
  const [jenisHardwareData, setJenisHardwareData] = useState();
  const [jenisSoftwareData, setJenisSoftwareData] = useState();
  const [aplikasiItTolData, setAplikasiItTolData] = useState();
  const [employee, setEmployee] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeIndex, setEmployeeIndex] = useState();
  const [userData, setUserData] = useState('');
  const [departemen, setDepartemen] = useState();
  const [user, setUser] = useState();
  const [processedUserDataImage, setProcessedUserDataImage] = useState(null);
  const [processedEmployeeImage, setProcessedEmployeeImage] = useState(null);
  const [atasan, setAtasan] = useState(atasanData[0].name);

  const processImage = async (imgURL) => {
    if (!imgURL) return null;
    try {
      const image = await fetch(imgURL);
      const imageBlob = await image.blob();
      return URL.createObjectURL(imageBlob);
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        const res = await getJenisHardware();
        setJenisHardwareData(
          res.filter(
            (hardware) =>
              data.jenis_hardware &&
              data.jenis_hardware.includes(hardware.nama_hardware),
          ),
        );
      } catch (error) {
        console.error('Error fetching hardware:', error);
      }
    };
    fetchHardware();
  }, [data.jenis_hardware]);

  useEffect(() => {
    getEmployee().then((res) => {
      setEmployee(res);
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(id);
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await getJenisSoftware();
        setJenisSoftwareData(
          res.filter(
            (software) =>
              data.standart_aplikasi &&
              data.standart_aplikasi.includes(software.nama_software),
          ),
        );
      } catch (error) {
        console.error('Error fetching software:', error);
      }
    };
    fetchSoftware();
  }, [data.standart_aplikasi]);

  useEffect(() => {
    const fetchAplikasi = async () => {
      try {
        const res = await getAplikasiTol();
        setAplikasiItTolData(
          res.filter(
            (aplikasi) =>
              data.aplikasi_it_tol &&
              data.aplikasi_it_tol.includes(aplikasi.nama_aplikasiTol),
          ),
        );
      } catch (error) {
        console.error('Error fetching aplikasi:', error);
      }
    };
    fetchAplikasi();
  }, [data.aplikasi_it_tol]);

  useEffect(() => {
    const processImages = async () => {
      if (userData && userData.ttd) {
        const userImage = await processImage(
          `${import.meta.env.VITE_IMAGE_URL}/${userData.ttd}`,
        );
        setProcessedUserDataImage(userImage);
      }
      if (employeeIndex && employeeIndex.ttd) {
        const employeeImage = await processImage(
          `${import.meta.env.VITE_IMAGE_URL}/${employeeIndex.ttd}`,
        );
        setProcessedEmployeeImage(employeeImage);
      }
    };
    processImages();
  }, [userData, employeeIndex]);

  // const generatePDF = () => {
  //   const element = document.getElementById('pdf-content');
  //   const opt = {
  //     margin: 0,
  //     filename: 'Form-maintenance.pdf',
  //     // image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //   };
  //   html2pdf().set(opt).from(element).save();
  // };
  const generatePDF = () => {
    const element = document.getElementById('pdf-content');
    const opt = {
      margin: 0,
      filename: 'Form.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    const images = element.getElementsByTagName('img');
    const totalImages = images.length;
    let imagesLoaded = 0;

    const checkImagesLoaded = () => {
      if (imagesLoaded === totalImages) {
        html2pdf().set(opt).from(element).save();
      }
    };

    for (let img of images) {
      if (img.complete) {
        imagesLoaded++;
        checkImagesLoaded();
      } else {
        img.onload = () => {
          imagesLoaded++;
          checkImagesLoaded();
        };
        img.onerror = () => {
          console.error('Error loading image', img.src);
          imagesLoaded++;
          checkImagesLoaded();
        };
      }
    }

    if (totalImages === 0) {
      html2pdf().set(opt).from(element).save();
    }
  };

  const handleEmployeeSelect = (e) => {
    const selected = e.target.value;
    setEmployeeName(selected);

    const employeeIndex = employee.filter(
      (employee) => employee.nama == selected,
    );
    setEmployeeIndex(employeeIndex[0]);
  };

  return (
    <>
      <Modal
        className="border-stroke bg-whiter shadow-default dark:border-strokedark dark:bg-black h-[500px] "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent className="overflow-y-scroll">
          {(onClose) => (
            <>
              <ModalHeader className="dark:text-white flex flex-col gap-1">
                Preview
              </ModalHeader>
              <ModalBody>
                <>
                  <div className=" ml-5 mr-5">
                    <div className="flex-1 mt-3">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Atasan
                      </label>
                      <select
                        value={atasan}
                        onChange={(e) => setAtasan(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '5px',
                          border: '2px solid #ccc',
                          borderRadius: '5px',
                        }}
                      >
                        {atasanData.map((data) => {
                          return <option value={data.name}>{data.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="flex-1 mt-3">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Departemen
                      </label>
                      <select
                        value={departemen}
                        onChange={(e) => setDepartemen(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '5px',
                          border: '2px solid #ccc',
                          borderRadius: '5px',
                        }}
                      >
                        <option value="">Pilih Departemen</option>
                        <option value="IT">IT</option>
                        <option value="Operational">Operational</option>
                      </select>
                    </div>
                    {employee && (
                      <div className="flex-1 mt-3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          User
                        </label>
                        <select
                          value={employeeName}
                          onChange={handleEmployeeSelect}
                          style={{
                            width: '100%',
                            padding: '5px',
                            border: '2px solid #ccc',
                            borderRadius: '5px',
                          }}
                        >
                          <option value="">Pilih user</option>
                          {employee.map((data) => {
                            return (
                              <option value={data.nama}>{data.nama}</option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="PdfModal ml-5 mr-5 bg-white ">
                    {jenisHardwareData &&
                    jenisSoftwareData &&
                    aplikasiItTolData &&
                    data ? (
                      <div
                        id="pdf-content"
                        className="form-content p-5 text-xs"
                      >
                        <table className="w-full mb-2">
                          <tr>
                            <td className="border w-1/3 p-2">
                              <div className="flex items-center justify-center">
                                <div>
                                  <img
                                    src={Logo}
                                    alt="Logo"
                                    className="w-32 mb-2"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="border w-1/3 p-2">
                              <div className="flex items-center justify-center h-full">
                                <h1 className="text-center text-lg font-bold">
                                  Form Maintenance & Permintaan Perbaikan
                                </h1>
                              </div>
                            </td>
                            <td className="border w-1/3 text-xs">
                              <table className="w-full border-collapse">
                                <tr>
                                  <td className="border-r p-2">No Dok :</td>
                                  <td className=" p-2">FO-MMN-MIS-02-03</td>
                                </tr>
                                <tr>
                                  <td className="border-r border-t p-2">
                                    Tgl Terbit :
                                  </td>
                                  <td className="border-t p-2">--/--/----</td>
                                </tr>
                                <tr>
                                  <td className="border-r border-t p-2">
                                    No. Rev :
                                  </td>
                                  <td className="border-t p-2">05</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <div className="">
                          <div className="flex items-center gap-3">
                            <p>Periode (diisi oleh user)</p>
                            <input type="checkbox" />
                            <p>:</p>
                            <div className="flex items-center gap-1">
                              <label htmlFor="1">I</label>
                              <input
                                type="checkbox"
                                name="1"
                                id="1"
                                checked={data.shift === '1'}
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <label htmlFor="2">II</label>
                              <input
                                type="checkbox"
                                name="1"
                                id="1"
                                checked={data.shift === '2'}
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <label htmlFor="3">III</label>
                              <input
                                type="checkbox"
                                name="1"
                                id="1"
                                checked={data.shift === '3'}
                              />
                            </div>
                          </div>
                        </div>
                        <table className="mb-3">
                          <thead className="w-full">
                            <tr className="w-full ">
                              <td>Nama Lengkap (user) &nbsp;&nbsp;&nbsp;:</td>
                              <td className=" w-32">{employeeIndex?.nama}</td>
                              <td className=" ">Lokasi &emsp;&ensp;&nbsp;:</td>
                              <td className=" w-32">{data.location_name}</td>
                              <td>Tgl :</td>
                              <td>{data.created_at.split('T')[0]}</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="w-full ">
                              <td>
                                Departemen/Shift&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                              </td>
                              <td>{departemen}</td>
                              <td>Jabatan &emsp;:</td>
                              <td>
                                {employeeIndex?.jabatan === 'kspt'
                                  ? 'KSPT'
                                  : 'Teknisi'}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="mb-2">
                          <div className="flex items-center mb-1">
                            <span className="font-bold">Hardware:</span>
                            <input type="checkbox" className="ml-2" /> Tol
                            <input type="checkbox" className="ml-2" /> Non Tol
                          </div>

                          {/* <table className="w-full border-collapse mb-2">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border p-1 w-1/3">
                                <div className="flex items-center justify-center">
                                  <input type="checkbox" name="" id="" />
                                  <span className="ml-3">Jenis Hardware</span>
                                </div>
                              </th>
                              <th className="border p-1 w-1/6">
                                <div className="flex items-center">Kondisi</div>
                              </th>
                              <th className="border p-1 w-1/2">
                                <div className="flex items-center">
                                  <input type="checkbox" name="" id="" />
                                  <span className="text-red-500 ml-3">
                                    Mohon dijabarkan Permasalahan**
                                  </span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {jenisHardwareData.map((hardware, index) => {
                              return (
                                <tr key={index}>
                                  <td className="border p-1">
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={
                                          data.jenis_hardware &&
                                          data.jenis_hardware.includes(
                                            hardware.nama_hardware,
                                          )
                                        }
                                      />
                                      {hardware.nama_hardware}
                                    </div>
                                  </td>
                                  <td className="border p-1">
                                    {data.jenis_hardware &&
                                    data.jenis_hardware.includes(
                                      hardware.nama_hardware,
                                    )
                                      ? data.kondisi_akhir
                                      : ''}
                                  </td>
                                  <td className="border p-1">
                                    {data.jenis_hardware &&
                                    data.jenis_hardware.includes(
                                      hardware.nama_hardware,
                                    )
                                      ? data.uraian_hardware
                                      : ''}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table> */}
                          <table className="w-full border-collapse mb-2">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-1 w-1/3">
                                  <div className="flex items-center justify-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="ml-3">Jenis Hardware</span>
                                  </div>
                                </th>
                                <th className="border p-1 w-1/8">
                                  <div className="flex items-center">
                                    Kondisi
                                  </div>
                                </th>
                                <th className="border p-1 w-1/2">
                                  <div className="flex items-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-red-500 ml-3">
                                      Mohon dijabarkan Permasalahan**
                                    </span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {jenisHardwareData.map((hardware, index) => (
                                <tr key={index}>
                                  <td className="border p-1">
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={
                                          data.jenis_hardware &&
                                          data.jenis_hardware.includes(
                                            hardware.nama_hardware,
                                          )
                                        }
                                      />
                                      {hardware.nama_hardware}
                                    </div>
                                  </td>
                                  <td className="border p-1">
                                    <input type="checkbox" className="ml-2" />
                                  </td>
                                  {index === 0 && (
                                    <td
                                      className="border p-1 one-line"
                                      rowSpan={jenisHardwareData.length}
                                    >
                                      <p>{data.uraian_hardware}</p>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="">
                          <div className="mb-1 flex items-center">
                            <span className="font-bold">Software:</span>
                            <input type="checkbox" className="ml-2" /> Tol
                            <input type="checkbox" className="ml-2" /> Non Tol
                          </div>
                          <table className="w-full border-collapse mb-2">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-1 w-1/3">
                                  <div className="flex justify-center items-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="ml-3">
                                      Standard Aplikasi
                                    </span>
                                  </div>
                                </th>
                                <th className="border p-1 w-1/6">
                                  <div className="flex justify-center items-center">
                                    Kondisi
                                  </div>
                                </th>
                                <th className="border p-1 w-1/2">
                                  <div className="flex justify-center items-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-red-500 ml-3">
                                      Mohon dijabarkan Permasalahan**
                                    </span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {jenisSoftwareData.map((software, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border p-1">
                                      <div className="flex items-center">
                                        <input
                                          type="checkbox"
                                          className="mr-2"
                                          checked={
                                            data.standart_aplikasi &&
                                            data.standart_aplikasi.includes(
                                              software.nama_software,
                                            )
                                          }
                                        />
                                        {software.nama_software}
                                      </div>
                                    </td>
                                    <td className="border p-1">
                                      <input type="checkbox" className="ml-2" />
                                    </td>
                                    {index === 0 && (
                                      <td
                                        className="border p-1 one-line"
                                        rowSpan={jenisHardwareData.length}
                                      >
                                        <p>{data.uraian_hardware}</p>
                                      </td>
                                    )}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <table className="w-full border-collapse mb-2">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-1 w-1/3">
                                  <div className="flex justify-center items-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="ml-3">
                                      Aplikasi IT & Peralatan Tol
                                    </span>
                                  </div>
                                </th>
                                <th className="border p-1 w-1/6">
                                  <div className="flex justify-center items-center">
                                    Kondisi
                                  </div>
                                </th>
                                <th className="border p-1 w-1/2">
                                  <div className="flex justify-center items-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-red-500 ml-3">
                                      Mohon dijabarkan Permasalahan**
                                    </span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {aplikasiItTolData.map((aplikasi, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border p-1">
                                      <div className="flex items-center">
                                        <input
                                          type="checkbox"
                                          className="mr-2"
                                          checked={
                                            data.aplikasi_it_tol &&
                                            data.aplikasi_it_tol.includes(
                                              aplikasi.nama_aplikasiTol,
                                            )
                                          }
                                        />
                                        {aplikasi?.nama_aplikasiTol}
                                      </div>
                                    </td>
                                    <td className="border p-1">
                                      <input type="checkbox" className="ml-2" />
                                    </td>
                                    {index === 0 && (
                                      <td
                                        className="border p-1 one-line"
                                        rowSpan={jenisHardwareData.length}
                                      >
                                        <p>{data.uraian_hardware}</p>
                                      </td>
                                    )}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <table className="w-full border-collapse mb-2">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-1 w-1/3">
                                  <div className="flex justify-center items-center">
                                    <input type="checkbox" name="" id="" />
                                    <span className="ml-3 text-sm text-red-500">
                                      Catatan***
                                    </span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-1 h-20">
                                  {status === 'pending'
                                    ? deskripsiPending
                                    : data.kondisi_akhir}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className="w-full border-collapse mb-2">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-1 w-1/3">
                                  <span className="text-red-500">
                                    *Mengetahui (Atasan IT)
                                  </span>
                                </th>
                                <th className="border p-1 w-1/6">
                                  <span className="text-red-500">
                                    Pengecekan Oleh (IT)
                                  </span>
                                </th>
                                <th className="border p-1 w-1/2 ">
                                  <span className="text-red-500 ml-3">
                                    User
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            {/* <tbody>
                              <tr className="h-15">
                                <td className="border p-1"></td>
                                <td className="border p-1">
                                  <img
                                    src={`${import.meta.env.VITE_IMAGE_URL}/${
                                      userData.ttd
                                    }`}
                                    alt=""
                                  />
                                </td>
                                <td className="border p-1">
                                  <img
                                    src={`${import.meta.env.VITE_IMAGE_URL}/${
                                      employeeIndex?.ttd
                                    }`}
                                    className="w-20 h-20 m-auto"
                                    alt="ttd"
                                  />
                                </td>
                              </tr>
                              <tr className="h-6">
                                <td className="border p-1">
                                  <span className="text-red-500 font-bold">
                                    Nama:
                                  </span>
                                </td>
                                <td className="border p-1">
                                  <span className="text-red-500 font-bold">
                                    Nama:
                                  </span>
                                </td>
                                <td className="border p-1">
                                  <span className="text-red-500 font-bold">
                                    Nama:
                                  </span>
                                </td>
                              </tr>
                            </tbody> */}

                            <tbody>
                              <tr className="h-15">
                                <td className="border p-1">
                                  <img
                                    src={
                                      atasan === 'Mashuri Said' ? TTD1 : TTD2
                                    }
                                    alt="user ttd"
                                    className="w-20 h-20 m-auto"
                                  />
                                </td>
                                <td className="border p-1">
                                  {processedUserDataImage && (
                                    <img
                                      src={processedUserDataImage}
                                      alt="user ttd"
                                      className="w-20 h-20 m-auto"
                                      onError={() =>
                                        console.error(
                                          'Error loading user image',
                                          processedUserDataImage,
                                        )
                                      }
                                    />
                                  )}
                                </td>
                                <td className="border p-1">
                                  {processedEmployeeImage && (
                                    <img
                                      src={processedEmployeeImage}
                                      className="w-20 h-20 m-auto"
                                      alt="employee ttd"
                                      onError={() =>
                                        console.error(
                                          'Error loading employee image',
                                          processedEmployeeImage,
                                        )
                                      }
                                    />
                                  )}
                                </td>
                              </tr>
                              <tr className="h-6">
                                <td className="border p-1">
                                  <span className="text-red-500 font-bold">
                                    Nama: {atasan}
                                  </span>
                                </td>
                                <td className="border p-1">
                                  <span className="text-red-500 font-bold">
                                    Nama: {userData.username}
                                  </span>
                                </td>
                                <td className="border p-1">
                                  <span className="text-red-500 font-bold">
                                    Nama: {employeeName}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="text-red-500">
                            Catatan: User dapat mengisi kolom kosong jika item
                            kerusakan tidak terlist dalam form. Ext hanya di isi
                            untuk lokasi gerbang. User dapat memilih pilihan
                            dengan memberi lingkaran pada opsi yang dimaksud.
                            "*" dapat diisi dihari dan jam operasional normal.
                            "**" Dapat diisi oleh user untuk permintaan
                            perbaikan atau diisi oleh IT untuk maintenance.
                            "***" Diisi oleh IT. "****" Ditandatangani oleh
                            Teknisi{' '}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p>loading ...</p>
                    )}
                  </div>
                </>
              </ModalBody>

              <ModalFooter className="flex justify-center">
                <Button
                  color="primary"
                  onPress={generatePDF}
                  className="w-full"
                >
                  Cetak
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PdfModal;
