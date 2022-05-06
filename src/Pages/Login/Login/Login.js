import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';



const Login = () => {
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
        const {data} = await axios.post('http://localhost:5000/login', {email});
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });
    }
    if (user) {
        // navigate('/home');
        // navigate(from, { replace: true });
    }
    const navigateRegister = event => {
        navigate('/register')
    }
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    if (loading || sending) {
        return <Loading ></Loading>
    }
    const forgetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else{
            toast('Please enter your email')
        }
    }
    return (
        <div className='container w-50 m-auto'>
                <PageTitle title="Login"></PageTitle>
            <h2 className='text-primary text-center mt-2'>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>new to genius car service? <Link to='/register' className='text-primary pe-auto' onClick={navigateRegister}>please register</Link> </p>
            <p>Forget password?<Link to='/login' className='text-primary pe-auto' onClick={forgetPassword} >Reset Password</Link></p>
            <p>{errorElement}</p>
            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;