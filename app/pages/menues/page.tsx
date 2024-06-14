"use client";

import "animate.css";
import { useEffect, useState } from "react";

const MenuPage = (props: any) => {
  const [animate, setAnimate] = useState(
    "animate__animated animate__fadeInLeft"
  );

  useEffect(() => {
    if (props.menu === true) {
      setAnimate("animate__animated animate__fadeInLeft fast");
    } else {
      setAnimate("animate__animated animate__backOutLeft");
    }
  }, [props.menu]);

  return (
    <>
      <div
        className={`${animate} border-r border-[var(--color-Harbor-firth)] fixed top-0 left-0 font-bold text-[var(--color-Harbor-first)] w-[300px] h-screen text-[22px] flex flex-row py-20 px-10`}
      >
        <div className="flex flex-col items-center gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="border-b-2 flex flex-row justify-between items-baseline w-[220px] px-[5px]"
            >
              <h1>Menues</h1>
              <p className="font-normal text-[18px]">sub</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
