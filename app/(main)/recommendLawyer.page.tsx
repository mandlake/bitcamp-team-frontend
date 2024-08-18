"use client";

import { ILawyer } from "@/components/_model/lawyer/lawyer";
import { getAllLawyer } from "@/components/_service/lawyer/lawyer.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const RecommendedLawyerPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lawyers, setLawyers] = useState<ILawyer[]>([]);
  const getAllLawyers = async () => {
    await dispatch(getAllLawyer()).then((res: any) => {
      console.log(res);
      setLawyers(res.payload);
    });
  };

  useEffect(() => {
    getAllLawyers();
  }, []);
  return (
    <>
      <div>
        <div className="h-auto border-[var(--color-Harbor-sec)] border-y-2 p-5 w-full text-[var(--color-Harbor-first)] flex flex-col gap-5">
          <p className=" text-xl mx-8 font-semibold">추천 변호사</p>
          <div className="h-auto animate__animated animate__fadeInRight animate__slow ease-in flex flex-wrap items-center justify-center gap-7">
            {lawyers?.slice(0, 5).map((lawyer, index) => (
              <div
                key={index}
                className=" border border-[var(--color-Harbor-first)] h-72 rounded-md text-[var(--color-Harbor-first)] items-center justify-center flex flex-col p-4 font-chosunsg"
                onClick={() => window.location.replace(`/lawyers/${lawyer.id}`)}
              >
                <Image
                  src={
                    lawyer.detail?.photo ||
                    "https://img.icons8.com/?size=100&id=11730&format=png&color=000000"
                  }
                  className="mb-3 h-48"
                  width={150}
                  height={150}
                  alt="lawyer-image"
                />
                <div className="flex flex-col items-center gap-1 w-28">
                  <h1 className="text-lg font-semibold">
                    {lawyer.name} 변호사
                  </h1>
                  <div className="text-sm flex flex-row items-center gap-2 truncate w-auto max-w-full">
                    {lawyer.detail?.law?.map((law: any, index: number) => (
                      <div key={index}>#{law}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div onClick={() => window.location.replace("/lawyers")}>
              <Image
                src="https://img.icons8.com/?size=100&id=45286&format=png&color=000000"
                width={22}
                height={22}
                alt="arrow-right"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
