"use client";

import { ILawyerReply } from "@/components/_model/lawyer/lawyer";
import { deleteReply } from "@/components/_service/lawyer/lawyer.service";
import {
  findQnaBoardById,
  findReplyByArticleId,
  saveReply,
} from "@/components/_service/qna/qna.service";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const QnAByIdPage = (props: any) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([] as any);

  const accessToken: string = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [question, setQuestion] = useState({} as any);
  const [reply, setReply] = useState([] as any);
  const [answer, setAnswer] = useState({
    reply: {
      lawyerId: decodedToken.id,
      articleId: props.params.id,
    } as ILawyerReply,
  });

  const [roles, setRole] = useState("");

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

  const handleSendReply = async () => {
    if (decodedToken.id === undefined) {
      alert("only lawyer can reply here");
      return;
    }
    try {
      await dispatch(saveReply(answer.reply)).then((res: any) => {
        console.log(res);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReply = async (id: any) => {
    if (decodedToken.id === undefined) {
      alert("only lawyer can reply here");
      return;
    }
    try {
      await dispatch(deleteReply(id)).then((res: any) => {
        console.log(res);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleQuestion();
    handleReply();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        console.log("decoded된 token이 존재합니다.");
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col p-20 gap-10 border-b">
          <h1 className="font-bold text-4xl">{question.title}</h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>{question.writer || "박주하"}</p>
              <div>
                <p>{question.regDate || "2024-08-10"}</p>
              </div>
            </div>
          </div>
          <p
            className="font-light text-lg"
            dangerouslySetInnerHTML={{ __html: question.content }}
          ></p>
          <div className="flex flex-row gap-2 text-sm">
            <p>조회수 0</p>
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
          <div className="p-5 flex flex-col gap-5">
            {reply?.map((item: any, key: any) => (
              <div key={key} className="flex flex-row gap-5 items-start">
                <div className="w-10 h-10 bg-slate-600"></div>
                <div className="text-sm flex flex-col gap-2">
                  <p className="font-bold">김호주</p>
                  <p>{item.content}</p>
                  <div className="text-xs flex flex-row gap-4 font-light">
                    <p>{item.modifiedDate}</p>
                    <p onClick={() => handleDeleteReply(item.id)}>삭제하기</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border rounded-2xl p-8 w-full mt-10">
              <p>{decodedToken.name || "댓글"}</p>
              <textarea
                placeholder="내용을 입력하세요."
                className=" mt-4 px-4 focus:outline-none w-full"
                onChange={(event: any) =>
                  setAnswer({
                    ...answer,
                    reply: {
                      ...answer.reply,
                      content: event.target.value,
                      lawyerId: decodedToken.id,
                    },
                  })
                }
              ></textarea>
              <div
                className="flex items-end justify-end"
                onClick={handleSendReply}
              >
                <p>등록</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QnAByIdPage;
