"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { mainURL } from "@/components/common/url";
import { useState } from "react";
import { localLogin } from "@/components/_service/user/user.service";
import { setCookie } from "nookies";

const UserLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await dispatch(localLogin(formData))
        .then((res: any) => {
          console.log(res);
          setCookie({}, "accessToken", res.payload.accessToken, {
            httpOnly: false,
            path: "/",
          });
          setCookie({}, "refreshToken", res.payload.refreshToken, {
            httpOnly: false,
            path: "/",
          });
          if (res.payload.success === "true") {
            alert("로그인 성공");
          }
          window.location.replace("/");
          return res;
        })
        .then((res: any) => {})
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
              className="inline-block p-4 bg-[var(--color-Harbor-first)] rounded-t-lg active"
            >
              User
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/login/lawyer"
              className="inline-block p-4 rounded-t-lg text-[var(--color-Harbor-first)] hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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
            쉽게 가입하고
            <br />
            간편하게 로그인하세요.
          </p>
          <div className="flex flex-col items-center gap-3 mt-3">
            <div className="">
              <label htmlFor="username">
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
            <p>or</p>
            <Link
              className="w-[22vw] h-[5vh] bg-white border font-bold flex justify-center items-center gap-[1.111vh] border-[var(--color-Harbor-first)]"
              type="button"
              href={`${mainURL}/oauth2/authorization/google`}
            >
              <Image
                alt="google-logo"
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                width={18}
                height={18}
              />
              Login with Google
            </Link>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => window.location.replace("/")}
              className="text-gray-700 text-sm"
            >
              Go Back to Main Page
            </p>
            <p
              onClick={() => router.push(`/join/user`)}
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

export default UserLogin;
