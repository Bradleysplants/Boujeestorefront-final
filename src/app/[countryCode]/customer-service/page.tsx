import React from 'react';
import Header from '@modules/layout/templates/nav/index'; // Adjust the import path to where your Header component is located
import Footer from '@modules/layout/templates/footer'; // Adjust the import path to where your Footer component is located
import FaqPage from '@modules/account/components/customer-service';

const CustomerServicePage = () => {
  return (
    <div>
      <Header /> {/* Include your Header component at the top */}
      
      <main className="bg-slate-gray py-8">
        <FaqPage /> {/* The main FAQ content */}
      </main>
      
      <Footer /> {/* Include your Footer component at the bottom */}
    </div>
  );
};

export default CustomerServicePage;
