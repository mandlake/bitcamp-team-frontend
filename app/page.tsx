"use client";

import { useRef, useState } from "react";
import "animate.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { saveChat, temp } from "@/components/_service/chat/chat.service";
import { useDispatch } from "react-redux";
import { IChat } from "@/components/_model/chat/chat";
import { ExplainLawmatePage } from "./(main)/explain.page";
import { LongLeftArrow, LongRightArrow } from "@/components/common/next.icons";
import { RecommendedLawyerPage } from "./(main)/recommendLawyer.page";
import IssueForm from "@/components/modules/issue/NewIssueForm";
import IssueList from "@/components/modules/issue/IssueList";
import axios from "axios";
import { mainURL, userURL } from "@/components/common/url";

export interface chatting {
  sender: string;
  text: any;
}

export default function Home(props: any) {
  const [message, setMessages] = useState<chatting[]>([]);
  const [next, setNext] = useState(0);
  const [chatted, setChatted] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IChat>();
  const lawTerms = [
    "형사법",
    "공법",
    "국제법",
    "국제거래법",
    "노동법",
    "조세법",
    "지적재산권법",
    "민사법",
    "경제법",
    "환경법",
  ];

  const onSubmit = async ({ question }: any) => {
    const message = question;
    // 유저 메시지를 상태에 추가
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setChatted(true);
    console.log(message);

    try {
      // 서버에 첫 번째 요청 보내기
      const response = await axios.post(
        "https://6dcf-125-131-113-53.ngrok-free.app/v1/chat/completions",
        {
          model: "llm",
          messages: [{ role: "user", content: message }],
          temperature: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 챗봇 응답을 상태에 추가
      const botMessage = response.data.choices[0].message.content;
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);

      // 추가 요청 보내기
      const additionalResponse = await axios.post(
        "https://6dcf-125-131-113-53.ngrok-free.app/v1/chat/completions",
        {
          model: "classifier",
          messages: [{ role: "user", content: botMessage }],
          temperature: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 추가 요청의 content 부분만 출력
      const additionalContent =
        additionalResponse.data.choices[0].message.content;
      console.log(additionalContent);

      // 특정 단어가 포함되어 있는지 확인
      const containsLawTerm = lawTerms.some((term) =>
        additionalContent.includes(term)
      );
      if (containsLawTerm) {
        // 특정 단어가 포함된 경우 추가 API 요청
        const apiResponse = await axios.get(
          mainURL +
            `/lawyers/law?law=${lawTerms.find((term) =>
              additionalContent.includes(term)
            )}`
        );

        // 응답에서 id와 name 출력
        apiResponse.data.forEach((lawyer: any) => {
          console.log(`id: ${lawyer.id}, name: ${lawyer.name}`);
        });
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error while sending message:", error);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { sender: "bot", text: "응답을 받을 수 없습니다. 다시 시도해 주세요." },
      ]);
    }
  };

  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTo({
        top:
          chatContainerRef.current.scrollHeight +
          chatContainerRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col w-full h-screen justify-center items-center relative gap-7 bg-[var(--color-Harbor-firth)]`}
      >
        {chatted ? (
          <div
            className="w-[1400px] flex flex-col h-4/5 overflow-auto gap-5 rounded-md p-5"
            ref={chatContainerRef}
          >
            {message?.map((msg: any, index: any) => (
              <div key={index} className="gap-5">
                <strong>{msg.sender === "user" ? "유저" : "챗봇"}: </strong>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        ) : next === 0 ? (
          <div className="flex flex-col h-5/6 justify-center">
            <p className=" text-[40px]">How Can I Help You Today ?</p>
            <div className="flex flex-col items-center mt-9 animate-bounce-left">
              <LongRightArrow
                onClick={() => {
                  setNext(1);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row h-5/6 justify-center items-center">
            <div className={`flex flex-row items-center justify-center mr-9`}>
              <LongLeftArrow
                onClick={() => {
                  setNext(next - 1);
                }}
              />
            </div>
            {next === 1 && <ExplainLawmatePage />}
            {next === 2 && <RecommendedLawyerPage />}
            <div
              className={`flex flex-row items-center justify-center ml-9 ${
                next === 2 ? "invisible" : "visible"
              }`}
            >
              <LongRightArrow
                onClick={() => {
                  setNext(next + 1);
                }}
              />
            </div>
          </div>
        )}
        <div className="relative flex flex-row bg-[var(--color-Harbor-first)] rounded-2xl text-center">
          <div className="h-[40px] w-[40px] flex items-center justify-center rounded-s-2xl">
            <Image
              src="https://img.icons8.com/?size=100&id=ImjYcOBJm9o4&format=png&color=FFFFFF"
              alt="send"
              width={23}
              height={23}
              className="object-cover"
            />
          </div>
          <input
            type="text"
            className="bg-[var(--color-Harbor-first)] w-[1000px] h-[40px] text-[var(--color-Harbor-firth)] px-8 py-3 rounded-e-2xl outline-none"
            {...register("question", { required: "메시지를 입력해주세요." })}
            autoFocus
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                scrollToBottom();
              }
            }}
          />
          <button
            type="submit"
            onClick={() => {
              scrollToBottom();
            }}
            className="absolute top-1 right-1 w-[30px] h-[30px] flex items-center bg-[var(--color-Harbor-sec)] justify-center text-center rounded-2xl"
          >
            <Image
              src="https://img.icons8.com/?size=100&id=2837&format=png&color=FFFFFF"
              alt="send"
              width={23}
              height={23}
              className="object-cover"
            />
          </button>
        </div>
      </form>
    </>
  );
}
