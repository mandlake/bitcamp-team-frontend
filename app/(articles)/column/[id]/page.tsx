"use client";

import {
  createPost,
  getLawyerById,
  getPostById,
} from "@/components/_service/lawyer/lawyer.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LawyerColumnByIdPage = (props: any) => {
  const ColumnId = props.params.id;
  const options = [
    { value: "형사법", label: "형사법" },
    { value: "공법", label: "공법" },
    { value: "국제법", label: "국제법" },
    { value: "국제거래법", label: "국제거래법" },
  ];
  const dispatch = useDispatch();
  const [column, setColumn] = useState({} as any);
  const [lawyer, setLawyer] = useState("");

  const getColumn = async () => {
    const data = await dispatch(getPostById(ColumnId)).then((res: any) => {
      setColumn(res.payload);
      dispatch(getLawyerById(res.payload.lawyerId)).then((res: any) => {
        setLawyer(res.payload.name);
      });
    });
  };

  const formattedOptions = options.reduce((acc, option) => {
    return acc + " - " + option.label;
  }, "");

  useEffect(() => {
    getColumn();
  }, []);

  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col p-20 gap-10 border-b">
          <div className="font-light text-base">{column.category}</div>
          <h1 className="font-bold text-4xl">
            {column.title || "제목이 없습니다."}
          </h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>{lawyer || "작성자"}</p>
              <div>
                <p>{column.createdDate}</p>
              </div>
            </div>
          </div>
          <p className="font-light text-lg">{column.content}</p>
          <div className="flex flex-row gap-2 text-sm">
            <p>조회수 1,000</p>
          </div>
          <div className="flex flex-row items-baseline gap-2">
            {column.category}
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerColumnByIdPage;
