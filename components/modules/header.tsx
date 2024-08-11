"use client";

import { useState, useEffect } from "react";
import { rounded } from "../common/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import MenuPage from "@/app/menues/page";
import Image from "next/image";
import { destroyCookie, parseCookies } from "nookies";
import { lawyerLogout } from "../_service/lawyer/lawyer.service";
import { jwtDecode } from "jwt-decode";
import { userLogout } from "../_service/user/user.service";
import { userURL } from "../common/url";
import { findIssueById } from "../_service/issue/issue-service";

const Header = ({ isDropdownOpen, setIsDropdownOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken: string = parseCookies().accessToken;
  const refreshToken = parseCookies().refreshToken;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [role, setRole] = useState("");

  const afterLoginMenu = [
    {
      key: 1,
      title: "User Info",
      path:
        accessToken !== undefined &&
        (role === "ROLE_NEWUSER" || role === "ROLE_USER")
          ? `/user-info`
          : `/lawyer-info`,
      sub: "회원 정보",
    },
    {
      key: 2,
      title: "Logout",
      path: "",
      sub: "회원 정보",
    },
    {
      key: 3,
      title: "Withdraw",
      path: "",
      sub: "회원 탈퇴",
    },
  ];

  const loginMenu = [
    {
      key: 1,
      title: "User Login",
      path: "/login/user",
      sub: "일반 회원",
    },
    {
      key: 2,
      title: "Lawyer Login",
      path: "/login/lawyer",
      sub: "변호사 회원",
    },
  ];

  const [notificationMenu, setNotificationMenu] = useState([
    {
      key: 1,
      title: "첫번째 알람 제목",
      path: "/alert/1",
      sub: "일반 회원",
    },
    {
      key: 2,
      title: "두번째 알람 제목",
      path: "/alert/2",
      sub: "변호사 회원",
    },
  ]);

  const messageMenu = [
    {
      key: 1,
      title: "첫번째 메시지 제목",
      path: "/message/1",
      sub: "일반 회원",
    },
    {
      key: 2,
      title: "두번째 메시지 제목",
      path: "/message/2",
      sub: "변호사 회원",
    },
  ];

  const boardMenu = [
    {
      key: 1,
      title: "News Board",
      path: "/news",
      sub: "뉴스",
    },
    {
      key: 2,
      title: "Lawyers Board",
      path: "/lawyers",
      sub: "변호사",
    },
    {
      key: 3,
      title: "판례 게시판",
      path: "/judicial-precedent",
      sub: "판례",
    },
    {
      key: 4,
      title: "법률 상담 Q&A",
      path: "/qna",
      sub: "Q&A",
    },
    {
      key: 5,
      title: "변호사 법률 칼럼",
      path: "/column",
      sub: "칼럼",
    },
  ];

  const handleMenu = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      menu: !isDropdownOpen.menu,
    });
  };

  const handleAlert = async () => {
    try {
      await dispatch(findIssueById(2)).then((res: any) => {
        /// findIssueById(2)는 임시로 넣은 것입니다. 원하시는 lawyerId로 변경해주세요.
        setNotificationMenu((prevIssues) => [
          { key: res.payload.id, title: res.payload.title, path: "", sub: "" },
          ...prevIssues,
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAlert();
  }, []);

  const handleLogOut = () => {
    if (role === "ROLE_NEWUSER") {
      dispatch(userLogout())
        .then((res: any) => {
          setIsLoggedIn(false);
          destroyCookie({}, "accessToken");
          destroyCookie({}, "requestToken");
          return res;
        })
        .catch((error: any) => {
          console.log("로그아웃 실행에서 에러가 발생함 : ");
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    } else if (role === "ROLE_USER") {
      dispatch(userLogout())
        .then((res: any) => {
          setIsLoggedIn(false);
          destroyCookie({}, "accessToken");
          destroyCookie({}, "requestToken");
          return res;
        })
        .catch((error: any) => {
          console.log("로그아웃 실행에서 에러가 발생함 : ");
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      dispatch(lawyerLogout(accessToken))
        .then((res: any) => {
          if (res.payload.message === "SUCCESS") {
            setIsLoggedIn(false);
            destroyCookie({}, "accessToken");
            destroyCookie({}, "requestToken");
          }
          return res;
        })
        .catch((error: any) => {
          console.log("로그아웃 실행에서 에러가 발생함 : ");
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      console.log("accessToken이 없습니다.");
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        setRole(decodedToken?.roles[0]);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }, [isLoggedIn]);

  // if (window.location.pathname === "/lawyer-info") return null;
  // if (window.location.pathname === "/user-info") return null;
  if (window.location.pathname.startsWith("/login/")) return null;
  if (window.location.pathname.startsWith("/join")) return null;
  if (window.location.pathname === "/find-password") return null;
  if (window.location.pathname.startsWith("/lawyers/")) return null;

  return (
    <>
      <nav
        className={`items-center fixed top-0 h-[5vh] w-screen z-20 flex flex-row justify-between ${
          window.location.pathname === "/" ? "" : "bg-white border-b"
        }`}
      >
        {window.location.pathname === "/" ? (
          <>
            <div className={`flex flex-row items-center `}>
              <div className={`${rounded} relative`}>
                <Image
                  src={
                    isDropdownOpen.menu
                      ? "https://img.icons8.com/?size=100&id=9433&format=png&color=000000"
                      : "https://img.icons8.com/?size=100&id=8113&format=png&color=000000"
                  }
                  width={20}
                  height={20}
                  alt="arrow-right"
                  className="z-20"
                  onClick={() => handleMenu()}
                />

                {isDropdownOpen.menu ? (
                  <MenuPage menu={isDropdownOpen.menu}></MenuPage>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`flex flex-row items-center `}>
              <div className={`${rounded} relative`}>
                <Image
                  src="https://img.icons8.com/?size=100&id=83246&format=png&color=1A1A1A"
                  width={20}
                  height={20}
                  alt="arrow-right"
                  className="z-20"
                  onClick={() => window.location.replace("/")}
                />
              </div>
            </div>
          </>
        )}
        <div className={`${isDropdownOpen.menu ? "flex" : "hidden"}`}></div>
        <div className={`flex justify-center items-center gap-6`}>
          {boardMenu.map((item: any) => {
            return (
              <div
                key={item.key}
                className="flex flex-row items-center gap-3"
                onClick={() => window.location.replace(item.path)}
              >
                <h1>{item.title}</h1>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className={`${rounded} flex flex-col relative`}>
            <div className={`${rounded}`}>
              <Image
                src="https://img.icons8.com/?size=100&id=646&format=png&color=000000"
                width={20}
                height={20}
                alt="inquiry"
                className="z-20"
                onClick={() => router.push("/inquiry")}
              />
            </div>
          </div>
          <div className={`${rounded} flex flex-col relative`}>
            <div className={`${rounded}`}>
              <Image
                src="https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=000000"
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
                onClick={() =>
                  setIsDropdownOpen({
                    ...isDropdownOpen,
                    account: false,
                    notification: false,
                    message: !isDropdownOpen.message,
                    inquiry: false,
                  })
                }
              />
            </div>
            <div
              className={`flex pt-14 w-40 flex-col absolute top-0 right-0 ${
                isDropdownOpen.message ? "visible" : "invisible"
              }`}
            >
              {messageMenu.map((item: any) => (
                <button
                  key={item.key}
                  onClick={() => window.location.replace(item.path)}
                  className="border bg-white"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className={`${rounded} flex flex-col relative`}>
            <div className={`${rounded}`}>
              <Image
                src="https://img.icons8.com/?size=100&id=ZW2vgTIQ1bkh&format=png&color=000000"
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
                onClick={() =>
                  setIsDropdownOpen({
                    ...isDropdownOpen,
                    account: false,
                    notification: !isDropdownOpen.notification,
                    message: false,
                    inquiry: false,
                  })
                }
              />
            </div>
            <div
              className={`flex pt-14 w-40 flex-col absolute top-0 right-0 ${
                isDropdownOpen.notification ? "visible" : "invisible"
              }`}
            >
              {notificationMenu.map((item: any) => (
                <button
                  key={item.key}
                  onClick={() => window.location.replace(item.path)}
                  className="border bg-white"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className={`${rounded} flex flex-col relative`}>
            <div className={`${rounded}`}>
              <Image
                src={
                  isLoggedIn
                    ? "https://img.icons8.com/?size=100&id=ckaioC1qqwCu&format=png&color=000000"
                    : "https://img.icons8.com/?size=100&id=26211&format=png&color=1A1A1A"
                }
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
                onClick={() =>
                  setIsDropdownOpen({
                    ...isDropdownOpen,
                    account: !isDropdownOpen.account,
                    notification: false,
                    message: false,
                    inquiry: false,
                  })
                }
              />
            </div>
            <div
              className={`flex pt-14 w-40 flex-col absolute top-0 right-0  ${
                isDropdownOpen.account ? "visible" : "invisible"
              }`}
            >
              {accessToken
                ? afterLoginMenu.map((item: any) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        if (item.key === 2) {
                          handleLogOut();
                        } else {
                          window.location.replace(item.path);
                        }
                      }}
                      className="border bg-white"
                    >
                      {item.title}
                    </button>
                  ))
                : loginMenu.map((item: any) => (
                    <button
                      key={item.key}
                      onClick={() => window.location.replace(item.path)}
                      className="border bg-white"
                    >
                      {item.title}
                    </button>
                  ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
