"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const UserLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
          <button
            className="w-[22vw] h-[5vh] mt-[2vh] bg-white border font-bold flex justify-center items-center gap-[1.111vh] border-[var(--color-Harbor-first)]"
            type="button"
          >
            <Image
              alt="google-logo"
              src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
              width={18}
              height={18}
            />
            Login with Google
          </button>
          <button
            className="w-[22vw] h-[5vh] mt-[2vh] bg-white border font-bold flex justify-center items-center gap-[1.111vh] border-[var(--color-Harbor-first)]"
            type="button"
          >
            <Image
              alt="naver-logo"
              src="https://blog.kakaocdn.net/dn/ceC8Gj/btrTPjfh2k0/fAUpKl8TGAxk7OkCjZPGBK/img.png"
              width={18}
              height={18}
            />
            Login with Naver
          </button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
