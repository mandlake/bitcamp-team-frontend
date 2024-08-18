"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { IUser } from "@/components/_model/user/user";
import { getUserById } from "@/components/_service/user/user.service";
import { userURL } from "@/components/common/url";
import UserId from "@/components/hooks/userId";

declare global {
  interface Window {
    IMP?: any;
  }
}

export default function CancelPayment(props: any) {
  const { impUid, amount } = props;
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;
  const userId = parseInt(UserId() || "");

  useEffect(() => {
    const loadScript = (src: string, callback: () => void) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };

    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        if (window.IMP) {
          window.IMP.init("imp78717406");
        }
      });
    });

    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  const cancelPayment = async () => {
    const paymentDto = {
      id: userId,
      impUid: "imp_680596087293",
      cancel_request_amount: 200,
      reason: "거절된 상담 요청",
      amount: 2000,
    };

    try {
      const response = await axios.post(
        `${userURL}/user/payments/cancel`,
        paymentDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Payment cancellation successful", response);
        alert("결제가 정상적으로 취소되었습니다.");
      } else {
        console.error("Unexpected response status", response.status);
        alert("결제 취소에 실패했습니다. 관리자에게 문의하세요.");
      }
    } catch (error) {
      console.error("Payment cancellation failed", error);
      alert("결제 취소에 실패했습니다. 관리자에게 문의하세요.");
    }
  };

  return (
    <div>
      <button
        className="p-2 bg-white border border-[var(--color-Harbor-first)] rounded-xl hover:bg-[var(--color-Harbor-first)] hover:text-white text-sm"
        onClick={cancelPayment}
      >
        취소
      </button>
    </div>
  );
}
