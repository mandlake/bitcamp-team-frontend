"use client";

import { getLawyerByUsername } from "@/components/_service/lawyer/lawyer.service";
import "animate.css";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MenuPage = (props: any) => {
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(
    "animate__animated animate__fadeInLeft"
  );

  const MenuAfterLogin = [
    {
      key: "1",
      title: "Home",
      sub: "Home",
      children: [
        {
          key: "1",
          title: "Home",
          sub: "Home",
        },
      ],
    },
  ];

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (props.menu === true) {
      setAnimate("animate__animated animate__fadeInLeft fast");
    }
  }, [props.menu]);

  return (
    <>
      <div
        className={`${animate} border-r border-[var(--color-Harbor-sec)] z-0 bg-[var(--color-Harbor-firth)] fixed top-0 left-0 font-bold text-[var(--color-Harbor-first)] w-[20vw] h-screen text-[22px] flex flex-row py-20 px-10`}
      >
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-5">
            {isLoggedIn ? (
              MenuAfterLogin.map((item: any) => (
                <div key={item.key}>
                  <div className="border-b border-[var(--color-Harbor-sec)] flex flex-row justify-between items-baseline w-[250px] px-[5px] mb-3">
                    <h1>{item.title}</h1>
                    <p className=" font-light text-[14px]">{item.sub}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {item.children.map((child: any) => (
                      <div
                        key={child.key}
                        onClick={() => {
                          window.location.replace(child.path);
                        }}
                        className="flex flex-row justify-between items-baseline w-[240px] px-[5px] text-[14px] group"
                      >
                        <h1 className="group-hover:animate-bounce-left group-hover:text-cyan-900">
                          {child.title}
                        </h1>
                        <p className="group-hover:text-cyan-700 font-light text-[12px] items-center justify-center flex flex-row gap-2">
                          {child.sub}
                          <Image
                            src="https://img.icons8.com/?size=100&id=86517&format=png&color=000000"
                            width={12}
                            height={12}
                            alt="arrow-right"
                          />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <>
                <p>you need to login if you want to save data</p>
              </>
            )}
          </div>
          <div
            onClick={() => {
              window.location.replace("/");
            }}
          >
            LAWMATE LOGO
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
