"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ILawyer } from "@/components/_model/lawyer/lawyer";
import { lawyerJoin } from "@/components/_service/lawyer/lawyer.service";

function Join() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({} as ILawyer);

  const handleJoin = async () => {
    try {
      console.log(formData);
      await dispatch(lawyerJoin(formData))
        .then((res: any) => {
          alert("success to join us");
          console.log(res);
        })
        .then(() => {
          router.push("/login/lawyer");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div
          id="login"
          className="font-roboto w-[37vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">
            변호사 회원가입
          </p>
          <div>
            <label
              htmlFor="username"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">아이디</p>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={(e: any) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">비밀번호</p>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="email"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이메일</p>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e: any) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="name"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이름</p>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e: any) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="phone"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">전화번호</p>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="PhoneNumber"
                value={formData.phone}
                onChange={(e: any) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="birth"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">생년월일</p>
              <input
                type="text"
                id="birth"
                name="birth"
                placeholder="Birth(YYMMDD)"
                value={formData.birth}
                onChange={(e: any) =>
                  setFormData({ ...formData, birth: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="account"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">가맹점 번호</p>
              <input
                type="text"
                id="account"
                name="account"
                placeholder="계좌 번호"
                value={formData.account}
                onChange={(e: any) =>
                  setFormData({ ...formData, account: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="lawyerNo"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">자격 번호</p>
              <input
                type="text"
                id="lawyerNo"
                name="lawyerNo"
                placeholder="LawyerNo"
                value={formData.lawyerNo}
                onChange={(e: any) =>
                  setFormData({ ...formData, lawyerNo: e.target.value })
                }
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    handleJoin();
                  }
                }}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button
              onClick={() => handleJoin()}
              className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login/lawyer`)}
              className="text-gray-700 text-sm"
            >
              Already Joined?
            </p>
            <p
              onClick={() => router.push(`/login/user`)}
              className="text-gray-700 text-sm"
            >
              Are you a general user?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
