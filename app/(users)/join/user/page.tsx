"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { IUser } from "@/components/_model/user/user";
import { localJoin } from "@/components/_service/user/user.service";

function Join() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit = async (data: IUser) => {
    console.log("입력된 값 : " + JSON.stringify(data));

    try {
      await dispatch(localJoin(data)).then((res: any) => {
        console.log(res);
        if (res.payload.message === "SUCCESS") {
          alert("회원가입 성공");
          window.location.replace("/login/user");
        } else {
          alert("회원가입 실패");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <p className=" text-[28px] font-medium align-middle">회원가입</p>
          <div>
            <label
              htmlFor="email"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이메일</p>
              <input
                type="text"
                id="email"
                placeholder="Email"
                {...register("email")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">비밀번호</p>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="name"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이름</p>
              <input
                type="text"
                id="name"
                placeholder="Name"
                {...register("name")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
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
            <label
              htmlFor="age"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">나이</p>
              <input
                type="text"
                id="age"
                placeholder="Birth"
                {...register("age")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="gender"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">성별</p>
              <input
                type="text"
                id="gender"
                placeholder="Gender"
                {...register("gender")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold">
              Continue
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login/user`)}
              className="text-gray-700 text-sm"
            >
              Already Joined?
            </p>
            <p
              onClick={() => router.push(`/login/lawyer`)}
              className="text-gray-700 text-sm"
            >
              Are you a lawyer?
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Join;
