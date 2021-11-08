import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {/* <Alert /> */}

      <main className="flex flex-col justify-center m-auto max-w-screen-lg min-h-total px-4 z-0 text-gray-800">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
