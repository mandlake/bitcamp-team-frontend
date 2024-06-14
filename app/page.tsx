"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Home(props: any) {
  const router = useRouter();
  const [isOpenRoRo, setIsOpenRoRo] = useState(false);

  useEffect(() => {
    if (isOpenRoRo) {
      console.log("isOpenRoRo", isOpenRoRo);
    } else {
      console.log("isOpenRoRo", isOpenRoRo);
    }
  }, [isOpenRoRo]);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen gap-2 relative`}
      >
        <div className=" bg-[var(--color-Harbor-sec)] h-[20vh] w-[60vw] text-[var(--color-Harbor-firth)]">
          추후 로고 혹은 이미지 삽입
        </div>
        <div className=" bg-[var(--color-Harbor-first)] h-[32vh] w-[60vw] text-[var(--color-Harbor-firth)] flex flex-col gap-5 py-3">
          <div className=" mx-10">추천 변호사</div>
          <div className=" flex flex-row items-center justify-center gap-7">
            <div className=" bg-[var(--color-Harbor-sec)] h-[23vh] w-[10vw]">
              1
            </div>
            <div className=" bg-[var(--color-Harbor-sec)] h-[23vh] w-[10vw]">
              2
            </div>
            <div className=" bg-[var(--color-Harbor-sec)] h-[23vh] w-[10vw]">
              3
            </div>
            <div className=" bg-[var(--color-Harbor-sec)] h-[23vh] w-[10vw]">
              4
            </div>
            <div className=" bg-[var(--color-Harbor-sec)] h-[23vh] w-[10vw]">
              5
            </div>
          </div>
        </div>
        <div className="h-[30vh] bg-[var(--color-Harbor-sec)] text-[var(--color-Harbor-firth)] w-[60vw]">
          그 밖의 내용 삽입
        </div>
        <div
          className="h-[5vw] w-[5vw] bg-slate-600 fixed bottom-10 right-20"
          onClick={() => setIsOpenRoRo(!isOpenRoRo)}
        ></div>
      </div>
    </>
  );
}
