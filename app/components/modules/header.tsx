"use client";

import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { iconsCSS, rounded } from "../common/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../user/service/user.service";
import { getAccessToken } from "./cookies";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    menu: false,
    cash: false,
    message: false,
    notification: false,
    account: false,
  });

  const checkAuthentication: any = async () => {
    const accessToken: any = await getAccessToken();
    console.log("accessToken: ", accessToken);
    setIsLoggedIn(!!accessToken);
    return accessToken;
  };

  const handleMenu = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      menu: !isDropdownOpen.menu,
    });
    if (isDropdownOpen.menu) {
      router.push("/");
    } else {
      router.push("/pages/menues");
    }
  };

  const handleAccount = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      account: !isDropdownOpen.account,
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
      {isLoggedIn ? (
        <nav
          className={`flex justify-between items-center fixed top-0 w-screen `}
        >
          <div className="flex justify-between items-center">
            <div className={`${rounded}`} onClick={() => handleMenu()}>
              {isDropdownOpen.menu ? (
                <ClearOutlinedIcon className={iconsCSS} />
              ) : (
                <MenuIcon className={`h-[50px] w-[50px] font-semibold`} />
              )}
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.menu ? "invisible" : "visible"
              }`}
            >
              <LocalAtmOutlinedIcon className={iconsCSS} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={`${rounded} ${
                isDropdownOpen.menu ? "invisible" : "visible"
              }`}
            >
              <TextsmsOutlinedIcon className={iconsCSS} />
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.menu ? "invisible" : "visible"
              }`}
            >
              <NotificationsOutlinedIcon className={iconsCSS} />
            </div>
            <div
              className={`${rounded} ${
                isDropdownOpen.menu ? "invisible" : "visible"
              } flex flex-col`}
            >
              <AccountCircleOutlinedIcon
                className={iconsCSS}
                onClick={() => handleAccount()}
              />
              {isDropdownOpen.account && (
                <div className="flex flex-col">
                  <button onClick={() => handleLogOut()}>logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Header;
