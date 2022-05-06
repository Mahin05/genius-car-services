import React from 'react';
import google from '../../../Images/Social/google.png'
import fb from '../../../Images/Social/facebook.jpg'
import git from '../../../Images/Social/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    let errorElement;
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);

    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message}{error1?.message}</p>
    }
    if (loading || loading1) {
        return <Loading></Loading>
    }
    if (user || user1) {
        // navigate('/home')
        navigate(from, { replace: true });

    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div>
            <p>{errorElement}</p>
            <div>
                <button onClick={() => signInWithGoogle()} className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img width="30px" src={google} alt="" />
                    <span className='px-2'>Google Sign In</span>
                </button>
            </div>
            <div>
                <button className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img width="30px" src={fb} alt="" />
                    <span className='px-2'>Facebook Sign In</span>
                </button>
            </div>
            <div>
                <button onClick={() => signInWithGithub()} className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img width="30px" src={git} alt="" />
                    <span className='px-2'>Github Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;