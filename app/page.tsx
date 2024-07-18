"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "animate.css";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { saveChat } from "@/components/_service/chat/chat.service";
import { useDispatch } from "react-redux";
import { IChat } from "@/components/_model/chat/chat";

export default function Home(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    question: "",
    answer: "How Can I Help You Today ?",
  } as IChat);
  const [next, setNext] = useState(0);
  const [chatted, setChatted] = useState(false);
  const [chat, setChat] = useState<IChat[]>([]);
  const {
    register,
    handleSubmit,
    watch,
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
        })
        .then(() => {
          setChat([...chat, message]);
          console.log(chat);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col w-full h-screen justify-center items-center relative bg-[var(--color-Harbor-firth)]`}
      >
        {chatted ? (
          <div className="flex flex-col h-5/6 justify-center">
            {chat?.map((item, index) => (
              <div key={index}>
                <div className=" text-[40px]">{item.question}</div>
                <div className=" text-[40px]">{item.answer}</div>
              </div>
            ))}
          </div>
        ) : next === 1 ? (
          <div className="flex flex-col h-5/6 justify-center">
            <div className="h-[300px] border-[var(--color-Harbor-sec)] border-y-2 text-[var(--color-Harbor-first)] w-[60vw] py-5 flex flex-row gap-[2vw]">
              <section className="flex flex-col items-baseline border-r">
                <h2 className=" text-[18px] mx-8 mb-2 font-semibold w-[25vw]">
                  Lawmate의 주요 특징
                </h2>
                <ul className="text-[15px] flex flex-col gap-2">
                  <li>
                    <div className=" font-semibold">
                      인공지능 기술 기반 맞춤형 법률 서비스
                    </div>
                    <div>
                      개인의 상황과 문제에 맞는 최적의 해결책을 제시합니다.
                    </div>
                  </li>
                  <li>
                    <div className=" font-semibold">
                      엄선된 전문 변호사 네트워크
                    </div>
                    <div>풍부한 경험과 전문성을 갖춘 변호사와 빠르게 연결</div>
                  </li>
                  <li>
                    <div className=" font-semibold">합리적인 비용</div>
                    <div>
                      투명한 비용 체계로 예상치 못한 부담 없이 이용 가능
                    </div>
                  </li>
                  <li>
                    <div className=" font-semibold">안전하고 보안</div>
                    <div>
                      엄격한 정보 보호 정책으로 개인정보 안전을 최우선으로
                    </div>
                  </li>
                </ul>
              </section>

              <section className="flex flex-col items-baseline">
                <h2 className=" text-[18px] mx-8 mb-2 font-semibold w-[25vw]">
                  Lawmate를 사용하면 무엇을 얻을 수 있을까요?
                </h2>
                <ul className=" text-[var(--color-Harbor-sec)]">
                  <li>- 시간과 비용 절약</li>
                  <li>- 보다 정확하고 효율적인 법률 서비스 제공</li>
                  <li>- 법률 문제 해결에 대한 스트레스 감소</li>
                </ul>
              </section>
            </div>
            <div className="flex flex-row items-center justify-center mt-9">
              <Image
                src="https://img.icons8.com/?size=100&id=99996&format=png&color=000000"
                alt="send"
                width={23}
                height={23}
                className="object-cover"
                onClick={() => {
                  setNext(0);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-5/6 justify-center">
            <p className=" text-[40px]">How Can I Help You Today ?</p>
            <div className="flex flex-col items-center mt-9 animate-bounce-left">
              <Image
                src="https://img.icons8.com/?size=100&id=15816&format=png&color=000000"
                alt="send"
                width={23}
                height={23}
                className="object-cover"
                onClick={() => {
                  setNext(1);
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
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit)();
              }
            }}
          />
          <button
            type="submit"
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
