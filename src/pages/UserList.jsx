import React, { useEffect, useState } from 'react';
import TableUser from '../components/Tables/TableUser';
import DefaultLayout from '../layout/DefaultLayout';
import { getAllUser } from '../api/userApi';

const UserList = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAllUser();
      setUserData(res.data);
    };
    fetchUser();
  }, []);

  return (
    <DefaultLayout>
      <TableUser data={userData} setUserData={setUserData} />
    </DefaultLayout>
  );
};

export default UserList;
