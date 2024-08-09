"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { IUser } from "@/components/_model/user/user";
import { getUserById } from "@/components/_service/user/user.service";
import { userURL } from "@/components/common/url";
import { IPayment } from "@/components/_model/payment/payment";
import UserId from "@/components/hooks/userId";
import { savePayment } from "@/components/_service/payment/payment-service";

declare global {
  interface Window {
    IMP?: any;
  }
}

export default function Payment({ params }: any) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;
  const [uid, setUid] = useState<string>("");
  // const lawyerId = params.lawyerId;

  const userId = parseInt(UserId() || "");
  const requestPay = async (amount: number) => {
    const confirmMessage = `결제할 금액은 ${amount}원 입니다. 계속 진행하시겠습니까?`;
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
          pg: "html5_inicis",
          pay_method: "card",
          orderUid: new Date().getTime().toString(),
          name: "포인트",
          amount: amount,
          buyer: {id: userId},
          buyer_name: user.name,
          buyer_tel: user.phone,
          buyer_email: user.email
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            setUid(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            // 서버로 결제 데이터 전송
            const paymentData: IPayment = {
              impUid: rsp.imp_uid,
              amount: amount,
              status: "OK",
              buyer: {
                id: userId,
              },
            };
            
            dispatch(savePayment(paymentData));
            const { data } = await axios.post(
              `${userURL}/user/payments/verifyIamport/${rsp.imp_uid}`,
              rsp,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            console.log("Payment failed", rsp.error_msg);
            confirm("결제가 실패하였습니다.");
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
    // jquery.src = "http://code.jquery.com/jquery-3.3.1.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
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
          fetch(`${userURL}user/payments/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imp_uid: imp_uid,
              amount: totalPrice,
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
    <div className="flex items-center">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        className="border border-gray-300 rounded-2xl py-2 px-4"
        placeholder="Enter amount"
      />
      <button
        className="border border-gray-300 rounded-2xl py-2 px-4"
        onClick={() => requestPay(amount)}
      >
        충전
      </button>
    </div>
  );
}
