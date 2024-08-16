"use client";

import {
  getLawyerById,
  getPostById,
} from "@/components/_service/lawyer/lawyer.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LawyerColumnByIdPage = (props: any) => {
  const ColumnId = props.params.id;
  const dispatch = useDispatch();

  const [column, setColumn] = useState<any>({});
  const [lawyer, setLawyer] = useState<string | null>(null);

  const getColumn = async () => {
    try {
      // Get the post by its ID
      const postData = await dispatch(getPostById(ColumnId)).then(
        (res: any) => res.payload
      );
      setColumn(postData);

      // Get the lawyer who wrote the post
      const lawyerData = await dispatch(getLawyerById(postData.lawyerId)).then(
        (res: any) => res.payload
      );
      setLawyer(lawyerData.name);
    } catch (error) {
      console.error("Failed to fetch post or lawyer", error);
    }
  };

  useEffect(() => {
    getColumn();
  }, [ColumnId]);

  return (
    <div className="w-[1400px] p-20">
      <div className="flex flex-col gap-10 border-b">
        <div className="font-light text-base">{column.category}</div>
        <h1 className="font-bold text-4xl">
          {column.title || "제목이 없습니다."}
        </h1>
        <div className="flex flex-row justify-between border-b py-7">
          <p>{lawyer || "작성자"}</p>
          <div>
            <p>{column.createdDate}</p>
          </div>
        </div>

        {/* 게시글 내용 표시 */}
        <div
          className="font-light text-lg"
          dangerouslySetInnerHTML={{ __html: column.content }}
        ></div>

        {/* 첨부파일 이미지 표시 */}
        {column.fileUrls && column.fileUrls.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-4 mt-2">
              {column.fileUrls.map((url: string, index: number) => (
                <div key={index} className="w-[700px] h-[700px]">
                  <img
                    src={url}
                    alt={`file-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 추가 정보 */}
        <div className="flex flex-row gap-2 text-sm mt-4">
          <p>조회수 1,000</p>
        </div>
        <div className="flex flex-row items-baseline gap-2 mb-12">
          # {column.category}
        </div>
      </div>
    </div>
  );
};

export default LawyerColumnByIdPage;
