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

export default function Home(props: any) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    question: "",
    answer:
      "화장품을 제조하여 판매하려는 자는 식품의약품안전처장에게 “화장품제조업” 및 “화장품책임판매업” 등록을 해야 합니다. 화장품제조업 등록을 하려면 일정한 시설기준을 갖춰야 하고, 화장품책임판매업 등록을 하려면 품질관리기준, 책임판매 후 안전관리기준 및 책임판매관리자에 관한 기준을 갖춰야 합니다.",
  } as IChat);
  const [next, setNext] = useState(0);
  const [chatted, setChatted] = useState(false);
  const [chat, setChat] = useState<IChat[]>([]);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IChat>();

  const onSubmit = async (data: IChat) => {
    setMessage({ ...message, question: data.question });
    console.log("입력된 값 : " + JSON.stringify(data));
    try {
      await dispatch(saveChat(message))
        .then((res: any) => {
          console.log(res);
          setMessage({ ...message, answer: res.payload.answer });
          setChatted(true);
          scrollToBottom();
        })
        .then(() => {
          setChat([...chat, message]);
          console.log(chat);
          scrollToBottom();
        });
    } catch (error) {
      console.log(error);
    } finally {
      resetField("question");
    }
  };

  const handleLawLaw = async () => {
    await dispatch(temp(message.question)).then((res: any) => {
      console.log(res);
    });
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
            {chat?.map((item, index) => (
              <div key={index} className="gap-5">
                <div className="text-[40px] rounded-3xl odd:text-right">
                  {item.question}
                </div>
                <div className="text-[40px] rounded-3xl">{item.answer}</div>
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
            {...register("question")}
            autoFocus
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit)();
                scrollToBottom();
              }
            }}
          />
          <button
            type="submit"
            onClick={() => {
              handleSubmit(onSubmit)();
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
