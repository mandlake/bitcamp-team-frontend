"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleForgotPassword = async () => {
    try {
      // await dispatch(forgotPassword(formData))
      //   .then((res: any) => {
      //     alert("success to change password");
      //   })
      //   .then((res: any) => {
      //     router.push(`/login`);
      //   });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div
          id="find-password"
          className="font-roboto w-[25vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">
            비밀번호를 <br />
            잃어버리셨나요?
          </p>
          <div>
            <label htmlFor="email">
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
            <button
              onClick={() => handleForgotPassword()}
              className="w-[22vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Find Password
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login/lawyer`)}
              className="text-gray-700 text-sm"
            >
              I know my password. Let me login.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
