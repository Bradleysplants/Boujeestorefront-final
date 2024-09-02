import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@modules/layout/templates/nav/index'; // Adjust the import path to where your Header component is located
import Footer from '@modules/layout/templates/footer'; // Adjust the import path to where your Footer component is located
import FaqPage from '@modules/account/components/customer-service';

const CustomerServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-gray">
      <Helmet>
        <title>Customer Service - DeLisa&apos;s Boujee Botanicals</title>
        <meta
          name="description"
          content="Find answers to your questions and get support for all your plant-related needs at DeLisa's Boujee Botanicals. Visit our customer service page for FAQs and more."
        />
      </Helmet>

      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      
      <Header /> {/* Include your Header component at the top */}

      <main id="main-content" className="flex-grow py-8 mx-auto max-w-screen-lg" role="main">
        <FaqPage />
      </main>

      <Footer /> {/* Include your Footer component at the bottom */}
    </div>
  );
};

export default CustomerServicePage;
