"use client";

import { getAccessToken } from "@/app/components/modules/cookies";
import "animate.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MenuBeforeLogin = [
  { key: 1, title: "Login", path: "/pages/users/login", sub: "로그인" },
  { key: 2, title: "Join", path: "/pages/users/join", sub: "회원가입" },
  { key: 3, title: "Menues", path: "/", sub: "sub" },
  { key: 4, title: "Menues", path: "/", sub: "sub" },
  { key: 5, title: "Menues", path: "/", sub: "sub" },
  { key: 6, title: "Menues", path: "/", sub: "sub" },
];

const MenuAfterLogin = [
  { title: "Menues", path: "/", sub: "sub" },
  { title: "Menues", path: "/", sub: "sub" },
  { title: "Menues", path: "/", sub: "sub" },
  { title: "Menues", path: "/", sub: "sub" },
];

const MenuPage = (props: any) => {
  const [animate, setAnimate] = useState(
    "animate__animated animate__fadeInLeft"
  );
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

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
          {MenuBeforeLogin.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                router.push(item.path);
              }}
              className="border-b-2 flex flex-row justify-between items-baseline w-[220px] px-[5px]"
            >
              <h1>{item.title}</h1>
              <p className=" font-light text-[14px]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
