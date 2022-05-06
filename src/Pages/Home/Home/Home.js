import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../About/Banner/Banner';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Experts from '../Experts/Experts';
import Services from '../Services/Services'

const Home = () => {
    return (
        <>
            <PageTitle title="Home"></PageTitle>
            <Banner></Banner>
            <Services></Services>
            <Experts></Experts>
        </>
    );
};

export default Home;