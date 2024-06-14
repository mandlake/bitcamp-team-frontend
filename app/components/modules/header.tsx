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
import MenuPage from "@/app/pages/menues/page";

const Header = ({ isDropdownOpen, setIsDropdownOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <nav
        className={`items-center fixed top-0 h-[5vh] w-screen flex flex-row justify-between `}
      >
        <div className={`flex flex-row items-center `}>
          <div className={`${rounded} relative`} onClick={() => handleMenu()}>
            {isDropdownOpen.menu ? (
              <>
                <ClearOutlinedIcon className={iconsCSS} />
                <MenuPage menu={isDropdownOpen.menu}></MenuPage>
              </>
            ) : (
              <MenuIcon className={`h-[50px] w-[50px] font-semibold`} />
            )}
          </div>
          <div>
            {isLoggedIn ? (
              <div
                className={`${rounded} ${
                  isDropdownOpen.cash ? "invisible" : "visible"
                } ${isDropdownOpen.menu ? "ml-[250px]" : "ml-0"}`}
              >
                <LocalAtmOutlinedIcon className={iconsCSS} />
              </div>
            ) : null}
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
                onClick={() => handleAccount()}
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
