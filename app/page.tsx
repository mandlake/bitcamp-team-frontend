"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

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
        <div className="h-[30vh] bg-[var(--color-Harbor-sec)] text-[var(--color-Harbor-firth)] w-[60vw]">
          그 밖의 내용 삽입
        </div>
        <div className=" border-2 border-dashed border-[var(--color-Harbor-first)] h-[32vh] w-[60vw] text-[var(--color-Harbor-first)] flex flex-col gap-5 py-3">
          <div className=" text-[18px] mx-8">추천 변호사</div>
          <div className=" animate__animated animate__fadeInRight animate__slow ease-in flex flex-row items-center justify-center gap-7">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className=" border border-[var(--color-Harbor-first)] text-[var(--color-Harbor-sec)] items-center flex flex-col py-5 px-3"
              >
                <img
                  className="h-[120px] w-[120px]"
                  src="https://d2ai3ajp99ywjy.cloudfront.net/uploads/original/5c66037ebb38fe09bee50c8f-original-1698724743004.jpg?s=256x256"
                />
                <div className="w-[155px] flex flex-col gap-2">
                  <h1 className="text-[15px] font-semibold">진보라 변호사</h1>
                  <div className="text-[13px] flex gap-2">
                    <div>#성매매알선</div>
                    <div>#장부단속</div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <ChevronRightOutlinedIcon />
            </div>
          </div>
        </div>
        <div
          className="h-[5vw] w-[5vw] bg-slate-600 fixed bottom-10 right-20"
          onClick={() => setIsOpenRoRo(!isOpenRoRo)}
        ></div>
      </div>
    </>
  );
}
