import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    // const [user,setUser] = useState({
    //     name:'Mahin',
    //     address:'Agrabad'
    // });
    // const handleAddress = event => {
    //     console.log(event.target.value);
    //     const {address,...rest}= user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress,...rest}
    //     console.log(newUser);
    //     setUser(newUser);
    // }

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value

        }
        // Send a POST request
        axios.post('http://localhost:5000/order',order)
        .then(res => {
            // console.log(res)
            const {data} =res;
            if(data.insertedId){
                toast('Your item is booked!!');
                event.target.reset();
            }
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please order : {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name="name" id="name" placeholder='name' required readOnly disabled /> <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name="email" id="email" placeholder='email' required readOnly disabled /> <br />
                <input className='w-100 mb-2' type="text" name="service" id="service" placeholder='service' required readOnly disabled /> <br />
                <input className='w-100 mb-2' type="text" name="address" id="address" placeholder='address' required /> <br />
                <input className='w-100 mb-2' type="text" name="phone" id="phone" placeholder='phone' required /> <br />
                <input className='btn btn-primary' type="submit" value="Place order" />
            </form>
        </div>
    );
};

export default CheckOut;