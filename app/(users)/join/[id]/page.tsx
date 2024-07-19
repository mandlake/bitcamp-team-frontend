"use client";

import { ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import { lawyerSaveDetail } from "@/components/_service/lawyer/lawyer.service";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const JoinLawyerNextPage: NextPage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILawyerDetail>();

  const onSubmit = async (data: ILawyerDetail) => {
    data.id = props.params.id;

    console.log("입력된 값 : " + JSON.stringify(data));

    try {
      await dispatch(lawyerSaveDetail(data))
        .then((res: any) => {
          alert("success to join us");
          console.log(res);
        })
        .then(() => {
          router.push("/login/lawyer");
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
              htmlFor="belong"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">소속</p>
              <input
                type="text"
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                id="belong"
                placeholder="Belong"
                {...register("belong")}
              />
            </label>
            <label
              htmlFor="address"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">소속 주소</p>
              <input
                type="address"
                id="address"
                placeholder="Address"
                {...register("address")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="belongPhone"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">소속 전화번호</p>
              <input
                type="text"
                id="belongPhone"
                placeholder="BelongPhone"
                {...register("belongPhone")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="law"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">분야</p>
              <input
                type="text"
                id="law"
                placeholder="Law"
                {...register("law")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="phoneCost"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">전화상담비용</p>
              <input
                type="text"
                id="phoneCost"
                placeholder="PhoneCost"
                {...register("phoneCost")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="videoCost"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">영상상담비용</p>
              <input
                type="text"
                id="videoCost"
                placeholder="VideoCost"
                {...register("videoCost")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="account"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">상담가능시간</p>
              <input
                type="text"
                id="time"
                placeholder="상담가능시간"
                {...register("time")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button
              type="submit"
              className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default JoinLawyerNextPage;
