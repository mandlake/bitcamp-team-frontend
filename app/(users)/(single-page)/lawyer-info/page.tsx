"use client";

import CancelPayment from "@/app/(payment)/cancel/[id]/page";
import Premium from "@/app/(premium)/premium/[id]/page";
import { ILawPayment } from "@/components/_model/lawpayment/lawpayment";
import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import {
  getLawyerById,
  getLawyerDetailById,
} from "@/components/_service/lawyer/lawyer.service";
import { findPremiumById } from "@/components/_service/premium/premium-service";
import { getLawPaymentByLawyerId } from "@/components/_service/lawpayment/lawpayment-service";
import { userURL } from "@/components/common/url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserId from "@/components/hooks/userId";

declare global {
  interface Window {
    daum?: any; // 지도 모듈
    IMP?: any; // 결제 모듈
  }
}

const LawyerSingleInfoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [lawyer, setLawyer] = useState({} as ILawyer);

  const [lawyerDetail, setLawyerDetail] = useState({} as ILawyerDetail);
  const [showCalendar, setShowCalendar] = useState(false);
  const accessToken: string = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([] as any[]); // 추가된 상태
  const [lawPayments, setLawPayments] = useState([] as ILawPayment[]);
  const [premiums, setPremiums] = useState([] as any[]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const lawyerId = parseInt(UserId() || "");

  const getLawyer = async () => {
    try {
      await dispatch(getLawyerById(decodedToken.id)).then((res: any) => {
        setLawyer(res.payload);
        const lawyerId = res.payload.id;
        dispatch(getLawPaymentByLawyerId(lawyerId)).then((buy: any) => {
          const lawPayments = Array.isArray(buy.payload)
            ? buy.payload
            : buy.payload
            ? [buy.payload]
            : [];
          console.log("lawPayment data: ", lawPayments);
          setLawPayments(lawPayments);
          getLawPaymentsAndPremiums(lawPayments);
          lawPayments.map((pay: any) => {
            console.log("lawPayment data: ", pay);
          });
        });
      });
    } catch (error) {
      console.error("Error fetching lawyer data:", error);
    }
  };
  const getLawyerDetail = async () => {
    await dispatch(getLawyerDetailById(parseCookies().id)).then((res: any) => {
      setLawyerDetail(res.payload);
    });
  };

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${userURL}/issues/notification/${decodedToken.id}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getLawPaymentsAndPremiums = async (payments: ILawPayment[]) => {
    const paymentsWithRelatedData = await Promise.all(
      payments.map(async (payment) => {
        const premium = payment.premium?.id
          ? await dispatch(findPremiumById(payment.premium.id)).then(
              (res: any) => res.payload
            )
          : null;
        const lawyer = payment.lawyer
          ? await dispatch(getLawyerById(payment.lawyer)).then(
              (res: any) => res.payload
            )
          : null;

        return { ...payment, premium, lawyer };
      })
    );
    setLawPayments(paymentsWithRelatedData);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setLawyerDetail({ ...lawyerDetail, address: data.address });
      },
    }).open();
  };

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        console.log(decodedToken);
        getLawyer();
        getLawyerDetail();
        getNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="flex flex-row relative">
        <div className="w-[390px]"></div>
        <div className="w-[390px] h-screen border-x border-[var(--color-Harbor-first)] p-5 items-center fixed top-0 bg-[var(--color-Harbor-firth)]">
          <div
            className="flex items-center justify-center text-[var(--color-Harbor-first)] font-bold text-[22px] cursor-pointer"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            LAWWMATE LOGO
          </div>
          <div className="flex flex-col items-center justify-center pt-12">
            <Image
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              width={180}
              height={180}
              alt="user-image"
              priority
              style={{ width: 180, height: 180 }}
              className="text-[var(--color-Harbor-first)]"
            />
            <p className=" text-[var(--color-Harbor-first)]/60 text-[22px]">
              {lawyer.email}
            </p>
          </div>
        </div>
        <div className="items-center p-20 gap-6 flex flex-col">
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">기본정보</p>
            <div className="flex flex-row items-center justify-center p-2">
              <Image
                src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                width={50}
                height={50}
                alt="user-image"
                style={{ width: 50, height: 50 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="w-[600px] px-2">
                <div className="flex flex-row justify-between items-center">
                  <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                    {lawyer.name}
                  </p>
                </div>
                <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                  {lawyer.email}
                </p>
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">비밀번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={lawyer.password}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, password: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={lawyer.phone}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, phone: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">Email</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={lawyer.email}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, email: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">세부정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">Birth</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="date"
                  id="birth"
                  name="birth"
                  placeholder="Birth"
                  value={lawyer.birth}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, birth: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">계좌</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="account"
                  name="account"
                  placeholder="Account"
                  value={lawyer.account}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, account: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">변호사 번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="lawyerNo"
                  name="lawyerNo"
                  placeholder="LawyerNo"
                  value={lawyer.lawyerNo}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, lawyerNo: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">대학</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="university"
                  name="university"
                  placeholder="University"
                  value={lawyerDetail.university}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      university: e.target.value,
                    })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">학과</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="major"
                  name="major"
                  placeholder="major"
                  value={lawyerDetail.major}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      major: e.target.value,
                    })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">소속 정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">소속</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="belong"
                  name="belong"
                  placeholder="belong"
                  value={lawyerDetail.belong}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      belong: e.target.value,
                    })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">주소</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="address"
                  id="address"
                  name="address"
                  placeholder="address"
                  value={lawyerDetail.address}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      address: e.target.value,
                    })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input
                  type="submit"
                  value="수정"
                  className="px-2"
                  onClick={openAddressSearch}
                />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <div className="flex flex-row w-[650px] justify-between items-center">
                <input
                  type="addressDetail"
                  id="addressDetail"
                  name="addressDetail"
                  placeholder="세부주소"
                  value={lawyerDetail.addressDetail}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      addressDetail: e.target.value,
                    })
                  }
                  className="w-[35vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화번호</p>
              <div className="flex flex-row w-[650px] justify-between items-center">
                <input
                  type="phone"
                  id="belongPhone"
                  name="belongPhone"
                  placeholder="belongPhone"
                  value={lawyerDetail.belongPhone}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      belongPhone: e.target.value,
                    })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">예약 정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">분야</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="law"
                  id="law"
                  name="law"
                  placeholder="law"
                  value={lawyerDetail.law}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      law: e.target.value,
                    })
                  }
                  className="w-[22vw] pl-2 h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">방문상담비용</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="visitCost"
                  id="visitCost"
                  name="visitCost"
                  placeholder="visitCost"
                  value={lawyerDetail.visitCost}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      visitCost: e.target.value,
                    })
                  }
                  className="w-[22vw] pl-2 h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화상담비용</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="phoneCost"
                  id="phoneCost"
                  name="phoneCost"
                  placeholder="phoneCost"
                  value={lawyerDetail.phoneCost}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      phoneCost: e.target.value,
                    })
                  }
                  className="w-[22vw] pl-2 h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">영상상담비용</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="videoCost"
                  id="videoCost"
                  name="videoCost"
                  placeholder="videoCost"
                  value={lawyerDetail.videoCost}
                  onChange={(e: any) =>
                    setLawyerDetail({
                      ...lawyerDetail,
                      videoCost: e.target.value,
                    })
                  }
                  className="w-[22vw] pl-2 h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div>
              <div className="flex flex-row w-[650px] items-center px-2">
                <p
                  className="w-[100px]"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  상담가능시간
                </p>
                <div className="flex flex-row w-[550px] justify-between items-center">
                  <input
                    type="time"
                    id="time"
                    name="time"
                    placeholder="time"
                    value={lawyerDetail.time}
                    onChange={(e: any) =>
                      setLawyerDetail({
                        ...lawyerDetail,
                        time: e.target.value,
                      })
                    }
                    className="w-[22vw] pl-2 h-[3vh] text-[14px] bg-white"
                  />
                  <input type="submit" value="수정" className="px-2" />
                </div>
              </div>
              <div
                className={`my-5 ${showCalendar ? "block" : "hidden"}`}
              ></div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">받은 상담 예약</p>
            <div className="flex flex-row w-full items-center border-b py-2">
              <div className="w-[150px]">예약 날짜</div>
              <div className="w-[150px]">예약 시간</div>
              <div className="w-[200px]">금액</div>
              <div className="w-[300px]">내용</div>
            </div>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-row w-full items-center border-b py-2"
                >
                  <div className="w-[150px]">{notification.date}</div>
                  <div className="w-[150px]">{notification.time}</div>
                  <div className="w-[200px]">{notification.title}</div>
                  <div className="w-[300px]">{notification.content}</div>
                </div>
              ))
            ) : (
              <p>예약 내역이 없습니다.</p>
            )}
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">프리미엄 구독 내역</p>
            <div>
              <div className="border-b py-2">
                <div className="flex flex-row gap-5">
                  <div className="flex items-center justify-center">
                    <p className="w-36">플랜</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="w-36">기간</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="w-36">가격</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="w-36">상태</p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                {Array.isArray(lawPayments) && lawPayments.length > 0 ? (
                  lawPayments.map((lawPayment: any) => (
                    <div key={lawPayment?.id} className="flex flex-row gap-5">
                      <div className="flex items-center justify-center">
                        <p className="w-36">
                          {lawPayment?.premium?.plan === "monthly"
                            ? "1개월 플랜"
                            : lawPayment?.premium?.plan === "quarterly"
                            ? "3개월 플랜"
                            : lawPayment?.premium?.plan === "annual"
                            ? "1년 플랜"
                            : lawPayment?.premium?.plan}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="w-36">
                          {new Date(lawPayment?.start_date).toLocaleDateString(
                            "ko-KR"
                          )}
                          부터
                          {new Date(lawPayment?.expire_date).toLocaleDateString(
                            "ko-KR"
                          )}
                          까지
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="w-36">{lawPayment?.amount} 원</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="w-36">
                          {(() => {
                            if (
                              lawPayment?.is_expired !== undefined &&
                              lawPayment?.is_expired !== null
                            ) {
                              return lawPayment.is_expired;
                            }

                            const currentDate = new Date();
                            const expireDate = new Date(
                              lawPayment?.expire_date
                            );

                            // 남은 일수 계산
                            const timeDifference =
                              expireDate.getTime() - currentDate.getTime();
                            const daysRemaining = Math.ceil(
                              timeDifference / (1000 * 3600 * 24)
                            );

                            return daysRemaining > 0 ? "enabled" : "expired";
                          })()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>구독 내역이 없습니다.</p>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full">
              <p className="text-[var(--color-Harbor-sec)] w-[583px] justify-between items-center">
                프리미엄 상품을 결제하여 다양한 혜택을 누리실 수 있습니다.
              </p>
              <button
                onClick={openModal}
                className="text-white bg-[var(--color-Harbor-first)] p-2 border border-[var(--color-Harbor-sec)] rounded-xl hover:bg-white hover:text-[var(--color-Harbor-sec)] text-sm"
              >
                구독하기
              </button>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-5 w-[694px]">
                <button
                  onClick={closeModal}
                  className="text-right text-xl font-bold mb-4"
                >
                  &times;
                </button>
                <Premium lawyerId={lawyer.id} />
              </div>
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default LawyerSingleInfoPage;
