"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ILawyer } from "@/components/_model/lawyer/lawyer";
import { lawyerJoin } from "@/components/_service/lawyer/lawyer.service";
import { useForm } from "react-hook-form";

function Join() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<ILawyer>();

  const onSubmit = async (data: ILawyer) => {
    console.log("입력된 값 : " + JSON.stringify(data));

    try {
      await dispatch(lawyerJoin(data)).then((res: any) => {
        router.push(`/join/${res.payload.id}`);
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
          <p className=" text-[28px] font-medium align-middle">
            변호사 회원가입
          </p>
          <div>
            <label
              htmlFor="username"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">아이디</p>
              <input
                type="text"
                id="username"
                placeholder="Username"
                {...register("username")}
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
              htmlFor="birth"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">생년월일</p>
              <input
                type="text"
                id="birth"
                placeholder="Birth(YYMMDD)"
                {...register("birth")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="account"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">계좌 번호</p>
              <input
                type="text"
                id="account"
                placeholder="계좌 번호"
                {...register("account")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="lawyerNo"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">자격 번호</p>
              <input
                type="text"
                id="lawyerNo"
                placeholder="LawyerNo"
                {...register("lawyerNo")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold">
              Continue
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login/lawyer`)}
              className="text-gray-700 text-sm"
            >
              Already Joined?
            </p>
            <p
              onClick={() => router.push(`/login/user`)}
              className="text-gray-700 text-sm"
            >
              Are you a general user?
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Join;
