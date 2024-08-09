"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/components/_model/user/user";
import { getUserById } from "@/components/_service/user/user.service";
import { IPayment } from "@/components/_model/payment/payment";
import { savePayment } from "@/components/_service/payment/payment-service";
import { userURL } from "@/components/common/url";

interface PayComponentProps {
  product?: { id: number; item_name: string; price: number };
  chargePoint?: number;
  onSuccess?: () => void;
}

const PayComponent: React.FC<PayComponentProps> = ({
  product,
  chargePoint,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>({} as IUser);
  const token = parseCookies().accessToken;
  const [point, setPoint] = useState<number>(chargePoint || 0);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        dispatch(getUserById(decoded.id)).then((res: any) => {
          console.log(res);
          setUser(res.payload);
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token is missing");
    }
  }, [dispatch]);

  const requestPay = async (amount: number) => {
    window.IMP.init("imp78717406");
    if (!window.IMP) {
      console.error("IMP is not loaded");
      return;
    }

    window.IMP.request_pay(
      {
        id: user.id,
        pg: "html5_inicis",
        pay_method: "card",
        paymentUid: new Date().getTime().toString(),
        name: product?.item_name || "포인트",
        amount: amount,
      },
      async (rsp: any) => {
        if (rsp.success) {
          const token = parseCookies().accessToken;
          confirm("결제가 완료되었습니다.");

          const paymentData: IPayment = {
            item_name: product?.item_name || "포인트",
            amount: amount,
            buyer: {
              id: user.id,
            },
            product: product
              ? {
                  id: product.id,
                }
              : undefined,
          };

          await dispatch(savePayment(paymentData));
          await axios.post(
            `${userURL}/payment/verifyIamport/${rsp.imp_uid}`,
            rsp,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (onSuccess) onSuccess();
        } else {
          console.log("Payment failed", rsp.error_msg);
          confirm("결제가 실패하였습니다.");
        }
      }
    );
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  return (
    <div className="payment-component flex items-center">
      <input
        type="number"
        value={point}
        onChange={(e) => setPoint(parseInt(e.target.value, 10))}
        className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-3/4 focus:outline-2 focus:outline-blue-500 mr-4"
        placeholder="Enter point"
      />
      <button
        className="text-white bg-blue-400 items-center justify-center flex cursor-pointer"
        onClick={() => requestPay(point)}
      >
        Pay {point}원
      </button>
    </div>
  );
};

export default PayComponent;
