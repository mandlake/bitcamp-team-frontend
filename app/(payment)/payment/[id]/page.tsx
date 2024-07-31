"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/components/_model/user/user";
import PayComponent from "@/components/modules/payment/paymentComponent";
import { getUserById } from "@/components/_service/user/user.service";

export default function Payment() {
  const dispatch = useDispatch();
  const [point, setPoint] = useState<number>(0);
  const [user, setUser] = useState<IUser>({} as IUser);
  const token = parseCookies().accessToken;
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        dispatch(getUserById(decoded?.id)).then((res: any) => {
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

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0">
      <form className="w-[73vh] h-[67vh] overflow-hidde mt-28 flex shadow-2xl overflow-x-auto">
        <div className="w-full p-[8.5vh] justify-center items-center">
          <div className="text-2xl text-center mb-10 font-bold">My Order</div>
          <p className="text-xl font-bold text-gray-700mt-14 mb-20">
            Order info
          </p>

          <div className="grid w-1/2 grid-cols-2">
            <p className="font-bold text-[18px]">잔액</p>
            <p className="text-[18px]">{user?.point} 포인트</p>
          </div>
          {!showProfile && (
            <button
              className="items-center justify-center flex mt-16 mx-auto"
              onClick={() => setShowProfile(true)}
            >
              Charge
            </button>
          )}
          {showProfile && (
            <div className="mt-16">
              <PayComponent chargePoint={point} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
