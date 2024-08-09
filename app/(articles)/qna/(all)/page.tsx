"use client";

import { getAllQnaBoard } from "@/components/_service/user/user.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const [questionBoard, setQuestionBoard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 20;
  const [totalPages, setTotalPages] = useState(0);

  const handleQuestionBoard = async () => {
    if (isLoading) return;
    setIsLoading(true);

    await dispatch(getAllQnaBoard({ page, size })).then((res: any) => {
      console.log(res);
      setQuestionBoard(res.payload);
      setPage(page + 1);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    handleQuestionBoard();
  }, []);
  return (
    <>
      <div className={`flex flex-col justify-center items-center relative`}>
        <div className="flex flex-col items-center py-24">
          <div className="flex flex-row items-center justify-between w-full p-5">
            <div></div>
            <h1 className=" text-5xl font-semibold font-chosunlo">
              법률 상담 Q&A
            </h1>
            <div
              className="text-lg font-semibold"
              onClick={() => router.push("/qna/add")}
            >
              글쓰기
            </div>
          </div>
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
            {questionBoard.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border rounded-md border-[var(--color-Harbor-sec)] w-[29vw] p-8 gap-4"
                onClick={() => router.push(`/qna/${item.id}`)}
              >
                <div className="text-7xl flex flex-row items-start align-text-top gap-3">
                  <p className=" text-[var(--color-Harbor-first)]">Q</p>
                  <div className="font-roboto">
                    <p className="text-lg line-clamp-1 font-semibold">
                      {item.title}
                    </p>
                    <p className="text-sm line-clamp-2 font-semibold">
                      {item.content}
                    </p>
                    <p className="text-sm truncate text-[var(--color-Harbor-sec)]">
                      {item.writer || "작성자"}
                    </p>
                  </div>
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
