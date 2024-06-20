"use client";

import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { iconsCSS, rounded } from "../common/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../user/service/user.service";
import { getAccessToken } from "./cookies";
import MenuPage from "@/app/pages/menues/page";
import Image from "next/image";

const Header = ({ isDropdownOpen, setIsDropdownOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthentication: any = async () => {
    const accessToken: any = await getAccessToken();
    setIsLoggedIn(!!accessToken);
    return accessToken;
  };

  const handleMenu = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      menu: !isDropdownOpen.menu,
    });
  };

  const handleLogOut = () => {
    dispatch(logout(checkAuthentication.value))
      .then((res: any) => {
        setIsLoggedIn(false);
        router.push("/");
      })
      .catch((error: any) => {
        console.log("로그아웃 실행에서 에러가 발생함 : ");
        console.log(error);
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, [isLoggedIn]);

  return (
    <>
      <nav
        className={`items-center fixed top-0 h-[5vh] w-screen z-20 flex flex-row justify-between `}
      >
        <div className={`flex flex-row items-center `}>
          <div className={`${rounded} relative`} onClick={() => handleMenu()}>
            {isDropdownOpen.menu ? (
              <>
                <Image
                  src="https://img.icons8.com/?size=100&id=9433&format=png&color=000000"
                  width={20}
                  height={20}
                  alt="arrow-right"
                  className="z-20"
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
              <TextsmsOutlinedIcon className={iconsCSS} />
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.notification ? "invisible" : "visible"
              }`}
            >
              <NotificationsOutlinedIcon className={iconsCSS} />
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.account ? "invisible" : "visible"
              } flex flex-col`}
            >
              <AccountCircleOutlinedIcon
                className={iconsCSS}
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
