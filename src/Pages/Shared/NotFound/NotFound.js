import React from 'react';
import sleeping from '../../../Images/sleeping.jpg';

const NotFound = () => {
    return (
        <div className='text-primary text-center'>
            <h2>Ohho!! No page Found</h2>
            <img style={{width:'100%', height:'10%'}} src={sleeping} alt="" />
        </div>
    );
};

export default NotFound;