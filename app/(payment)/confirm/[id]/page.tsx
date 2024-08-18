"use client";

import axios from "axios";
import React from "react";
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

export default function ConfirmPayment(props: any) {
  const { impUid, amount, paymentId } = props; // paymentId를 props로 전달
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;
  const userId = parseInt(UserId() || "");

  // 수락 함수
  const confirmPayment = async () => {
    const paymentDto = {
      id: paymentId, // paymentId를 올바르게 설정
      impUid: impUid,
    };

    try {
      const response = await axios.put(
        `${userURL}/user/payments/confirm`,
        paymentDto,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 토큰을 포함해야 할 경우
          },
        }
      );
      if (response.status === 200) {
        console.log("Payment confirmation successful", response);
        alert("예약이 확정되었습니다.");
      }
    } catch (error) {
      console.error("Payment confirmation failed", error);
      alert("예약이 확정되었습니다.");
    }
  };

  return (
    <div>
      <button
        className="p-2 bg-white border border-[var(--color-Harbor-first)] rounded-xl hover:bg-[var(--color-Harbor-first)] hover:text-white text-sm"
        onClick={confirmPayment}
      >
        수락
      </button>
    </div>
  );
}
