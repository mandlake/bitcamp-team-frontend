"use client";

import { useState } from "react";
import Header from "./modules/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    menu: true,
    cash: false,
    message: false,
    notification: false,
    account: false,
  });
  return (
    <>
      <Header
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <div
        className={`${
          isDropdownOpen.menu ? "w-[80vw] ml-[20vw]" : "w-[100vw] ml-0"
        } items-center flex flex-col justify-center text-[var(--color-Harbor-first) font-roboto`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
