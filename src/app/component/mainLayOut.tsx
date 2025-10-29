import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-[url('/main_bg.jpg')] bg-no-repeat bg-center bg-cover font-['Inter'] relative">
      {children}
    </div>
  );
};

export default MainLayout;
