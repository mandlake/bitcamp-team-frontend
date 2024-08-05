"use client";

import { useState } from "react";
import Header from "../modules/header";

const BaseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    menu: false,
    message: false,
    notification: false,
    account: false,
  });

  // if (window.location.pathname === "/lawyer-info") {
  //   isDropdownOpen.menu = false;
  // }

  // if (window.location.pathname === "/user-info") {
  //   isDropdownOpen.menu = false;
  // }

  // if (window.location.pathname.includes("/lawyers/")) {
  //   isDropdownOpen.menu = false;
  // }

  return (
    <>
      <Header
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <div className="w-full bg-[var(--color-Harbor-first)]">
        <div
          className={`${
            isDropdownOpen.menu ? "w-[80vw] ml-[20vw]" : "w-[100vw] ml-0"
          } items-center flex flex-col justify-center text-[var(--color-Harbor-first)] bg-white font-roboto`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
