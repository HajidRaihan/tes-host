import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLogin } from '../api/authApi';
import Loader from '../common/Loader';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const res = await getUserLogin();
        if (res.role === 'admin') {
          setIsAuthorized(true);
        } else {
          navigate('/auth/signin');
        }
      } catch (error) {
        console.error('Error fetching user login', error);
        navigate('/auth/signin'); // Redirect in case of an error
      }
    };

    checkUserRole();
  }, [navigate]);

  if (isAuthorized === null) {
    // Display a loading indicator while checking the user role
    return <Loader />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
