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
      <div className="pb-10">
        <Navbar />
        <Header />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 lg:px-20 py-8">
        <h1 className="homeTitle text-3xl font-extrabold mb-6 text-gray-800">Explore Featured Locations</h1>
        <Featured />

    

        <h1 className="homeTitle mt-10 text-3xl font-extrabold text-gray-800">Homes Guests Love</h1>
        <FeaturedProperties />
        <div className="w-100">
        <MailList />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
