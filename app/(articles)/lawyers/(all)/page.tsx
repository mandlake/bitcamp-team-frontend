"use client";

import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import { getAllLawyer } from "@/components/_service/lawyer/lawyer.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const LawyersBoardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();

  const [lawyers, setLawyers] = useState<ILawyer[]>([]);

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

  const getAllLawyers = async () => {
    await dispatch(getAllLawyer()).then((res: any) => {
      console.log(res);
      setLawyers(res.payload);
    });
  };

  useEffect(() => {
    getAllLawyers();
  }, []);

  useEffect(() => {
    console.log(lawyers);
  }, [lawyers]);
  return (
    <>
      <div className={`flex flex-col justify-center items-center relative`}>
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <h1 className="text-5xl font-semibold font-chosunlo">
            LAWYERS BOARD
          </h1>
          <div className="w-[60vw] flex flex-col items-center gap-5">
            <div className="flex flex-row items-baseline justify-center w-[60vw] gap-5 px-5 py-2">
              <select
                className="w-[5vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch("law")}
                {...register("law")}
                name="law"
              >
                <option>분야</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="w-[40vw] h-[5vh] flex border border-black flex-row justify-between ">
                <input type="text" className="w-80 focus:outline-none" />
                <button>
                  <Image
                    width={30}
                    height={20}
                    src={
                      "https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000"
                    }
                    alt={"find"}
                  />
                </button>
              </div>
            </div>
            <div className="w-auto flex flex-wrap justify-start items-baseline gap-3">
              {lawyers.map((item: any) => (
                <div
                  key={item.id}
                  className=" border border-[var(--color-Harbor-first)] rounded-md text-[var(--color-Harbor-first)] items-center flex flex-col p-4 font-chosunsg"
                  onClick={() => window.location.replace(`/lawyers/${item.id}`)}
                >
                  <Image
                    src="https://mblogthumb-phinf.pstatic.net/MjAyMTA1MjlfNzYg/MDAxNjIyMjE1MjMwOTk5.TSOSi5EAsh3MX9bdN3W9ugQyjSBYV_I0jMkcLwN9Wkwg.6KIRElwl9bBEUu-Br1UmWMMb0Fuku_CIFNb64SttOHkg.JPEG.acttosun08/IMAGE%EF%BC%BF2020%EF%BC%BF09%EF%BC%BF18%EF%BC%BF06%EF%BC%BF09%EF%BC%BF35.jpg?type=w800"
                    className="mb-3"
                    width={150}
                    height={150}
                    alt="lawyer-image"
                  />
                  <div className="w-auto flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">
                      {item.name} 변호사
                    </h1>
                    <div className="text-sm flex gap-2">
                      {item.detail?.law.map((law: any, index: number) => (
                        <div key={index}>#{law}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyersBoardPage;
