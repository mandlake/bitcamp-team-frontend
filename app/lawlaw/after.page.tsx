"use client";

import { temp } from "@/redux/lawlaw/service/lawlaw.service";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LawLawCurrentPage = () => {
  const [message, setMessage] = useState({
    question: "",
    answer: "How Can I Help You Today ?",
  });

  const [send, setSend] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    setMessage({ ...message, question: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(message);
    console.log("submit");
    await dispatch(temp(message)).then((res: any) => {
      console.log(res);
      setMessage({ ...message, answer: res });
      setSend(true);
    });
  };

  return (
    <>
      <div className="flex h-[70vh] flex-col bg-white/80 justify-center gap-3">
        <div className="w-[58vw] h-[65vh] bg-[var(--color-Harbor-sec)] items-center justify-center flex">
          <p className=" text-white text-3xl">
            {send ? "success" : "How Can I Help You Today ?"}
          </p>
        </div>
        <form className="relative flex flex-row bg-[var(--color-Harbor-first)]">
          <input
            className="bg-[var(--color-Harbor-first)] w-full h-[40px] text-slate-300 pr-[60px]"
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="absolute top-0 right-0 bg-[var(--color-Harbor-first)] text-slate-300 w-[60px] h-[40px] flex items-center justify-center"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default LawLawCurrentPage;
