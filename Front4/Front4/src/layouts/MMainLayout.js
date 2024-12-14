import React from 'react';
import MHeader from '../components/MHeader';
import Footer from '../components/Footer';

const MMainLayout = ({ children }) => {
  return (
    <div>
      <MHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MMainLayout;
