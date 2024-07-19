"use client";

import { getLawyerByUsername } from "@/components/_service/lawyer/lawyer.service";
import "animate.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MenuPage = (props: any) => {
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  const MenuBeforeLogin = [
    {
      key: 1,
      title: "Login",
      sub: "로그인",
      children: [
        {
          key: 1.1,
          title: "User Login",
          path: "/login/user",
          sub: "일반 회원",
        },
        {
          key: 1.2,
          title: "Lawyer Login",
          path: "/login/lawyer",
          sub: "변호사 회원",
        },
      ],
    },
    {
      key: 2,
      title: "Boards",
      sub: "게시판",
      children: [
        {
          key: 2.1,
          title: "News Board",
          path: "/news",
          sub: "뉴스",
        },
        {
          key: 2.2,
          title: "Lawyers Board",
          path: "/lawyers",
          sub: "변호사",
        },
        {
          key: 2.3,
          title: "판례 게시판",
          path: "/judicial-precedent",
          sub: "판례",
        },
        {
          key: 2.4,
          title: "법률 상담 Q&A",
          path: "/qna",
          sub: "Q&A",
        },
        {
          key: 2.5,
          title: "변호사 법률 칼럼",
          path: "/column",
          sub: "칼럼",
        },
      ],
    },
  ];

  const MenuAfterLogin = [
    {
      key: 1,
      title: "My Page",
      sub: "마이 페이지",
      children: [
        {
          key: 1.1,
          title: "User Info",
          path:
            token && token.split(",")[0] === "user"
              ? `/user-info`
              : `/lawyer-info`,
          sub: "회원 정보",
        },
      ],
    },
    {
      key: 2,
      title: "Boards",
      sub: "게시판",
      children: [
        {
          key: 2.1,
          title: "News Board",
          path: "/news",
          sub: "뉴스",
        },
        {
          key: 2.2,
          title: "Lawyers Board",
          path: "/lawyers",
          sub: "변호사",
        },
        {
          key: 2.3,
          title: "판례 게시판",
          path: "/judicial-precedent",
          sub: "판례",
        },
        {
          key: 2.4,
          title: "법률 상담 Q&A",
          path: "/qna",
          sub: "Q&A",
        },
        {
          key: 2.5,
          title: "변호사 법률 칼럼",
          path: "/column",
          sub: "칼럼",
        },
      ],
    },
  ];

  const [animate, setAnimate] = useState(
    "animate__animated animate__fadeInLeft"
  );

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthentication: any = async () => {
    const accessToken = parseCookies().accessToken;
    setIsLoggedIn(!!accessToken);
    console.log(parseCookies().username);
    setUsername(parseCookies().username);
    setToken(accessToken);
    return accessToken;
  };

  const getLawyer = async () => {
    await dispatch(getLawyerByUsername(username)).then((res: any) => {
      console.log(res);
    });
  };

  useEffect(() => {
    checkAuthentication();
    if (token.split(",")[0] === "user") {
      setUsername(parseCookies().username);
    } else if (token.split(",")[0] === "lawyers") {
      setUsername(parseCookies().username);
      getLawyer();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (props.menu === true) {
      setAnimate("animate__animated animate__fadeInLeft fast");
    }
  }, [props.menu]);

  return (
    <>
      <div
        className={`${animate} border-r-2 border-[var(--color-Harbor-sec)] z-0 bg-[var(--color-Harbor-firth)] fixed top-0 left-0 font-bold text-[var(--color-Harbor-first)] w-[20vw] h-screen text-[22px] flex flex-row py-20 px-10`}
      >
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-5">
            {isLoggedIn
              ? MenuAfterLogin.map((item: any) => (
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
              : MenuBeforeLogin.map((item: any) => (
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
                ))}
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
