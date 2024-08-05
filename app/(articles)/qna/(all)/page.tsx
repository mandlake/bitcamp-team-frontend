"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const QnaBoardPage = () => {
  const router = useRouter();
  const options = [
    { value: "작성자", label: "작성자" },
    { value: "답변자", label: "답변자" },
    { value: "제목", label: "제목" },
    { value: "내용", label: "내용" },
  ];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center relative font-chosunlo`}
      >
        <div className="flex flex-col items-center py-24">
          <h1 className=" text-5xl font-semibold">법률 상담 Q&A</h1>
          <div className="flex flex-wrap items-center justify-center w-[60vw] box-border gap-7 pt-7">
            <div className="flex flex-row items-baseline justify-center w-[60vw] gap-5 px-5 py-2 font-roboto">
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
          </div>
          <div className="grid grid-cols-2 items-center justify-center w-[60vw] box-border gap-8 py-7">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className="flex flex-col border rounded-md border-[var(--color-Harbor-sec)] w-[29vw] h-[25vh] p-8 gap-4"
                onClick={() => router.push(`/qna/${item}`)}
              >
                <div className="text-7xl flex flex-row gap-3">
                  <p className=" text-[var(--color-Harbor-first)]">Q</p>
                  <div className="font-roboto">
                    <p className="text-lg line-clamp-2 font-semibold">
                      질문질문질문질문질문질문질문질문질문질문질문
                      질문질문질문질문질문질문질문질문질문질문질문
                      질문질문질문질문질문질문질문질문질문질문질문
                      질문질문질문질문질문질문질문질문질문질문질문
                    </p>
                    <p className="text-sm truncate text-[var(--color-Harbor-sec)]">
                      질문자1
                    </p>
                  </div>
                </div>
                <div className="text-7xl flex flex-row gap-3 justify-center items-end text-[var(--color-Harbor-first)]">
                  <div className="font-roboto flex flex-col items-end">
                    <p className="text-lg line-clamp-2 font-semibold">
                      답변답변답변답변답변답변답변답변답변답변
                      답변답변답변답변답변답변답변답변답변답변
                      답변답변답변답변답변답변답변답변답변답변
                      답변답변답변답변답변답변답변답변답변답변
                    </p>
                    <p className="text-sm truncate text-[var(--color-Harbor-sec)]">
                      답변자1 외 2명
                    </p>
                  </div>
                  <p className="">A</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default QnaBoardPage;
