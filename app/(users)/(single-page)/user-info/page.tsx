"use client";

import { IUser } from "@/components/_model/user/user";
import {
  getUserById,
  paymentsBuyerById,
} from "@/components/_service/user/user.service";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChatList from "@/components/common/chat/ChatList";
import Payment from "@/app/(payment)/payment/[id]/page";
import CancelPayment from "@/app/(payment)/cancel/[id]/page";
import { IPayment } from "@/components/_model/payment/payment";
import { getLawyerById } from "@/components/_service/lawyer/lawyer.service";
import { findProductById } from "@/components/_service/product/product-service";

const UserSingeInfoPage = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([] as IPayment[]);
  const currentUser = "user1";
  const [impUid, setImpUid] = useState<string | null>(null);
  const [user, setUser] = useState({} as IUser);
  const lawyers = [
    { id: "lawyer1", name: "Lawyer 1" },
    { id: "lawyer2", name: "Lawyer 2" },
    { id: "lawyer3", name: "Lawyer 3" },
  ];

  const accessToken: string = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUser = async () => {
    await dispatch(getUserById(decodedToken.id)).then((res: any) => {
      setUser(res.payload);
      dispatch(paymentsBuyerById(res.payload.id)).then((buy: any) => {
        setPayments(buy.payload);
        const payments = buy.payload;
        fetchRelatedData(payments);
        buy.payload?.map((pay: any) => {
          console.log("pay");
          console.log(pay);
        });
      });
    });
  };

  const fetchRelatedData = async (payments: IPayment[]) => {
    const paymentsWithRelatedData = await Promise.all(
      payments.map(async (payment) => {
        const product = payment.product?.id
          ? await dispatch(findProductById(payment.product.id)).then(
              (res: any) => res.payload
            )
          : null;
        const lawyer = payment.lawyer
          ? await dispatch(getLawyerById(payment.lawyer)).then(
              (res: any) => res.payload
            )
          : null;

        return { ...payment, product, lawyer };
      })
    );
    setPayments(paymentsWithRelatedData);
  };

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    try {
      setDecodedToken(jwtDecode(accessToken));
      if (decodedToken.roles !== undefined) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="flex flex-row relative">
        <div className="w-[390px]"></div>
        <div className="w-[390px] h-screen border-x border-[var(--color-Harbor-first)] p-20 items-center fixed top-0 bg-[var(--color-Harbor-firth)]">
          <div
            className="flex items-center justify-center text-[var(--color-Harbor-first)] font-bold text-[22px] cursor-pointer"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            <svg width="60" viewBox="0 0 686 283" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M284 146.53C268.938 176.46 258.072 198.613 242.468 227.373C237.539 236.451 233.399 246.336 227.495 254.758C216.962 269.777 202.928 276.151 179.151 276.151C156.801 276.151 135.639 275.991 112.412 276.151C86.7991 276.311 64.0768 277.499 44.3776 275.725C24.581 273.935 11.0611 261.86 4.59811 246.203C-1.73186 230.901 0.316071 203.409 0.316071 180.74C0.324937 145.926 0.316071 111.625 0.316071 76.7746C0.316071 65.1697 -0.0917422 53.5115 1.17603 42.9793C3.82681 20.9929 22.7458 -1.95107 52.0906 2.33097C73.3324 5.43389 86.276 19.7162 90.6024 36.9862C93.2354 47.5096 92.3046 61.2954 92.3046 74.638C92.3134 107.236 92.3046 138.824 92.3046 173.045C92.3046 179.313 92.278 186.574 95.7355 189.304C101.117 193.569 115.927 192.5 124.5 192.5C135.369 192.5 146.827 193.134 154.345 190.59C159.7 188.773 164.222 180.971 167.608 175.182C191.474 134.356 216.475 89.8335 239.915 48.9724C252.531 26.2678 263.914 3.0934 295.529 0.203244C313.428 -1.43687 329.448 7.10947 338.305 16.4626C344.324 22.8014 354 40.5 354 40.5C354 40.5 383.439 92.9453 397.349 116.572C411.427 140.473 426.853 167.371 441.419 191.875C446.331 200.129 452.288 208.498 455.542 217.55C463.707 240.228 453.308 260.796 439.708 271.036C426.96 280.628 402.482 282.703 386.666 272.747C376.125 266.106 368.687 252.161 361.417 239.377C342.764 206.53 327.883 179.747 309.62 146.528C306.581 141 301.287 129.124 296.81 129C292.43 129.128 286.783 141 284 146.53Z" fill="#36454A"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M284 146.53C268.938 176.46 258.072 198.613 242.468 227.373C237.539 236.451 233.399 246.336 227.495 254.758C216.962 269.777 202.928 276.151 179.151 276.151C156.801 276.151 135.639 275.991 112.412 276.151C86.7991 276.311 64.0768 277.499 44.3776 275.725C24.581 273.935 11.0611 261.86 4.59811 246.203C-1.73186 230.901 0.316071 203.409 0.316071 180.74C0.324937 145.926 0.316071 111.625 0.316071 76.7746C0.316071 65.1697 -0.0917422 53.5115 1.17603 42.9793C3.82681 20.9929 22.7458 -1.95107 52.0906 2.33097C73.3324 5.43389 86.276 19.7162 90.6024 36.9862C93.2354 47.5096 92.3046 61.2954 92.3046 74.638C92.3134 107.236 92.3046 138.824 92.3046 173.045C92.3046 179.313 92.278 186.574 95.7355 189.304C101.117 193.569 115.927 192.5 124.5 192.5C135.369 192.5 146.827 193.134 154.345 190.59C159.7 188.773 164.222 180.971 167.608 175.182C191.474 134.356 216.475 89.8335 239.915 48.9724C252.531 26.2678 263.914 3.0934 295.529 0.203244C313.428 -1.43687 329.448 7.10947 338.305 16.4626C344.324 22.8014 354 40.5 354 40.5C354 40.5 383.439 92.9453 397.349 116.572C411.427 140.473 426.853 167.371 441.419 191.875C446.331 200.129 452.288 208.498 455.542 217.55C463.707 240.228 453.308 260.796 439.708 271.036C426.96 280.628 402.482 282.703 386.666 272.747C376.125 266.106 368.687 252.161 361.417 239.377C342.764 206.53 327.883 179.747 309.62 146.528C306.581 141 301.287 129.124 296.81 129C292.43 129.128 286.783 141 284 146.53Z" fill="#36454A"/>
            <path d="M467.968 230.373C483.572 201.613 494.437 179.46 509.5 149.53C512.283 144 517.93 132.128 522.31 132C526.787 132.124 532.08 144 535.12 149.528C553.383 182.747 568.264 209.53 586.917 242.377C594.186 255.161 601.625 269.106 612.166 275.747C627.982 285.703 652.46 283.628 665.208 274.036C678.808 263.796 689.207 243.228 681.042 220.55C677.788 211.498 671.831 203.129 666.919 194.875C652.353 170.371 636.927 143.473 622.849 119.572C608.939 95.9453 579.5 43.5 579.5 43.5C579.5 43.5 569.824 25.8014 563.804 19.4626C554.948 10.1095 538.928 1.56313 521.028 3.20324C489.414 6.0934 478.031 29.2678 465.415 51.9724C441.975 92.8335 416.974 137.356 393.108 178.182L375 211.5L379.5 257.758L404.651 279.151C428.428 279.151 442.462 272.777 452.994 257.758C458.899 249.336 463.039 239.451 467.968 230.373Z" fill="#36454A"/>
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center pt-4">
            <Image
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              width={180}
              height={180}
              alt="user-image"
              priority
              style={{ width: 180, height: 180 }}
              className="text-[var(--color-Harbor-first)]"
            />
            <h1 className=" font-semibold text-[26px] text-[var(--color-Harbor-first)]">
              {user?.name}
            </h1>
            <p className=" text-[var(--color-Harbor-first)]/60 text-[22px]">
              {user?.email}
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
                    {user?.name}
                  </p>
                </div>
                <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                  {user?.email}
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
                  value={user?.password}
                  onChange={(e: any) =>
                    setUser({ ...user, password: e.target.value })
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
                  value={user?.phone}
                  onChange={(e: any) =>
                    setUser({ ...user, phone: e.target.value })
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
                  value={user?.email}
                  onChange={(e: any) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">나이</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Age"
                  value={user?.age}
                  onChange={(e: any) =>
                    setUser({ ...user, age: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">성별</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  value={user?.gender}
                  onChange={(e: any) =>
                    setUser({ ...user, gender: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">결제 정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">포인트</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <Payment />
                <div>
                  잔액
                  <input
                    type="readonly"
                    id="point"
                    name="point"
                    placeholder="point"
                    style={{
                      width: "60px",
                      textAlign: "end",
                      paddingRight: 10,
                    }}
                    value={user?.point}
                    onChange={(e: any) =>
                      setUser({
                        ...user,
                        point: e.target.value,
                      })
                    }
                    className="pl-2 text-[14px] bg-white"
                  />
                  포인트
                  {/* <input type="submit" value="수정" className="px-2" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)] border-b">예약 내역</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              {payments.length > 0 ? (
                <div>
                  <div className="flex flex-row gap-5">
                    <div className="flex items-center justify-center">
                      <p className="w-32">상담 정보</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="w-32">변호사</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="w-32">가격</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="w-32">현재 진행상태</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="w-12"></p>
                    </div>
                  </div>
                  <div>
                    {payments.length > 0 ? (
                      payments.map((payment: any) => (
                        <div key={payment.id} className="flex flex-row gap-5">
                          <div className="flex items-center justify-center">
                            <p className="w-32">
                            20분 영상 상담
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="w-32">{payment?.lawyer?.name}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="w-32">{payment?.amount} 원</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="w-32">{payment?.status}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <CancelPayment
                              className="px-2"
                              impUid={payment?.impUid}
                              amount={payment?.amount}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>예약 내역이 없습니다.</p>
                    )}
                  </div>
                </div>
              ) : (
                <p>예약 내역이 없습니다.</p>
              )}
            </div>
          </div>
          {/* <ChatList currentUser={user?.name || currentUser} lawyers={lawyers} /> */}
        </div>
      </div>
    </>
  );
};

export default UserSingeInfoPage;
