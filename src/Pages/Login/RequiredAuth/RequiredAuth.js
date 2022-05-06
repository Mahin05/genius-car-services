import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading'
import { ToastContainer, toast } from 'react-toastify';


const RequiredAuth = ({ children }) => {
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
  const [user, loading] = useAuthState(auth);
  let location = useLocation();
  if (loading) {
    return <Loading></Loading>
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if(user.providerData[0]?.providerId === 'password' && !user.emailVerified){
    return <div>
       <h3 className='text-danger'>Your Email is not verified</h3>
       <h3 className='text-success'>Please verify your email</h3>
       <button
       className='btn btn-primary'
        onClick={async () => {
          await sendEmailVerification();
          toast('Sent email');
        }}
      >
        send verification email
      </button>
      <ToastContainer></ToastContainer>
    </div>
  }
  return children;
};

export default RequiredAuth;