"use client";

import { IUser } from "@/components/_model/user/user";
import { getUserById } from "@/components/_service/user/user.service";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserSingeInfoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({} as IUser);

  const accessToken: string = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUser = async () => {
    await dispatch(getUserById(decodedToken.id)).then((res: any) => {
      console.log(res);
      setUser(res.payload);
    });
  };

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    console.log(accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        console.log(decodedToken);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {
      getUser();
    };
  }, []);

  return (
    <>
      <div className="flex flex-row relative">
        <div className="w-[390px]"></div>
        <div className="w-[390px] h-screen border-x border-[var(--color-Harbor-first)] p-5 items-center fixed top-0 bg-[var(--color-Harbor-firth)]">
          <div
            className="flex items-center justify-center text-[var(--color-Harbor-first)] font-bold text-[22px] cursor-pointer"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            LAWWMATE LOGO
          </div>
          <div className="flex flex-col items-center justify-center pt-12">
            <Image
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              width={180}
              height={180}
              alt="user-image"
              priority
              style={{ width: 180, height: 180 }}
              className="text-[var(--color-Harbor-first)]"
            />
            <h1 className=" font-semibold text-[26px] text-[var(--color-Harbor-first)]">
              {user.name}
            </h1>
            <p className=" text-[var(--color-Harbor-first)]/60 text-[22px]">
              {user.email}
            </p>
          </div>
        </div>
        <div className="items-center p-20 gap-6 flex flex-col">
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">기본정보</p>
            <div className="flex flex-row items-center justify-center p-2">
              <Image
                src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                width={50}
                height={50}
                alt="user-image"
                style={{ width: 50, height: 50 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="w-[600px] px-2">
                <div className="flex flex-row justify-between items-center">
                  <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                    {user.name}
                  </p>
                </div>
                <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">비밀번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e: any) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={(e: any) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">Email</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e: any) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">나이</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Age"
                  value={user.age}
                  onChange={(e: any) =>
                    setUser({ ...user, age: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">성별</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  value={user.gender}
                  onChange={(e: any) =>
                    setUser({ ...user, gender: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">예약 정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">포인트</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="point"
                  id="point"
                  name="point"
                  placeholder="point"
                  value={user.point}
                  onChange={(e: any) =>
                    setUser({
                      ...user,
                      point: e.target.value,
                    })
                  }
                  className="w-[22vw] pl-2 h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSingeInfoPage;
