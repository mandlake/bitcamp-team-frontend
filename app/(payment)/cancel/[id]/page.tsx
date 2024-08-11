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

export default function CancelPayment({ params }: any) {
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
      impUid: "imp_055045284793",
      cancel_request_amount: 200,
      reason: "거절된 상담 요청",
      amount: 200,
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
      console.log("Payment cancellation successful", response);
    } catch (error) {
      console.error("Payment cancellation failed", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="border border-gray-300 rounded-2xl py-2 px-4"
        onClick={cancelPayment}
      >
        결제 취소
      </button>
    </div>
  );
}
