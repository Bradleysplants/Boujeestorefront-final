import React, { ReactNode } from 'react';
import Nav from "@modules/layout/templates/nav";
import Footer from "@modules/layout/templates/footer";

// Define props type for PageLayout
interface PageLayoutProps {
  children: ReactNode;
}

// PageLayout component using React.FC for function component with children
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
