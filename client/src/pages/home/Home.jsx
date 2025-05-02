import React from 'react';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';

import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className=" ">
      {/* Navbar and Header Section */}
      <div className=" container mx-auto pb-10">
        <Navbar />
        <Header />
    

      {/* Main Content Container */}
      
        <h1 className="homeTitle text-3xl font-extrabold mb-6 text-gray-800 mt-10">Explore Featured Locations</h1>
        <Featured />

    

        <h1 className="homeTitle mt-10 text-3xl font-extrabold text-gray-800">Homes Guests Love</h1>
        <FeaturedProperties />
       
        <MailList />
 

        <Footer />
      </div>
    </div>
  
  );
};

export default Home;
