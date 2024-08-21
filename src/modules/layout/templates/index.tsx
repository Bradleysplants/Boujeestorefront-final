import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
