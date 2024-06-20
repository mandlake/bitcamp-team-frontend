"use client";

import { loginId } from "@/app/components/user/service/user.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      await dispatch(loginId(formData))
        .then((res: any) => {
          alert("success to login");
          console.log(res.payload.userId);
        })
        .then(() => {
          router.push("/");
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
        <ul className="flex w-[25vw] flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <Link
              href="/pages/users/login/user"
              aria-current="page"
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              User
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/pages/users/login/lawyer"
              className="inline-block p-4 text-[var(--color-Harbor-first)] bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >
              Lawyers
            </Link>
          </li>
        </ul>
        <div
          id="login"
          className="font-roboto w-[25vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-gray-100 p-7"
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
                className="w-[22vw] h-[5vh] border border-gray-700 px-[1.111vw] mb-[1.111vh] bg-gray-100"
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
                className="w-[22vw] h-[5vh] border border-gray-700 px-[1.111vw] mb-[1.111vh] bg-gray-100"
              />
            </label>
            <button
              onClick={() => handleLogin()}
              className="w-[22vw] h-[5vh] bg-white border border-gray-700 hover:bg-gray-700 hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/pages/users/find-username`)}
              className="text-gray-700 text-sm"
            >
              Forgot your username?
            </p>
            <p
              onClick={() => router.push(`/pages/users/find-password`)}
              className="text-gray-700 text-sm"
            >
              Forgot your password?
            </p>
            <p
              onClick={() => router.push(`/pages/users/join`)}
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
