import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';

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
// import  from './middleware/';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
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
            <>
              <PageTitle title="Add Acitvity" />
              <AddActivity />
            </>
          }
        />
        <Route
          path="/list-activity"
          element={
            <>
              <PageTitle title="List Acitvity" />
              <ListActivity />
            </>
          }
        />
        <Route
          path="/list-user"
          element={
            <>
              <PageTitle title="List User" />
              <UserList />
            </>
          }
        />{' '}
        <Route
          path="/list-employee"
          element={
            <>
              <PageTitle title="List User (Teknisi/KTSP)" />
              <EmployeeList />
            </>
          }
        />
        <Route
          path="/grafik-kerja"
          element={
            <>
              <PageTitle title="Grafik Waktu Kerja" />
              <GrafikWaktuKerjaPage />
            </>
          }
        />
        <Route
          path="/kategori"
          element={
            <>
              <PageTitle title="Kategori" />
              <Kategori />
            </>
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
            <>
              <PageTitle title="ListBarang" />
              <ListBarang />
            </>
          }
        />
        <Route
          path="listbarang/historybarang/:id"
          element={
            <>
              <PageTitle title="Historybarang" />
              <HistoryBarang />
            </>
          }
        />
        <Route
          path="listbarang/detailbarang/:id"
          element={
            <>
              <PageTitle title="Detailbarang" />
              <Itemdetail />
            </>
          }
        />
        <Route
          path="/logbarang"
          element={
            <>
              <PageTitle title="Barang" />
              <LogBarang />
            </>
          }
        />
        <Route
          path="/lokasi"
          element={
            <>
              <PageTitle title="Lokasi" />
              <Lokasi />
            </>
          }
        />
        <Route
          path="/jenis-hardware"
          element={
            <>
              <PageTitle title="Jenis Hardware" />
              <JenisHardware />
            </>
          }
        />
        <Route
          path="/jenis-software"
          element={
            <>
              <PageTitle title="Jenis Software" />
              <JenisSoftware />
            </>
          }
        />
        <Route
          path="/aplikasi-tol"
          element={
            <>
              <PageTitle title="Aplikasi IT Tol" />
              <AplikasiItTol />
            </>
          }
        />
        <Route
          path="/detail/activity/:id"
          element={
            <>
              <PageTitle title="Detail Acitvity" />
              <ActivityDetail />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/jadwal"
          element={
            <>
              <PageTitle title="Jadwal" />
              <Jadwal />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
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
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/pdf"
          element={
            <>
              <PageTitle title="test pdf" />
              <TestPdf />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
