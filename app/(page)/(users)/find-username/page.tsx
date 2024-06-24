"use client";

import { forgotUsername } from "@/app/_components/user/service/user.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ForgotUsername() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleForgotUsername = async () => {
    try {
      await dispatch(forgotUsername(formData))
        .then((res: any) => {
          alert("당신의 아이디는 " + res.payload + " 입니다.");
        })
        .then((res: any) => {
          router.push(`/login`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex align-middle justify-center items-center">
        <div className="font-roboto w-[25vw] h-[50vh] border border-gray-700 flex flex-col justify-between items-center gap-[1.111vh] bg-gray-200 p-[1.111vh]">
          <h1>Forgot Username</h1>
          <div>
            <div className="flex flex-col">
              <p>Enter Your email</p>
              <input
                type="text"
                onChange={(e: any) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <button onClick={() => handleForgotUsername()} className="">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ForgotUsername;
