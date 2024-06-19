            import React, { useEffect, useState } from 'react';
            import DefaultLayout from '../layout/DefaultLayout';
            import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
            import { addBarang,getBarang,updateBarang } from '../api/BarangApi';
            import { faPlus,faArrowUpLong,faRemove } from '@fortawesome/free-solid-svg-icons';
            import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
            import { toast, ToastContainer } from 'react-toastify';
            import 'react-toastify/dist/ReactToastify.css';
            import { useNavigate } from 'react-router-dom';
            import { BarangListModal } from '../components/Modals/AddModal';
            import { UpdateBarangModal } from '../components/Modals/UpdateLokasiModal';
            import {UpdateBarangModalMin} from '../components/Modals/UpdateLokasiModal';
            import { useDisclosure } from '@nextui-org/modal';
            import Paginate from '../components/Pagination/paginate';
            const ListBarang = () => {
                const [data, setData] = useState([]);
                const navigate = useNavigate();
                const [BarangId, setBarangId] = useState('');
                const [filteredRecords, setFilteredRecords] = useState([]);
                const [updateStock, setUpdateStock] = useState<number>(0);
                const [updateStockMin, setUpdateStockMin] = useState(0);
                const { isOpen: addModalListOpen, onOpen: onAddModalListOpen, onClose: onAddModalListClose } = useDisclosure();
                const { isOpen: updateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure();
                const { isOpen: updateModalMinOpen, onOpen: onUpdateModalMinOpen, onClose: onUpdateModalMinClose } = useDisclosure();
                const [updatedSpesifikasi, setUpdateSpesifikasi] = useState('');
                const [newPicture,setNewPicture] = useState();
                const [newBarang, setNewBarang] = useState('');
                const [newMerek, setNewMerek] = useState('');
                const [updateLokasi, setUpdatelokasi] = useState('');
                const [newStok, setNewStok] = useState(0);
                const [newSpesifikasi, setNewSpesifikasi] = useState('');
                const [selectedPerusahan, setSelectedPerusahaan] = useState('');
                const [currentPage, setCurrentPage] = useState(1); // Current page state
                const itemsPerPage = 5; // Number of data items per page
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
              //   useEffect(() => {
              //     const indexOfLastItem = currentPage * itemsPerPage;
              //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
              //     const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
              //     // Update currentItems directly, no need for setCurrentItems
              // }, [currentPage, itemsPerPage, filteredRecords]);

              const handleFilter = () => {
                const filtered = data.filter(item => {
                    // Nama Equipment filtering
                    const namaEquipmentFilter = newBarang ? item.nama_equipment
                    .toLowerCase().includes(newBarang.toLowerCase()) : true;
                    const namaPerusahaanFilter = selectedPerusahan ? item.perusahaan
                    .toLowerCase().includes(selectedPerusahan.toLowerCase()) : true;
                    const namaMerkFilter = newMerek?item.merk.toLowerCase().includes(newMerek.toLowerCase()) : true;
                    return namaEquipmentFilter&&namaPerusahaanFilter&&namaMerkFilter;
                    
                    
                });
                setFilteredRecords(filtered);
            };

            useEffect(() => {
              handleFilter();
          }, [newBarang, selectedPerusahan,newMerek,data]);

          
          
          const dropdownOptions = data.map(item => item.nama_equipment);

          const uniqueDropdownOptions = Array.from(new Set(dropdownOptions));

          const dropdownList = data.map(item => item.perusahaan);

          const uniquelist = Array.from(new Set(dropdownList));

          const dropdownmerk = data.map(item=>item.merk);

          const uniquemerk = Array.from(new Set(dropdownmerk));


            const handlePageChange = (page) => {
            setCurrentPage(page); // Update the current page
  };

                
                const handleUpdateForm = (id) => {
                    setBarangId(id);
                    onUpdateModalOpen();
                };

                const handleUpdateFormMin = (id) => {
                    setBarangId(id);
                    onUpdateModalMinOpen();
                };
            
                const handleUpdate = async () => {
                    // Ensure updateStock is parsed as an integer
                    const stockToAdd = updateStock;
                
                    if (isNaN(stockToAdd) || stockToAdd <= 0) {
                        toast.error('Error: Stock should be a positive number');
                        return;
                    }
                
                    try {
                        const itemToUpdate = data.find(item => item.id === BarangId);
                        if (!itemToUpdate) {
                            throw new Error('Error: Barang not found');
                        }
                
                        const updatedStock = itemToUpdate.stock + stockToAdd;
                        const log_barang = 'masuk'; // No need to convert string to String object
                
                        const dataToUpdate = {
                            stock: updatedStock,
                            adddata_string: log_barang,
                            addata: stockToAdd,
                            catatan:updatedSpesifikasi,
                        };
                
                        const res = await updateBarang(BarangId, dataToUpdate);
                        const updatedBarang = res.data;
                
                        const updatedIndex = data.findIndex(item => item.id === BarangId);
                        if (updatedIndex !== -1) {
                            setData(prevData => {
                                const newData = [...prevData];
                                newData[updatedIndex] = updatedBarang;
                                return newData;
                            });
                        }
                
                        toast.success(`Stock updated successfully: ${updatedStock}`);
                        setTimeout(() => {
                          window.location.reload();
                      }, 1500);
                    } catch (error) {
                        toast.error('Error updating stock:', error.message);
                        // Handle the error gracefully (e.g., display an error message to the user)
                    }
                };
                
                

                const handleUpdateMinStock = async () => {
                  try {
                    if (updateStockMin <= 0) {
                      throw new Error('Error: Stock should be a positive number');
                    }
                
                    const itemToUpdate = data.find(item => item.id === BarangId);
                    if (!itemToUpdate) {
                      throw new Error('Error: Barang not found');
                    }
                
                    const updatedStock = itemToUpdate.stock - updateStockMin;
                    const log_barang = 'keluar'; // Removed unnecessary String() conversion
                
                    const dataToUpdate = {
                      stock: updatedStock,
                      adddata_string: log_barang,
                      addata: updateStockMin
                    };
                
                    const res = await updateBarang(BarangId, dataToUpdate);
                    const updatedBarang = res.data;
                
                    const updatedIndex = data.findIndex(item => item.id === BarangId);
                    if (updatedIndex !== -1) {
                      setData(prevData => {
                        const newData = [...prevData];
                        newData[updatedIndex] = updatedBarang;
                        return newData;
                      });
                    }
                
                    toast.success(`Stock updated successfully: ${updatedStock}`);
                    setTimeout(() => {
                      window.location.reload();
                  }, 1500);
                  } catch (error) {
                    toast.error(`Error updating stock: ${error.message}`); // Improved error message
                  }
                };
                
                
                
                
                useEffect(() => {
                    getBarang()
                        .then(res => {
                            setData(res);
                        })
                        .catch(error => {
                            console.error('Error fetching barang data:', error);
                        });
                }, []);

                const handleBarang = e => {
                  setNewBarang(e.target.value);
              };

              const updatehandleLokasi = e => {
                  setUpdatelokasi(e.target.value);
              };
                const handleMerek = e => {
                  setNewMerek(e.target.value);
              };

                const UpdatedhandleCatatan = e => {
                  setUpdateSpesifikasi(e.target.value);
                };

                const handleSpesifikasi = e => {
                  setNewSpesifikasi(e.target.value);
                };
                const handlePerusahaan = e => {
                  setSelectedPerusahaan(e.target.value);
              };
                const handleStok = e => {
                    setNewStok(parseInt(e.target.value)); // Parse input value to integer
                };

                const UpdatehandleStock = (e) => {
                    const newValue = parseInt(e.target.value); // Parse input value to integer
                    setUpdateStock(newValue);
                  };

                  

                  const UpdatehandleStockMin = (e) => {
                    const newValue = parseInt(e.target.value); // Parse input value to integer
                    setUpdateStockMin(newValue);
                  };

                    const handleAddListBarang = async() => {
                          const newBarangData = {
                              nama_equipment: newBarang,
                              merk: newMerek,
                              perusahaan: selectedPerusahan,
                              stock:newStok,
                              catatan: newSpesifikasi,
                              gambar:newPicture
                          };
  
                          try {
                              const res = await addBarang(newBarangData);
                              const addedBarang = res.data;
                              setData(prevData => [...prevData, addedBarang]);
                              toast.success('Barang added successfully!', res);
                              setTimeout(() => {
                                  window.location.reload();
                              }, 1500);
                      
                          } catch (error) {
                              toast.error('Failed to add ');
                          }
                      };
                const handlePictureChange = (e) => {
                setNewPicture(e.target.files[0]);

                };
                const handleAddListForm = () => {
                    
                  onAddModalListOpen();
              };
                return (
                    <DefaultLayout>
                        <ToastContainer/>
                        <Breadcrumb pageName="List Barang" />
                   
                        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className='flex items-center'>
    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        List Barang
    </h4>
    <div className="flex flex-grow items-center space-x-4" style={{ padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
            <div className="flex-1">
                <input
                    type="text"
                    value={newBarang}
                    onChange={e => setNewBarang(e.target.value)}
                    placeholder="Select Equipment"
                    list="equipmentList"
                    style={{
                      width: '100%', 
                      padding: '5px',
                      border: '2px solid #ccc',
                      borderRadius: '5px',
                    }}
                />
                <datalist id="equipmentList">
                    {uniqueDropdownOptions.map((option, index) => (
                        <option  key={index} value={option} />
                    ))}
                </datalist>
            </div>
            <div className="flex-1">
                <input
                    type="text"
                    value={selectedPerusahan}
                    onChange={e => setSelectedPerusahaan(e.target.value)}
                    placeholder="Select Perusahaan"
                    list="perusahaanList"
                    style={{
                      width: '100%', // Take full width of the parent
                      padding: '5px',
                      border: '2px solid #ccc',
                      borderRadius: '5px',
                    }}
                />
                <datalist id="perusahaanList">
                    {uniquelist.map((option, index) => (
                        <option key={index} value={option} />
                    ))}
                </datalist>
            </div>
            <div className="flex-1">
                <input
                    type="text"
                    value={newMerek}
                    onChange={e => setNewMerek(e.target.value)}
                    placeholder="Select Merk"
                    list="MerkList"
                    style={{
                      width: '100%', // Take full width of the parent
                      padding: '5px',
                      border: '2px solid #ccc',
                      borderRadius: '5px',
                    }}
                />
                <datalist id="MerkList">
                    {uniquemerk.map((option, index) => (
                        <option key={index} value={option} />
                    ))}
                </datalist>
            </div>
        </div>

    <div className="ml-auto"> 
    <button
            onClick={handleAddListForm}
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
</div>

                    <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                NO
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Nama Equipment
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Company
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Merk
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Stock
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={indexOfFirstItem + index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                    <p className="text-sm"> {indexOfFirstItem+ index + 1}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.nama_equipment}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.perusahaan}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.merk}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.stock}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <button
                                className="hover:text-primary"
                                onClick={() => handleUpdateForm(item.id)} 
                                title="update stock"
                                >
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                   
                                >
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
                                </svg>

                        </button>

                        <button
                            className="hover:text-primary"
                            onClick={() => handleUpdateFormMin(item.id)} 
                            title="min stock"

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
                        <button
                      className="hover:text-primary"
                       onClick={() => navigate(`historybarang/${item.id}`)}
                       title="history"

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
                    <button
                      className="hover:text-primary"
                       onClick={() => navigate(`detailbarang/${item.id}`)}
                       title="detail"

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
                          d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z"
                          fill="currentColor"
                        />
                        <path
                          d="M9 4V10"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>

                    </button>
              </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
                            <BarangListModal 
            isOpen={addModalListOpen}  
            onAdd={handleAddListBarang} 
            onChangeBarang={handleBarang}
            onChangeMerk={handleMerek}
            onChangeSpesifikasi={handleSpesifikasi}
            onChangePicture={handlePictureChange}
            onChangeStock={handleStok}
            onChangeCompany={handlePerusahaan}
            valueStock={newStok} 
            valueBarang={newBarang}
            valueSpesifikasi= {newSpesifikasi}
            valueMerk={newMerek}
            valueCompany={selectedPerusahan}
            onClose={onAddModalListClose}/>
            <div className='flex justify-center mt-4'>
         <Paginate currentPage={currentPage} onPageChange={handlePageChange}/></div>
            <UpdateBarangModal  isUpdateOpen={updateModalOpen} onAdd = {handleUpdate} 
            onUpdateStock={UpdatehandleStock}  valueUpdateSpesifikasi={updatedSpesifikasi}
            onUpdatespesifikasi={UpdatedhandleCatatan} 
             valueUpdateStock={updateStock} onUpdateClose={onUpdateModalClose}
                  />
            <UpdateBarangModalMin valueUpdateSpesifikasi={updatedSpesifikasi} 
            valueUpdateLokasi = {updateLokasi} onUpdateLokasi = {updatehandleLokasi}
            onUpdatespesifikasi={UpdatedhandleCatatan} isUpdateOpen={updateModalMinOpen} 
            onAdd = {handleUpdateMinStock} onUpdateStock={UpdatehandleStockMin} valueUpdateStock={updateStockMin} 
            onUpdateClose={onUpdateModalMinClose}
                  />
            </DefaultLayout>
                );
            };

            export default ListBarang;
