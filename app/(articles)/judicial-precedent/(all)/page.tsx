"use client";

import { SearchCriteriaDto } from "@/components/_model/manage/manage";
import {
  getAllCaseLaws,
  getCaseLawList,
  searchCaseLaws,
} from "@/components/_service/judicial-precedent/judicial.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const JudicialPrecidentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const options = [
    { value: "작성자", label: "작성자" },
    { value: "제목", label: "제목" },
  ];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();

  const [judicialPrecident, setJudicialPrecident] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const lastItemRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async () => {
    await dispatch(searchCaseLaws(watch("keyword"))).then((res: any) => {
      setJudicialPrecident(res.payload);
      setTotalPages(0);
    });
  };

  const handleCaseLawList = async () => {
    if (isLoading) return;
    setIsLoading(true);

    await dispatch(
      getAllCaseLaws({ page: currentPage, notificationsPerPage })
    ).then((res: any) => {
      setTotalPages(res.payload.totalPages);
      setJudicialPrecident(res.payload.content);
      setPage(page + 1);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      handleCaseLawList();
    };
  }, [isLoading, currentPage]);

  return (
    <>
      <div className={`flex flex-col justify-center items-center relative `}>
        <div className="flex flex-col items-center py-24">
          <h1 className=" text-5xl font-semibold font-chosunlo">판례 게시판</h1>
          <div className="flex flex-wrap items-center justify-center w-[60vw] box-border gap-7 py-7">
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
                <input
                  type="text"
                  className="w-80 focus:outline-none"
                  {...register("keyword")}
                />
                <button onClick={handleSearch}>
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
            <div className="flex flex-wrap items-center justify-center w-[60vw] box-border gap-6">
              {judicialPrecident?.map((item: any, index: number) => {
                return (
                  <div
                    ref={lastItemRef}
                    key={item.serialNumber}
                    className="flex flex-col items-baseline border rounded-md border-[var(--color-Harbor-sec)] w-[60vw] h-[15vh] p-8 gap-2"
                    onClick={() =>
                      window.location.replace(
                        `/judicial-precedent/${item.serialNumber}`
                      )
                    }
                  >
                    <div className="flex flex-row w-[55vw] justify-between font-chosunsg text-base">
                      <div>{item.serialNumber}</div>
                      <div>
                        {item.caseNumber} ~ {item.dateOfDecision}
                      </div>
                    </div>
                    <div className="text-3xl w-[55vw] truncate">
                      {item.caseName}
                    </div>
                  </div>
                );
              })}
            </div>
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

export default JudicialPrecidentPage;
