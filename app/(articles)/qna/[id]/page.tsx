"use client";

import {
  findQnaBoardById,
  findReplyByArticleId,
} from "@/components/_service/qna/qna.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const QnAByIdPage = (props: any) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([] as any);

  const [question, setQuestion] = useState({} as any);
  const [reply, setReply] = useState([] as any);

  const handleQuestion = async () => {
    try {
      await dispatch(findQnaBoardById(props.params.id)).then((res: any) => {
        setQuestion(res.payload);
        setOptions(res.payload.law);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReply = async () => {
    try {
      await dispatch(findReplyByArticleId(props.params.id)).then((res: any) => {
        console.log(res);
        setReply(res.payload);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleQuestion();
    handleReply();
  }, []);

  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col p-20 gap-10 border-b">
          <h1 className="font-bold text-4xl">{question.title}</h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>{question.writer || "작성자"}</p>
              <div>
                <p>{question.regDate || "2000-03-03"}</p>
              </div>
            </div>
          </div>
          <p
            className="font-light text-lg"
            dangerouslySetInnerHTML={{ __html: question.content }}
          ></p>
          <div className="flex flex-row gap-2 text-sm">
            <p>조회수 1,000</p>
          </div>
          <div className="flex flex-row items-baseline gap-2">
            {/* {options.map((i:  any) => (
              <> */}
            <div className="flex flex-row justify-center items-center p-2 text-xs rounded-2xl border">
              #{question.law}
            </div>
            {/* </>
            ))} */}
          </div>
        </div>
        <div className="flex flex-col p-10 gap-10">
          <div className="p-5 flex flex-col gap-3">
            {/* {reply?.map((item: any, key: any) => (
              <div key={key} className="flex flex-row gap-5 items-start">
                <div className="w-10 h-10 bg-slate-600"></div>
                <div className="text-sm flex flex-col gap-2">
                  <p className="font-bold">작성자</p>
                  <p>{item.content}</p>
                  <div className="text-xs flex flex-row gap-4 font-light">
                    <p>{item.modifiedDate}</p>
                    <p>삭제하기</p>
                  </div>
                </div>
              </div>
            ))} */}
            <div className="flex flex-row gap-5 items-start">
              <div className="w-10 h-10 bg-slate-600"></div>
              <div className="text-sm flex flex-col gap-2">
                <p className="font-bold">변호사</p>
                <p>{reply?.content}</p>
                <div className="text-xs flex flex-row gap-4 font-light">
                  <p>{reply?.modifiedDate}</p>
                  <p>삭제하기</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QnAByIdPage;
