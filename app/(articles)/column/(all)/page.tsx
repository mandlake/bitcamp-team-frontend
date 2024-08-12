"use client";

import { getAllPosts } from "@/components/_service/lawyer/lawyer.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const LawyerColumnPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();
  const [columns, setColumns] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const columnsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const post = {
    page: currentPage - 1,
    number: columnsPerPage,
  };

  const getColumns = async () => {
    const data = await dispatch(getAllPosts(post));
    console.log(data);
    setColumns(data.payload);
    setTotalPages(3);
  };

  const laws = [
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

  const options = [
    { value: "작성자", label: "작성자" },
    { value: "제목", label: "제목" },
    { value: "내용", label: "내용" },
  ];

  useEffect(() => {
    getColumns();
  }, [currentPage]);

  return (
    <>
      <div className={`flex flex-col justify-center items-center relative`}>
        <div className="flex flex-col items-center gap-9 py-24">
          <div className="flex flex-row items-center justify-between w-full p-5">
            <div></div>
            <h1 className=" text-5xl font-semibold font-chosunlo">
              변호사 법률 칼럼
            </h1>
            <div
              className="text-lg font-semibold"
              onClick={() => router.push("/column/add")}
            >
              글쓰기
            </div>
          </div>
          <div className="w-[60vw] flex flex-col items-center gap-5 font-roboto">
            <div className="flex flex-row items-baseline justify-center w-[60vw] gap-5 px-5">
              {/* <select
                className="w-[5vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch("law")}
                {...register("law")}
                name="law"
              >
                <option>분야</option>
                {laws.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */}
              <select
                className="w-[5vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch("options")}
                {...register("option")}
                name="options"
              >
                <option>유형</option>
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
          <div className="grid grid-cols-2 items-center justify-center w-[60vw] box-border gap-8">
            {columns.map((item: any, key: any) => (
              <div
                key={key}
                className="flex flex-col border rounded-md border-[var(--color-Harbor-sec)] items-baseline justify-between w-[29vw] p-8 gap-8"
                onClick={() => window.location.replace(`/column/${item.id}`)}
              >
                <div className="font-roboto flex flex-col items-baseline gap-2">
                  <div className="font-light flex flex-row items-center gap-2 text-xs">
                    <p># {item.category}</p>
                  </div>
                  <p className="text-2xl font-bold max-w-[24vw] truncate">
                    {item.title}
                  </p>
                  <div className="text-lg font-normal w-[24vw] break-all truncate">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center pt-10">
            {totalPages !== 0 && (
              <>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 border border-gray-300 rounded"
                >
                  이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 mx-1 border ${
                      currentPage === i + 1 ? "border-black" : "border-gray-300"
                    } rounded`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 border border-gray-300 rounded"
                >
                  다음
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerColumnPage;
