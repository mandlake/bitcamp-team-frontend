"use client";

import { IUser } from "@/components/_model/user/user";
import { saveQuestions } from "@/components/_service/qna/qna.service";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const QnaBoardAddPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const accessToken = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectBoard, setSelectBoard] = useState({
    id: 1,
    law: "형법",
    title: "형사 사건",
    content: "어떡하죠?",
    writer: {
      id: decodedToken.id || 1,
    },
  });

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    console.log(accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        console.log(decodedToken);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  const submit = async () => {
    console.log(selectBoard);
    try {
      await dispatch(saveQuestions());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <div className=" border border-black w-[50vw] p-10">
          <div>
            <h1 className=" text-3xl border-b-2 p-4">법률상담 질문하기</h1>
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <p className="text-xl">제목</p>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
              onChange={(event: any) =>
                setSelectBoard({
                  ...selectBoard,
                  title: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <p className="text-xl">형법</p>
            <input
              type="text"
              placeholder="형법을 입력하세요."
              className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
              onChange={(event: any) =>
                setSelectBoard({
                  ...selectBoard,
                  law: event.target.value,
                })
              }
            />
          </div>
          <textarea
            placeholder="내용을 입력하세요."
            className=" mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                content: event.target.value,
              })
            }
          ></textarea>
          <input
            type="submit"
            value="제출하기"
            className="mt-4 bg-black text-white w-[45vw] h-[44px] rounded-xl"
            onClick={submit}
          />
        </div>
      </div>
    </>
  );
};

export default QnaBoardAddPage;
