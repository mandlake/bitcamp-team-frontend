"use client";

import { ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import { lawyerSaveDetail } from "@/components/_service/lawyer/lawyer.service";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

declare global {
  interface Window {
    daum?: any; // 지도 모듈
    IMP?: any; // 결제 모듈
  }
}

const JoinLawyerNextPage: NextPage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ILawyerDetail>();
  const options = [
    { value: "형사법", label: "형사법" },
    { value: "공법", label: "공법" },
    { value: "국제법", label: "국제법" },
    { value: "국제거래법", label: "국제거래법" },
    { value: "노동법", label: "노동법" },
    { value: "조세법", label: "조세법" },
    { value: "지적재산권법", label: "지적재산권법" },
    { value: "민사법", label: "민사법" },
    { value: "경제법", label: "경제법" },
    { value: "환경법", label: "환경법" },
  ];

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        console.log(data);
        setValue("address", data.address);
      },
    }).open();
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
          <p className=" text-[28px] font-medium align-middle mb-[2vh]">
            추가 정보 기입
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
              <p className="text-[22px] font-medium w-[11vw]">소속 주소</p>
              <div className="flex flex-row items-center justify-between text-center gap-[1vw] mb-[1.111vh]">
                <input
                  type="address"
                  className="w-[16vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] bg-white"
                  id="address"
                  value={getValues("address")}
                  placeholder="Address"
                  {...register("address")}
                  readOnly
                />
                <button
                  type="button"
                  className="w-[5vw] h-[5vh] bg-[var(--color-Harbor-first)] text-white font-bold"
                  onClick={openAddressSearch}
                >
                  주소 검색
                </button>
              </div>
            </label>
            <label
              htmlFor="addressDetail"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">소속 세부 주소</p>
              <input
                type="addressDetail"
                id="addressDetail"
                placeholder="addressDetail"
                {...register("addressDetail")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="belongPhone"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">소속 전화 번호</p>
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
              <p className="w-[11vw] text-[22px] font-medium">분야</p>
              <select
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch("law")}
                {...register("law")}
                name="law"
              >
                <option>담당분야를 선택하세요</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
              className="w-[33vw] h-[5vh] mt-[2vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white font-bold"
            >
              Join
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default JoinLawyerNextPage;
