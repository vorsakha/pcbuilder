import React from "react";
import Alert from "../Alert";
import CreateBuild from "../CreateBuild";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <Alert />
      <CreateBuild />

      <main className="flex flex-col font-cairo justify-center m-auto max-w-screen-lg min-h-total px-4 z-0 text-gray-700">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
