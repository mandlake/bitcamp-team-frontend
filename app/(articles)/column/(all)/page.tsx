"use client";

import { useRouter } from "next/navigation";

const LawyerColumnPage = () => {
  const router = useRouter();
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center relative font-chosunlo`}
      >
        <div className="flex flex-col items-center py-16">
          <h1 className=" text-[40px] font-semibold">변호사 법률 칼럼</h1>

          <div className="flex flex-row items-center border rounded-md border-[var(--color-Harbor-sec)] w-[60vw] h-[25vh] p-8 gap-8"></div>
          <div className="grid grid-cols-2 items-center justify-center w-[60vw] box-border gap-8 py-7">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className="flex flex-col border rounded-md border-[var(--color-Harbor-sec)] items-baseline justify-between w-[29vw] h-[23vh] p-8 gap-8"
                onClick={() => router.push(`/column/${item}`)}
              >
                <div className="font-roboto flex flex-col items-baseline gap-2">
                  <div className="font-light flex flex-row items-center gap-2 text-[12px]">
                    <p># 성범죄</p>
                    <p># 미성년 대상 성범죄</p>
                  </div>
                  <p className="text-[22px] font-bold max-w-[24vw] text-wrap truncate">
                    title{item}title{item}title{item}title{item}title{item}title
                    {item}title{item}title{item}title{item}title{item}title
                    {item}
                  </p>
                  <p className="text-[18px] font-normal max-w-[24vw] text-wrap truncate">
                    content{item}content{item}content{item}content{item}content
                    {item}content{item}content{item}content{item}
                  </p>
                </div>
                <p className=" font-light font-roboto text-[14px]">
                  By 홍길동 변호사
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerColumnPage;
