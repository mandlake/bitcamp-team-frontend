"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { getPremiumById } from "@/components/_service/premium/premium-slice";
import { IUser } from "@/components/_model/user/user";
import { IPremium } from "@/components/_model/premium/premium";
import { ILawPayment } from "@/components/_model/lawpayment/lawpayment";
import { saveLawPayment } from "@/components/_service/lawpayment/lawpayment-service";
import UserId from "@/components/hooks/userId";
import { getUserById } from "@/components/_service/user/user.service";
import { userURL } from "@/components/common/url";

declare global {
  interface Window {
    IMP?: any;
  }
}

export default function Premium(props: any) {
  const { lawyerId } = props;
  const dispatch = useDispatch();
  const [premiums, setPremiums] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [plan, setPlan] = useState<string>("");
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const user: IUser = useSelector(getUserById);
  const premium: IPremium = useSelector(getPremiumById);
  const token = parseCookies().accessToken;
  const [transactions, setTransactions] = useState<any[]>([]);
  const userId = parseInt(UserId() || "");
  const [impUid, setImpUid] = useState<string | null>(null);

  useEffect(() => {
    const loadPremiums = async () => {
      try {
        const response = await axios.get(`${userURL}/premium/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setPremiums(response.data);
        } else {
          console.error("Premiums data is not an array", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch premiums", error);
      }
    };

    loadPremiums();
  }, [token]);

  const requestPay = async (premiumId: number, premiumPrice: number) => {
    setPrice(premiumPrice);
    setPlan(premiums.find((premium) => premium.id === premiumId)?.plan || "");
    const confirmMessage = `결제할 금액은 ${premiumPrice}원 입니다. 계속 진행하시겠습니까?`;
    const isConfirmed = window.confirm(confirmMessage);
    window.IMP.init("imp78717406");
    if (!window.IMP) {
      console.error("IMP is not loaded");
      return;
    }

    if (isConfirmed) {
      window.IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          orderUid: new Date().getTime().toString(),
          name: "프리미엄 플랜",
          amount: premiumPrice,
          lawyer: lawyerId,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            setImpUid(rsp.imp_uid);

            // 서버로 결제 데이터 전송
            const paymentData: ILawPayment = {
              impUid: rsp.imp_uid,
              status: "OK",
              premium: {
                id: premiumId || 0,
              },
              amount: premiumPrice,
              lawyer: lawyerId,
            };

            dispatch(saveLawPayment(paymentData));
            const { data } = await axios.post(
              `${userURL}/law/payments/verifyIamport/${rsp.imp_uid}`,
              rsp,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setTransactions([
              ...transactions,
              {
                id: rsp.imp_uid,
                price: premiumPrice,
                date: new Date().toLocaleString(),
              },
            ]);
          } else {
            console.log("Payment failed", rsp.error_msg);
            confirm("결제가 실패했습니다.");
          }
        }
      );
    } else {
      // 사용자가 확인하지 않은 경우 처리
      console.log("결제가 취소되었습니다.");
    }
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const loadScript = (src: any, callback: any) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };
    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        const IMP = window.IMP;
        document.addEventListener("DOMContentLoaded", () => {
          const imp_uid = "O" + new Date().getTime();
          const totalPriceElement = document.getElementById("totalPrice");
          const totalPrice = totalPriceElement
            ? totalPriceElement.innerText
            : "";
          fetch(`${userURL}/law/payments/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imp_uid: imp_uid,
              price: totalPrice,
            }),
          });
        });
      });
    });
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="w-[694px] p-1">
      <p className="text-[var(--color-Harbor-sec)] text-xl">프리미엄 결제</p>
      <p className="text-[var(--color-Harbor-sec)] text-sm">
        <br />
        변호사 인증 뱃지, 변호사 리스트 상단 노출, 인공지능 채팅을 통한
        변호사 추천 혜택을 제공합니다.<br />
        지금 바로 프리미엄 상품을 결제하고, 더 많은 고객과 만나보세요!
      </p>
      <div className="w-[650px] items-center px-2 text-center">
        <div>
          <div className="grid grid-cols-3 gird-row-2 justify-center gap-5 mt-5">
            {premiums.length === 0 ? (
              <p className="mt-10 ">상품이 존재하지 않습니다.</p>
            ) : (
              premiums.map((premium) => (
                <div
                  key={premium.id}
                  className="border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-10 w-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <p className="text-lg text-[var(--color-Harbor-sec)]">
                    {" "}
                    {premium.plan === "monthly"
                      ? "1개월 플랜"
                      : premium.plan === "quarterly"
                      ? "3개월 플랜"
                      : premium.plan === "annual"
                      ? "1년 플랜"
                      : premium.plan}
                  </p>
                  <p className="text-[var(--color-Harbor-sec)]">{premium.price} 원</p>
                  <button
                    className="mt-2 text-white bg-[var(--color-Harbor-first)] p-2 border border-[var(--color-Harbor-sec)] rounded-xl hover:bg-white hover:text-[var(--color-Harbor-sec)] text-sm"
                    onClick={() => requestPay(premium.id, premium.price)}
                  >
                    결제하기
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
