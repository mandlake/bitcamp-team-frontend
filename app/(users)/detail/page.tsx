"use client";

import { IUser } from "@/components/_model/user/user";
import { updateUserById } from "@/components/_service/user/user.service";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UserLoginDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm<IUser>();

  const accessToken: string = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const options = [
    { value: "남자", label: "남자" },
    { value: "여자", label: "여자" },
  ];

  const onSubmit = async (data: IUser) => {
    console.log("입력된 값 : " + JSON.stringify(data));

    try {
      await dispatch(updateUserById({ ...data, id: decodedToken.id })).then(
        (res: any) => {
          window.location.replace("/");
        }
      );
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-screen h-screen items-center justify-center"
      >
        <div
          id="login"
          className="font-roboto w-[37vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">
            추가 정보를 입력해 주세요.
          </p>
          <div>
            <label
              htmlFor="age"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">나이</p>
              <input
                type="text"
                id="age"
                placeholder="Age"
                {...register("age")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="gender"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="w-[11vw] text-[22px] font-medium">성별</p>
              <select
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch("gender")}
                {...register("gender")}
                name="gender"
              >
                <option>당신의 성별을 선택하세요.</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor="phone"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">전화번호</p>
              <input
                type="text"
                id="phone"
                placeholder="PhoneNumber"
                {...register("phone")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold">
              Continue
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserLoginDetailPage;
