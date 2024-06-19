import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExampleImage from '../../images/logo/logo1.png';
import { registerUser, registerAdmin } from '../../api/authApi';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@nextui-org/react';

import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '../../layout/DefaultLayout';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const regisHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: username,
      email: email,
      password: password,
      role: role, // Include role in data
    };

    try {
      let res; // Declare res variable

      if (role === 'user') {
        res = await registerUser(data);
      } else if (role === 'admin') {
        res = await registerAdmin(data);
      }

      toast.success('Sukses Registrasi User!');
      setIsLoading(false);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-32 mt-5">
        <ToastContainer />
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="flex justify-center">
                <img
                  src={ExampleImage}
                  alt="Example"
                  className="max-w-xs rounded-lg"
                />
              </div>

              <div className="2xl:px-20 text-center mt-20">
                <h2
                  className="font-bold"
                  style={{
                    color: '#28517D',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  WELCOME TO
                </h2>
                <h3
                  className="font-bold"
                  style={{
                    color: '#28517D',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  IT SLA MAINTENANCE
                </h3>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign Up to Website
                </h2>

                <form onSubmit={regisHandler}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                              fill=""
                            />
                            <path
                              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7894 10.9672 11.7894C11.2422 11.7894 11.4922 11.6875 11.7328 11.5157L19.782 6.35942V16.5344C19.782 16.8782 19.507 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M11 0.0832519C8.70312 0.0832519 6.78125 1.947 6.78125 4.244C6.78125 6.541 8.70312 8.40475 11 8.40475C13.297 8.40475 15.2188 6.541 15.2188 4.244C15.2188 1.947 13.297 0.0832519 11 0.0832519ZM11 6.888C9.58437 6.888 8.4375 5.741 8.4375 4.244C8.4375 2.747 9.58437 1.6 11 1.6C12.4156 1.6 13.5625 2.747 13.5625 4.244C13.5625 5.741 12.4156 6.888 11 6.888ZM11 9.9175C7.6125 9.9175 4.8125 12.6875 4.8125 16.055V20.3332C4.8125 21.0932 5.45875 21.6665 6.25 21.6665H15.75C16.5412 21.6665 17.1875 21.0932 17.1875 20.3332V16.055C17.1875 12.6875 14.3875 9.9175 11 9.9175ZM15.75 20.3332H6.25V16.055C6.25 13.4025 8.34125 11.3125 11 11.3125C13.6588 11.3125 15.75 13.4025 15.75 16.055V20.3332Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Role
                    </label>
                    <div className="relative">
                      <select
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M11 0.0832519C8.70312 0.0832519 6.78125 1.947 6.78125 4.244C6.78125 6.541 8.70312 8.40475 11 8.40475C13.297 8.40475 15.2188 6.541 15.2188 4.244C15.2188 1.947 13.297 0.0832519 11 0.0832519ZM11 6.888C9.58437 6.888 8.4375 5.741 8.4375 4.244C8.4375 2.747 9.58437 1.6 11 1.6C12.4156 1.6 13.5625 2.747 13.5625 4.244C13.5625 5.741 12.4156 6.888 11 6.888ZM11 9.9175C7.6125 9.9175 4.8125 12.6875 4.8125 16.055V20.3332C4.8125 21.0932 5.45875 21.6665 6.25 21.6665H15.75C16.5412 21.6665 17.1875 21.0932 17.1875 20.3332V16.055C17.1875 12.6875 14.3875 9.9175 11 9.9175ZM15.75 20.3332H6.25V16.055C6.25 13.4025 8.34125 11.3125 11 11.3125C13.6588 11.3125 15.75 13.4025 15.75 16.055V20.3332Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <Button
                      type="submit"
                      className="w-full rounded-lg border border-primary bg-indigo-800 py-2 px-4 text-white transition hover:bg-opacity-90"
                      isLoading={isLoading}
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>

                {/* <p className="text-center text-base font-medium text-body-color">
                  Already have an account?{' '}
                  <Link
                    to="/auth/signin"
                    className="text-primary hover:underline"
                  >
                    Sign In
                  </Link>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
