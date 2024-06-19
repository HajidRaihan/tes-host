import React, { SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
// import { loginUser } from '../../api/authApi';
// import ExampleImage from '../../images/logo/logo1.png';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const emailOnChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  // const loginHandler = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const credential = {
  //       email: email,
  //       password: password,
  //     };

  //     const res = await loginUser(credential);

  //     if (res.user.role !== 'admin') {
  //       setIsLoading(false);
  //       return;
  //     }

  //     if (res) {
  //       navigate('/');
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false);
  //   }
  // };
  return (
    <div className="mx-32 mt-5">
      {/* <Breadcrumb pageName="Sign In" /> */}
      <ToastContainer />

      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className=" flex justify-center">
              <img
                src="data:image/png;base64,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"
                alt="Example"
                className="max-w-xs rounded-lg "
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
              <span
                className="mb-1.5 block font-medium"
                style={{ color: '#ffffff' }}
              >
                ss
              </span>

              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In
              </h2>

              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={emailOnChange}
                      value={email}
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
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={password}
                      onChange={passwordOnChange}
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
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  {/* <button
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    onClick={loginHandler}
                  >
                    Submit
                  </button> */}
                  <button className="flex w-full justify-center rounded bg-indigo-800 p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
