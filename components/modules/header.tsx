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

const Header = ({ isDropdownOpen, setIsDropdownOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken: string = parseCookies().accessToken;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [role, setRole] = useState("");

  const handleMenu = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      menu: !isDropdownOpen.menu,
    });
  };

  const handleLogOut = () => {
    if (role === "ROLE_LAWYER") {
      dispatch(lawyerLogout(accessToken))
        .then((res: any) => {
          console.log(res);
          if (res.payload.message === "SUCCESS") {
            setIsLoggedIn(false);
            destroyCookie({}, "accessToken");
            destroyCookie({}, "username");
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
    } else if (role === "ROLE_NEWUSER") {
      dispatch(userLogout())
        .then((res: any) => {
          console.log(res);
          setIsLoggedIn(false);
          destroyCookie({}, "accessToken");
          destroyCookie({}, "username");
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
          console.log(res);
          setIsLoggedIn(false);
          destroyCookie({}, "accessToken");
          destroyCookie({}, "username");
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
      console.log("error");
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        setRole(decodedToken?.roles[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  if (window.location.pathname === "/lawyer-info") return null;
  if (window.location.pathname === "/user-info") return null;
  if (window.location.pathname === "/login") return null;
  if (window.location.pathname.startsWith("/lawyers/")) return null;

  return (
    <>
      <nav
        className={`items-center fixed top-0 h-[5vh] w-screen z-20 flex flex-row justify-between `}
      >
        <div className={`flex flex-row items-center `}>
          <div className={`${rounded} relative`}>
            {isDropdownOpen.menu ? (
              <>
                <Image
                  src="https://img.icons8.com/?size=100&id=9433&format=png&color=000000"
                  width={20}
                  height={20}
                  alt="arrow-right"
                  className="z-20"
                  onClick={() => handleMenu()}
                />
                <MenuPage menu={isDropdownOpen.menu}></MenuPage>
              </>
            ) : (
              <Image
                src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000"
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
                onClick={() => handleMenu()}
              />
            )}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex justify-between items-center">
            <div
              className={`${rounded} ${
                isDropdownOpen.message ? "invisible" : "visible"
              }`}
            >
              <Image
                src="https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=000000"
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
              />
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.notification ? "invisible" : "visible"
              }`}
            >
              <Image
                src="https://img.icons8.com/?size=100&id=ZW2vgTIQ1bkh&format=png&color=000000"
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
              />
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.account ? "invisible" : "visible"
              } flex flex-col`}
            >
              <Image
                src="https://img.icons8.com/?size=100&id=ckaioC1qqwCu&format=png&color=000000"
                width={20}
                height={20}
                alt="arrow-right"
                className="z-20"
                onClick={() => handleLogOut()}
              />
              {isDropdownOpen.account && (
                <div className="flex flex-col fixed top-0 right-0">
                  <button onClick={() => handleLogOut()}>logout</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </>
  );
};

export default Header;
