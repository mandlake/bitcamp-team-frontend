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
import CancelPayment from "@/app/(payment)/cancel/[id]/page";

declare global {
  interface Window {
    IMP?: any;
  }
}

export default function Premium(props: any) {
  const { lawyerId } = props;
  const dispatch = useDispatch();
  const [premiums, setPremiums] = useState<any[]>([]);
  const [selectedPremiumId, setSelectedPremiumId] = useState<number | null>(
    null
  );
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

  const requestPay = async (premiumPrice: number) => {
    setPrice(premiumPrice);
    const confirmMessage = `결제할 금액은 ${premiumPrice}원 입니다. 계속 진행하시겠습니까?`;
    const isConfirmed = window.confirm(confirmMessage);
    window.IMP.init("imp78717406");
    if (!window.IMP) {
      console.error("IMP is not loaded");
      return;
    }

    if (isConfirmed) {
      window.IMP.init("imp78717406");
      if (!window.IMP) {
        console.error("IMP is not loaded");
        return;
      }

      window.IMP.request_pay(
        {
          id: userId,
          pg: "html5_inicis",
          pay_method: "card",
          orderUid: new Date().getTime().toString(),
          amount: price,
          lawyer: lawyerId,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            const impUid = rsp.imp_uid;

            // 서버로 결제 데이터 전송
            const paymentData: ILawPayment = {
              impUid: impUid,
              status: "OK",
              premium: {
                id: selectedPremiumId || 0,
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

  const handlePremiumSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPremiumId = Number(event.target.value);
    console.log("선택한 상품 id: " + selectedPremiumId);
    const selectedPremium = premiums.find(
      (premium) => premium.id === selectedPremiumId
    );
    if (selectedPremium) {
      setSelectedPremiumId(selectedPremiumId);
      setPrice(selectedPremium.price);
      setPlan(selectedPremium.plan);
    }
  };

  const handlePointUsage = async () => {
    if (selectedPremiumId === null || selectedPremiumId === 0) {
      alert("포인트 결제를 진행할 제품을 선택해주세요.");
      return;
    }

    // const impUid = await getImpUid();
    const impUid = "imp_157435462997";

    if (!impUid) {
      alert("impUid를 가져오는 데 실패했습니다.");
      return;
    }
  };

  // 예시: impUid를 가져오는 함수 (구체적인 구현은 상황에 따라 다릅니다)
  const getImpUid = async () => {
    try {
      // 여기에 impUid를 생성하거나 가져오는 로직을 추가하세요
      // 예시: API 호출 또는 다른 로직을 통해 impUid를 가져옴
      const response = await axios.get(
        `${userURL}/some-endpoint-to-get-impUid`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.impUid;
    } catch (error) {
      console.error("impUid를 가져오는 중 오류 발생:", error);
      return null;
    }
  };

  return (
    <div>
      <div className="flex justify-start gap-5">
        {premiums.length === 0 ? (
          <p className="mt-10 ">상품이 존재하지 않습니다.</p>
        ) : (
          premiums.map((premium) => (
            <label
              key={premium.id}
              className="border border-gray-300 rounded-2xl py-2 px-4 w-full"
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <input
                type="radio"
                name="premium"
                value={premium.id}
                onChange={handlePremiumSelect}
                className="h-3 w-3 cursor-pointer"
              />
              <br />
              {premium.plan} <br />
              {premium.price} 포인트
            </label>
          ))
        )}
      </div>
      <br />
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          className="border border-gray-300 rounded-2xl py-2 px-4"
          onClick={() => requestPay(price)}
        >
          결제
        </button>
        <button
          className="border border-gray-300 rounded-2xl py-2 px-4"
          onClick={handlePointUsage}
        >
          포인트로 결제
        </button>
        <CancelPayment />
      </div>
    </div>
  );
}
