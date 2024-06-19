import React, { useEffect, useState } from 'react';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import SelectCompany from '../Forms/SelectGroup/SelectCompany';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne';
import SelectStatus from '../Forms/SelectGroup/SelectStatus';
import { getLokasi } from '../../api/lokasiApi';
import { getJenisHardware } from '../../api/jenisHardwareApi';
import { getJenisSoftware } from '../../api/jenisSoftwareApi';
import { getAplikasiTol } from '../../api/aplikasiTolApi';
import { getKategori } from '../../api/kategoriApi';
import { addActivity } from '../../api/activityApi';
import CheckboxTwo from '../Checkboxes/CheckboxTwo';
import { getUserLogin } from '../../api/authApi';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from '@nextui-org/react';
import Loader from '../Loader';
import SelectKategori from '../Forms/SelectGroup/SelectKategori';

const AddActivityModal = ({
  isOpen,
  onOpenChange,
  onOpenSuccessModal,
  toastSuccess,
  toastError,
  setData,
}) => {
  const [company, setCompany] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jenisHardwareData, setJenisHardwareData] = useState([]);
  const [jenisHardware, setJenisHardware] = useState([]);
  const [jenisSoftwareData, setJenisSoftwareData] = useState([]);
  const [standartAplikasi, setStandartAplikasi] = useState([]);
  const [uraianHardware, setUraianHardware] = useState('');
  const [uraianAplikasi, setUraianAplikasi] = useState('');
  const [aplikasiItTol, setAplikasiItTol] = useState([]);
  const [aplikasiItTolData, setAplikasiItTolData] = useState([]);
  const [uraianItTol, setUraianItTol] = useState('');
  const [catatan, setCatatan] = useState('');
  const [shift, setShift] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('');
  const [kondisiAkhir, setKondisiAkhir] = useState('');
  const [biaya, setBiaya] = useState('');
  const [foto, setFoto] = useState();
  const [status, setStatus] = useState('');
  const [lokasiData, setLokasiData] = useState();
  const [kategoriData, setKategoriData] = useState();
  const [dataUser, setDataUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [kategoriActivity, setKategoriActivity] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserLogin();
      setDataUser(res);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLokasi = async () => {
      const res = await getLokasi();
      setLokasiData(res);
    };
    fetchLokasi();
  }, []);

  useEffect(() => {
    const fetchKategori = async () => {
      const res = await getKategori();
      setKategoriData(res);
    };
    fetchKategori();
  }, []);

  useEffect(() => {
    const fetchHardware = async () => {
      const res = await getJenisHardware();
      // Menggunakan Set untuk menyaring nilai-nilai unik
      const uniqueHardwareNames = [
        ...new Set(res.map((item) => item.nama_hardware)),
      ];
      setJenisHardwareData(uniqueHardwareNames);
    };
    fetchHardware();
  }, []);

  useEffect(() => {
    const fetchSoftware = async () => {
      const res = await getJenisSoftware();
      // Menggunakan Set untuk menyaring nilai-nilai unik
      const uniqueSoftwareNames = [
        ...new Set(res.map((item) => item.nama_software)),
      ];
      setJenisSoftwareData(uniqueSoftwareNames);
    };
    fetchSoftware();
  }, []);

  useEffect(() => {
    const fetchAplikasi = async () => {
      const res = await getAplikasiTol();
      // Menggunakan Set untuk menyaring nilai-nilai unik
      const uniqueAplikasiNames = [
        ...new Set(res.map((item) => item.nama_aplikasiTol)),
      ];
      setAplikasiItTolData(uniqueAplikasiNames);
    };
    fetchAplikasi();
  }, []);
  const handleCompanyChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCompany(e.target.value);
  };
  const handleKategoriActivityChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKategoriActivity(e.target.value);
  };

  const handleTanggalChange = (e) => {
    setTanggal(e.target.value);
  };

  const handleJenisHardwareChange = (value) => {
    // Cek apakah value sudah ada dalam array checkedValues
    if (jenisHardware.includes(value)) {
      // Jika sudah ada, hapus dari array
      setJenisHardware(jenisHardware.filter((item) => item !== value));
    } else {
      // Jika belum ada, tambahkan ke array
      setJenisHardware([...jenisHardware, value]);
    }
  };

  const handleStandartAplikasiChange = (value) => {
    // Cek apakah value sudah ada dalam array checkedValues
    if (standartAplikasi.includes(value)) {
      // Jika sudah ada, hapus dari array
      setStandartAplikasi(standartAplikasi.filter((item) => item !== value));
    } else {
      // Jika belum ada, tambahkan ke array
      setStandartAplikasi([...standartAplikasi, value]);
    }
  };

  const handleUraianHardwareChange = (e) => {
    setUraianHardware(e.target.value);
  };

  const handleUraianAplikasiChange = (e) => {
    setUraianAplikasi(e.target.value);
  };

  // const handleAplikasiItTolChange = (selected) => {
  //   setAplikasiItTol(selected);
  // };

  const handleAplikasiItTolChange = (value) => {
    if (aplikasiItTol.includes(value)) {
      // Jika sudah ada, hapus dari array
      setAplikasiItTol(aplikasiItTol.filter((item) => item !== value));
    } else {
      // Jika belum ada, tambahkan ke array
      setAplikasiItTol([...aplikasiItTol, value]);
    }
  };

  const handleUraianItTolChange = (e) => {
    setUraianItTol(e.target.value);
  };

  const handleCatatanChange = (e) => {
    setCatatan(e.target.value);
  };

  const handleShiftChange = (e) => {
    const inputValue = e.target.value;

    // Memastikan bahwa nilai yang dimasukkan berada dalam rentang 0 hingga 3
    if (inputValue >= 0 && inputValue <= 3) {
      setShift(inputValue);
    }
  };

  const handleLokasiChange = (e) => {
    setLokasi(e.target.value);
  };

  const handleKategoriChange = (e) => {
    setKategori(e.target.value);
  };

  const handleKondisiAkhirChange = (e) => {
    setKondisiAkhir(e.target.value);
  };

  const handleBiayaChange = (e) => {
    setBiaya(e.target.value);
  };

  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAddActivity = async (close) => {
    // e.preventDefault();

    if (!dataUser) {
      return;
    }

    const data = {
      // user_id: dataUser.id,
      company: company,
      tanggal: tanggal,
      kategori_activity: kategoriActivity,
      jenis_hardware: jenisHardware.join(', '),
      standart_aplikasi: standartAplikasi.join(', '),
      uraian_hardware: uraianHardware,
      uraian_aplikasi: uraianAplikasi,
      aplikasi_it_tol: aplikasiItTol.join(', '),
      uraian_it_tol: uraianItTol,
      catatan: catatan,
      shift: shift,
      lokasi_id: lokasi,
      kategori_id: kategori,
      kondisi_akhir: kondisiAkhir,
      // biaya: biaya,
      foto_awal: foto,
      status: status,
    };

    setIsLoading(true);
    try {
      const res = await addActivity(data);

      if (res) {
        onOpenSuccessModal();
        toastSuccess();
        close();
        setIsLoading(false);
        setData((prev) => [...prev, res.data]);

        setCompany('');
        setTanggal('');
        setKategoriActivity('');
        setJenisHardware([]);
        setStandartAplikasi([]);
        setUraianHardware('');
        setUraianAplikasi('');
        setAplikasiItTol([]);
        setUraianItTol('');
        setCatatan('');
        setShift('');
        setLokasi('');
        setKategori('');
        setKondisiAkhir('');
        setFoto('');
        setStatus('');
      }
    } catch (error) {
      console.error(error);
      toastError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const dataJenisHardware = [
    // 'GTO',
    'Gate barrier',
    'LLA/OTL',
    'CCTV',
    'UPS',
    'STB',
  ];

  const dataAplikasiTol = [
    'Program LTCS/TFI',
    'Program PCS',
    'Program RTM',
    'Program CCTV/VMS',
  ];

  const dataStandartAplikasi = ['Sistem Operasi', 'Microsoft Office'];

  const dataCompany = ['MMN', 'JTSE'];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      // backdrop="blur"
      size="2xl"
      // placement="bottom"
      scrollBehavior="inside"
      className="border-stroke bg-whiter shadow-default dark:border-strokedark dark:bg-black h-[400px] "
    >
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="text-xl font-semibold text-black dark:text-white mx-6 mt-3 ">
              Add Activity
            </ModalHeader>
            {kategoriData &&
            lokasiData &&
            jenisHardwareData &&
            jenisSoftwareData &&
            aplikasiItTolData ? (
              <ModalBody className="overflow-y-scroll">
                <div className="rounded-sm">
                  {/* <div className="flex w-full justify-end">
                      <div
                        className="fixed flex justify-center items-center w-8 h-8 rounded-full  hover:animate-pulse"
                        onClick={close}
                      >
                        <FontAwesomeIcon icon={faX} color="hover:white" />
                      </div>
                    </div>
                    {/* <FontAwesomeIcon icon={faX} className="right-3 fixed" /> */}
                  {/* <h4 className="text-xl font-semibold text-black dark:text-white mx-6 my-6 ">
                      Add Activity
                    </h4>  */}
                  <div className="w-full h-0.5 bg-black " />
                  <form action="#" className=" ">
                    <div className="p-6.5">
                      <div className="mb-4.5 flex gap-6 flex-col">
                        {/* <SelectCompany
                    value={company}
                    onChange={handleCompanyChange}
                  /> */}

                        <SelectCompany
                          label="Company"
                          data={dataCompany}
                          value={company}
                          onChange={handleCompanyChange}
                        />

                        <SelectKategori
                          value={kategoriActivity}
                          onChange={handleKategoriActivityChange}
                        />

                        {/* <DatePickerOne
                        label={'Tanggal'}
                        value={tanggal}
                        onChange={handleTanggalChange}
                      /> */}

                        {/* <MultiSelect
                    id="multiSelect"
                    data={dataJenisHardware}
                    label="Jenis Hardware"
                    value={jenisHardware}
                    onChange={handleJenisHardwareChange}
                  /> */}

                        <div>
                          <label className="mb-2.5 block text-black dark:text-white">
                            Jenis Hardware
                          </label>
                          <div className="flex gap-10 flex-wrap">
                            {jenisHardwareData?.map((data, index) => {
                              return (
                                <CheckboxTwo
                                  label={data}
                                  key={index}
                                  isChecked={jenisHardware.includes(data)} // Pass nilai isChecked berdasarkan apakah label ada dalam checkedValues
                                  onChange={() =>
                                    handleJenisHardwareChange(data)
                                  } // Gunakan handleCheckboxChange sebagai onChange handler
                                  options={jenisHardwareData}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="w-full ">
                          <textarea
                            className="disabled:cursor-not-allowed w-full h-40 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            placeholder="Penjabaran Masalah Hardware"
                            rows={5}
                            value={uraianHardware}
                            onChange={handleUraianHardwareChange}
                            disabled={jenisHardware.length === 0}
                          />
                        </div>

                        {/* <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Standart Aplikasi
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={standartAplikasi}
                      onChange={handleStandartAplikasiChange}
                    />
                  </div> */}

                        <div>
                          <label className="mb-2.5 block text-black dark:text-white">
                            Standard Aplikasi
                          </label>
                          <div className="flex gap-10 flex-wrap">
                            {jenisSoftwareData.map((data, index) => {
                              return (
                                <CheckboxTwo
                                  label={data}
                                  key={index}
                                  isChecked={standartAplikasi.includes(data)} // Pass nilai isChecked berdasarkan apakah label ada dalam checkedValues
                                  onChange={() =>
                                    handleStandartAplikasiChange(data)
                                  } // Gunakan handleCheckboxChange sebagai onChange handler
                                  options={jenisSoftwareData}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="w-full ">
                          <textarea
                            className="disabled:cursor-not-allowed h-40 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            placeholder="Penjabaran Masalah Sistem"
                            rows={5}
                            value={uraianAplikasi}
                            onChange={handleUraianAplikasiChange}
                            disabled={standartAplikasi.length === 0}
                          />
                        </div>

                        {/* <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Aplikasi IT Tol
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={aplikasiItTol}
                      onChange={handleAplikasiItTolChange}
                    />
                  </div> */}

                        {/* <MultiSelectAplikasi
                    id="multiSelect"
                    data={dataAplikasiTol}
                    label="Aplikasi IT dan Peralatan Tol"
                    value={aplikasiItTol}
                    onChange={handleAplikasiItTolChange}
                  /> */}
                        {/*
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Hardware
                    </label>
                    <div className="flex gap-10 flex-wrap">
                      {dataAplikasiTol.map((data, index) => {
                        return <CheckboxTwo label={data} key={index} />;
                      })}
                    </div>
                  </div> */}

                        <div>
                          <label className="mb-2.5 block text-black dark:text-white">
                            Aplikasi IT dan Peralatan Tol
                          </label>
                          <div className="flex gap-10 flex-wrap">
                            {aplikasiItTolData.map((data, index) => {
                              return (
                                <CheckboxTwo
                                  label={data}
                                  key={index}
                                  isChecked={aplikasiItTol.includes(data)} // Perbarui prop isChecked
                                  onChange={() =>
                                    handleAplikasiItTolChange(data)
                                  } // Perbarui prop onChange
                                  options={aplikasiItTol}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="w-full ">
                          <textarea
                            placeholder="Penjabaran Masalah Aplikasi IT & Peralatan Tol"
                            rows={5}
                            className="disabled:cursor-not-allowed w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={uraianItTol}
                            onChange={handleUraianItTolChange}
                            disabled={aplikasiItTol.length === 0}
                          />
                        </div>

                        <div className="w-full ">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Catatan
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            placeholder="Catatan jika diperlukan"
                            value={catatan}
                            onChange={handleCatatanChange}
                          />
                        </div>

                        <div className="w-full ">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Shift
                          </label>
                          <input
                            type="number"
                            min="0" // Nilai minimum
                            max="3" // Nilai maksimum
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={shift}
                            onChange={handleShiftChange}
                          />
                        </div>

                        <SelectGroupOne
                          value={lokasi}
                          onChange={handleLokasiChange}
                          label="Lokasi"
                          data={lokasiData}
                        />

                        <SelectGroupOne
                          value={kategori}
                          onChange={handleKategoriChange}
                          label="Kategori"
                          data={kategoriData}
                        />

                        {/* <div className="w-full ">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Kondisi Akhir
                        </label>
                        <textarea
                          className="h-40 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          placeholder="Kondisi Akhir"
                          rows={5}
                          value={kondisiAkhir}
                          onChange={handleKondisiAkhirChange}
                        />
                      </div> */}

                        {/* <div className="w-full ">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Biaya
                          </label>
                          <input
                            type="number"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            placeholder="example: 80.000"
                            value={biaya}
                            onChange={handleBiayaChange}
                          />
                        </div> */}
                        <div>
                          <label className="mb-3 block text-black dark:text-white">
                            Foto
                          </label>
                          <input
                            type="file"
                            className="dark:text-white w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            onChange={handleFotoChange}
                          />
                        </div>

                        {/* <SelectStatus
                          value={status}
                          onChange={handleStatusChange}
                        /> */}
                      </div>

                      <Button
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        onClick={() => handleAddActivity(close)}
                        isLoading={isLoading}
                      >
                        Submit
                      </Button>
                      {/* <ButtonSubmit
                      handler={() => handleAddActivity(close)}
                      isLoading={true}
                    /> */}
                    </div>
                  </form>
                </div>
              </ModalBody>
            ) : (
              <p className="dark:text-white ms-10">loading ...</p>
              // <Loader/>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddActivityModal;
