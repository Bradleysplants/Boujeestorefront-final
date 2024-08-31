import React, { ReactNode } from 'react';
import Nav from "@modules/layout/templates/nav";
import Footer from "@modules/layout/templates/footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main id="content" role="main">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default PageLayout;
