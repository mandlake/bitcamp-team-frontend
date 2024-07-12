"use client";

import { lawyerLogin } from "@/components/_service/lawyer/lawyer.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LawyerLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await dispatch(lawyerLogin(formData))
        .then((res: any) => {
          if (res.payload.message === "SUCCESS") {
            alert("로그인 성공");
            setCookie({}, "accessToken", res.payload.accessToken, {
              httpOnly: false,
              path: "/",
            });
            router.refresh();
            router.push("/");
          } else {
            alert("로그인 실패");
          }
          return res;
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
        <ul className="flex w-[25vw] flex-wrap text-sm font-medium text-center text-[var(--color-Harbor-firth)] border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <Link
              href="/login/user"
              aria-current="page"
              className="inline-block p-4 rounded-t-lg text-[var(--color-Harbor-first)] hover:text-gray-600 hover:bg-gray-100"
            >
              User
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/login/lawyer"
              className="inline-block p-4 bg-[var(--color-Harbor-first)] rounded-t-lg active"
            >
              Lawyers
            </Link>
          </li>
        </ul>
        <div
          id="login"
          className="font-roboto w-[25vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">
            변호사 님, <br />
            저희와 함께하세요.
          </p>
          <div>
            <label htmlFor="username">
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
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button
              onClick={() => handleLogin()}
              className="w-[22vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/find-username`)}
              className="text-gray-700 text-sm"
            >
              Forgot your username?
            </p>
            <p
              onClick={() => router.push(`/find-password`)}
              className="text-gray-700 text-sm"
            >
              Forgot your password?
            </p>
            <p
              onClick={() => router.push(`/join`)}
              className="text-gray-700 text-sm"
            >
              Aren&apos;t you a member yet? Join now!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerLogin;
