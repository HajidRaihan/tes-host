import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import ActivityDetail from './pages/ActivityDetail';
import AddActivity from './pages/AddActivity';
import Kategori from './pages/Kategori';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Lokasi from './pages/Lokasi';
import ListActivity from './pages/ListActivity';
import ListBarang from './pages/ListBarang';
import LogBarang from './pages/LogBarang';
import JenisHardware from './pages/JenisHardware';
import JenisSoftware from './pages/JenisSoftware';
import AplikasiItTol from './pages/AplikasiItTol';
import Jadwal from './pages/Jadwal';
import HistoryBarang from './pages/historybarang';
import Itemdetail from './pages/DetailBarang';
import UserList from './pages/UserList';
import EmployeeList from './pages/EmployeeList';
import GrafikWaktuKerjaPage from './pages/GrafikWaktuKerjaPage';
import TestPdf from './pages/TesPdf';
import PrivateRoute from './middleware/PrivateRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/forms/add-activity"
          element={
            <PrivateRoute>
              <PageTitle title="Add Acitvity" />
              <AddActivity />
            </PrivateRoute>
          }
        />
        <Route
          path="/list-activity"
          element={
            <PrivateRoute>
              <PageTitle title="List Acitvity" />
              <ListActivity />
            </PrivateRoute>
          }
        />
        <Route
          path="/list-user"
          element={
            <PrivateRoute>
              <PageTitle title="List User" />
              <UserList />
            </PrivateRoute>
          }
        />{' '}
        <Route
          path="/list-employee"
          element={
            <PrivateRoute>
              <PageTitle title="List User (Teknisi/KTSP)" />
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/grafik-kerja"
          element={
            <PrivateRoute>
              <PageTitle title="Grafik Waktu Kerja" />
              <GrafikWaktuKerjaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/kategori"
          element={
            <PrivateRoute>
              <PageTitle title="Kategori" />
              <Kategori />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/jadwal"
          element={
            <>
              <PageTitle title="jadwal" />
              <Jadwal />
            </>
          }
        /> */}
        <Route
          path="/listbarang"
          element={
            <PrivateRoute>
              <PageTitle title="ListBarang" />
              <ListBarang />
            </PrivateRoute>
          }
        />
        <Route
          path="listbarang/historybarang/:id"
          element={
            <PrivateRoute>
              <PageTitle title="Historybarang" />
              <HistoryBarang />
            </PrivateRoute>
          }
        />
        <Route
          path="listbarang/detailbarang/:id"
          element={
            <PrivateRoute>
              <PageTitle title="Detailbarang" />
              <Itemdetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/logbarang"
          element={
            <PrivateRoute>
              <PageTitle title="Barang" />
              <LogBarang />
            </PrivateRoute>
          }
        />
        <Route
          path="/lokasi"
          element={
            <PrivateRoute>
              <PageTitle title="Lokasi" />
              <Lokasi />
            </PrivateRoute>
          }
        />
        <Route
          path="/jenis-hardware"
          element={
            <PrivateRoute>
              <PageTitle title="Jenis Hardware" />
              <JenisHardware />
            </PrivateRoute>
          }
        />
        <Route
          path="/jenis-software"
          element={
            <PrivateRoute>
              <PageTitle title="Jenis Software" />
              <JenisSoftware />
            </PrivateRoute>
          }
        />
        <Route
          path="/aplikasi-tol"
          element={
            <PrivateRoute>
              <PageTitle title="Aplikasi IT Tol" />
              <AplikasiItTol />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail/activity/:id"
          element={
            <PrivateRoute>
              <PageTitle title="Detail Acitvity" />
              <ActivityDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/jadwal"
          element={
            <PrivateRoute>
              <PageTitle title="Jadwal" />
              <Jadwal />
            </PrivateRoute>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <PrivateRoute>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </PrivateRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <PrivateRoute>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <PrivateRoute>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <PrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </PrivateRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <PrivateRoute>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </PrivateRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <PrivateRoute>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </PrivateRoute>
          }
        />
        <Route
          path="/pdf"
          element={
            <PrivateRoute>
              <PageTitle title="test pdf" />
              <TestPdf />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
