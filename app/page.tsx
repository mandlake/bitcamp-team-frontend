"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "animate.css";
import Image from "next/image";
import LawLawPage from "./(page)/lawlaw/page";

export default function Home(props: any) {
  const router = useRouter();
  const [isOpenLawLaw, setIsOpenLawLaw] = useState(false);

  useEffect(() => {
    if (isOpenLawLaw) {
      console.log("isOpenLawLaw", isOpenLawLaw);
    } else {
      console.log("isOpenLawLaw", isOpenLawLaw);
    }
  }, [isOpenLawLaw]);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen relative`}
      >
        <div className="h-[20vh] w-[60vw] text-[var(--color-Harbor-first)]">
          <p className=" text-[18px] mx-8 font-semibold">
            추후 로고 이미지 삽입 예정
          </p>
        </div>
        <div className="h-[30vh] border-[var(--color-Harbor-sec)] border-y-2 text-[var(--color-Harbor-first)] w-[60vw] py-5 flex flex-row gap-[2vw]">
          <section className="flex flex-col items-baseline border-r">
            <h2 className=" text-[18px] mx-8 mb-2 font-semibold w-[25vw]">
              Lawmate의 주요 특징
            </h2>
            <ul className="text-[15px] flex flex-col gap-2">
              <li>
                <div className=" font-semibold">
                  인공지능 기술 기반 맞춤형 법률 서비스
                </div>
                <div>개인의 상황과 문제에 맞는 최적의 해결책을 제시합니다.</div>
              </li>
              <li>
                <div className=" font-semibold">
                  엄선된 전문 변호사 네트워크
                </div>
                <div>풍부한 경험과 전문성을 갖춘 변호사와 빠르게 연결</div>
              </li>
              <li>
                <div className=" font-semibold">합리적인 비용</div>
                <div>투명한 비용 체계로 예상치 못한 부담 없이 이용 가능</div>
              </li>
              <li>
                <div className=" font-semibold">안전하고 보안</div>
                <div>엄격한 정보 보호 정책으로 개인정보 안전을 최우선으로</div>
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
        <div className="h-[32vh] w-[60vw] text-[var(--color-Harbor-first)] flex flex-col gap-5 py-3">
          <p className=" text-[18px] mx-8 font-semibold">추천 변호사</p>
          <div className="h-[181px] animate__animated animate__fadeInRight animate__slow ease-in flex flex-wrap items-center justify-center gap-7">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className=" border border-[var(--color-Harbor-sec)] text-[var(--color-Harbor-first)] items-center flex flex-col py-5 px-3"
              >
                <div className="w-[120px] h-[130px] mb-3">
                  <Image
                    src="https://mblogthumb-phinf.pstatic.net/MjAyMTA1MjlfNzYg/MDAxNjIyMjE1MjMwOTk5.TSOSi5EAsh3MX9bdN3W9ugQyjSBYV_I0jMkcLwN9Wkwg.6KIRElwl9bBEUu-Br1UmWMMb0Fuku_CIFNb64SttOHkg.JPEG.acttosun08/IMAGE%EF%BC%BF2020%EF%BC%BF09%EF%BC%BF18%EF%BC%BF06%EF%BC%BF09%EF%BC%BF35.jpg?type=w800"
                    width={140}
                    height={160}
                    alt="lawyer-image"
                  />
                </div>
                <div className="w-[155px] flex flex-col gap-2">
                  <h1 className="text-[15px] font-semibold">진보라 변호사</h1>
                  <div className="text-[13px] flex gap-2">
                    <div>#성매매알선</div>
                    <div>#장부단속</div>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={() => router.push("/lawyers/all")}>
              <Image
                src="https://img.icons8.com/?size=100&id=45286&format=png&color=000000"
                width={22}
                height={22}
                alt="arrow-right"
              />
            </div>
          </div>
        </div>
        <LawLawPage isOpenLawLaw={isOpenLawLaw} />
        <div
          className="h-[5vw] w-[5vw] bg-slate-600 fixed bottom-10 right-20 rounded-full"
          onClick={() => setIsOpenLawLaw(!isOpenLawLaw)}
        ></div>
      </div>
    </>
  );
}
