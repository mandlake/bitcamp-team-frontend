"use client";

import IssuePage from "@/app/(issue)/issue/[id]/page";
import Payment from "@/app/(payment)/payment/[id]/page";
import Product from "@/app/(product)/products/[id]/page";
import UserId from "@/components/hooks/userId";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LawyerByIdPage = (props: any) => {
  const router = useRouter();
  const userId = UserId();
  const lawyerId = props.params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpen, setSelectedOpen] = useState({
    consultationType: false,
    date: false,
    time: false,
  });
  const [selectedConsultationType, setSelectedConsultationType] = useState({
    point: false,
    consultation: false,
    alert: false,
  });

  const consultingButton = (
    <>
      <button className="bg-[var(--color-Harbor-first)] text-[var(--color-Harbor-firth)] h-[5vh] w-[22vw]">
        결제하기
      </button>
      <div className="flex flex-col gap-3">
        {userId ? <p>User {userId}</p> : <p>Loading...</p>}
        <h1
          onClick={() =>
            setSelectedConsultationType({
              ...selectedConsultationType,
              point: !selectedConsultationType.point,
            })
          }
        >
          포인트 충전
        </h1>
        {selectedConsultationType.point && <Payment lawyerId={lawyerId} />}
        <h1
          onClick={() =>
            setSelectedConsultationType({
              ...selectedConsultationType,
              consultation: !selectedConsultationType.consultation,
            })
          }
        >
          상담 결제
        </h1>
        {selectedConsultationType.consultation && (
          <Product lawyerId={lawyerId} />
        )}
        <h1
          onClick={() =>
            setSelectedConsultationType({
              ...selectedConsultationType,
              alert: !selectedConsultationType.alert,
            })
          }
        >
          사건 알림
        </h1>
        {selectedConsultationType.alert && <IssuePage lawyerId={lawyerId} />}
        <br />
      </div>
    </>
  );

  const lawyerPageButton = (
    <>
      <button
        className="bg-[var(--color-Harbor-first)] text-[var(--color-Harbor-firth)] h-[5vh] w-[22vw]"
        onClick={() => window.location.replace(`/lawyers`)}
      >
        변호사 페이지로 돌아가기
      </button>
    </>
  );

  return (
    <>
      <div className="w-[1400px] relative">
        <div className="w-[850px] mt-40 p-10">
          <h1 className="text-5xl leading-relaxed font-bold pb-20">
            많은 사건 경험과 노하우를 가진 든든한 조력자
          </h1>
          <div className="h-[240px] flex flex-row justify-between w-[723px] border-b">
            <div className="">
              <p className="font-bold text-lg">{props.params.id} 변호사</p>
              <div className="my-2">예약 준수율</div>
              <div className="py-5">
                <p className="font-semibold">회사이름</p>
                <p className="font-normal">회사 주소</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-semibold">사무실 전화</p>
                <p>010-2345-6789</p>
              </div>
            </div>
            <div className="w-[360px] flex flex-col gap-2">
              <div>
                <p>분야</p>
              </div>
              <div>
                <p>경력</p>
              </div>
              <div>
                <p>자격</p>
              </div>
              <div>
                <p>학력</p>
              </div>
              <div>
                <p>가격</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[498px] absolute top-0 right-10 py-[16px]">
          <div className="h-[14vh] bg-[var(--color-Harbor-first)] text-[var(--color-Harbor-firth)] p-9 py-7 rounded-t-xl">
            <div className="flex flex-col gap-2">
              <p className=" text-3xl font-bold">{props.params.id} 변호사</p>
              <p className=" text-lg">{props.params.id} 회사</p>
            </div>
          </div>
          <div className="h-[58vh] items-center flex justify-center z-20">
            사진
          </div>
          <div className="rounded-xl shadow-2xl fixed bottom-5 p-5 flex flex-col items-center gap-3 bg-white z-40">
            {isModalOpen ? (
              <>
                <div className="flex flex-col justify-center">
                  <div
                    className="h-[5vh] w-[22vw] flex flex-row justify-between gap-2 p-3 px-5 border-b"
                    onClick={() =>
                      setSelectedOpen({
                        ...selectedOpen,
                        consultationType: !selectedOpen.consultationType,
                      })
                    }
                  >
                    <p>상담 종류 선택</p>
                    <Image
                      src={
                        selectedOpen.consultationType
                          ? "https://img.icons8.com/?size=100&id=86235&format=png&color=1A1A1A"
                          : "https://img.icons8.com/?size=100&id=85327&format=png&color=1A1A1A"
                      }
                      width={20}
                      height={20}
                      alt="arrow-right"
                      className="z-20"
                    />
                  </div>
                  {selectedOpen.consultationType && (
                    <>
                      <div className="flex flex-row p-2 text-sm gap-2">
                        <button className="p-3 rounded-lg border">
                          15분 전화 상담
                        </button>
                        <button className="p-3 rounded-lg border">
                          20분 영상 상담
                        </button>
                        <button className="p-3 rounded-lg border">
                          30분 방문 상담
                        </button>
                      </div>
                    </>
                  )}
                  <div
                    className="h-[5vh] w-[22vw] flex flex-row justify-between gap-2 p-3 px-5 border-b"
                    onClick={() =>
                      setSelectedOpen({
                        ...selectedOpen,
                        date: !selectedOpen.date,
                      })
                    }
                  >
                    <p>날짜 선택</p>
                    <Image
                      src={
                        selectedOpen.date
                          ? "https://img.icons8.com/?size=100&id=86235&format=png&color=1A1A1A"
                          : "https://img.icons8.com/?size=100&id=85327&format=png&color=1A1A1A"
                      }
                      width={20}
                      height={20}
                      alt="arrow-right"
                      className="z-20"
                    />
                  </div>
                  {selectedOpen.date && (
                    <>
                      <div className="flex flex-row p-2 text-sm gap-2">
                        <button className="p-3 rounded-lg border">
                          15분 전화 상담
                        </button>
                        <button className="p-3 rounded-lg border">
                          20분 영상 상담
                        </button>
                        <button className="p-3 rounded-lg border">
                          30분 방문 상담
                        </button>
                      </div>
                    </>
                  )}
                  <div
                    className="h-[5vh] w-[22vw] flex flex-row justify-between gap-2 p-3 px-5 border-b"
                    onClick={() =>
                      setSelectedOpen({
                        ...selectedOpen,
                        time: !selectedOpen.time,
                      })
                    }
                  >
                    <p>시간 선택</p>
                    <Image
                      src={
                        selectedOpen.time
                          ? "https://img.icons8.com/?size=100&id=86235&format=png&color=1A1A1A"
                          : "https://img.icons8.com/?size=100&id=85327&format=png&color=1A1A1A"
                      }
                      width={20}
                      height={20}
                      alt="arrow-right"
                      className="z-20"
                    />
                  </div>
                  {selectedOpen.time && (
                    <>
                      <div className="flex flex-row p-2 text-sm gap-2">
                        <button className="p-3 rounded-lg border">
                          15분 전화 상담
                        </button>
                        <button className="p-3 rounded-lg border">
                          20분 영상 상담
                        </button>
                        <button className="p-3 rounded-lg border">
                          30분 방문 상담
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-row justify-center">
                <div className="flex flex-col gap-2 items-center p-3 px-5 border-r">
                  <p>15분 전화 상담</p>
                  <p>10000원</p>
                </div>
                <div className="flex flex-col gap-2 items-center p-3 px-5 border-r">
                  <p>20분 영상 상담</p>
                  <p>20000원</p>
                </div>
                <div className="flex flex-col gap-2 items-center p-3 px-5">
                  <p>30분 방문 상담</p>
                  <p>30000원</p>
                </div>
              </div>
            )}
            {isModalOpen && consultingButton}
            <button
              className="bg-[var(--color-Harbor-first)] text-[var(--color-Harbor-firth)] h-[5vh] w-[22vw] mx-2"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {isModalOpen ? "이전으로 돌아가기" : "상담 예약하기"}
            </button>
            {!isModalOpen && lawyerPageButton}
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerByIdPage;
