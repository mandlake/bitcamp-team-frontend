"use client";

import { useState } from "react";

const LawLawCurrentPage = () => {
  const [message, setMessage] = useState("How Can I Help You Today ?");

  return (
    <>
      <div className="flex h-[70vh] flex-col bg-white/80 justify-center gap-3">
        <div className="w-[58vw] h-[65vh] bg-[var(--color-Harbor-sec)] items-center justify-center flex">
          <p className=" text-white text-3xl">
            {message ? message : "How Can I Help You Today ?"}
          </p>
        </div>
        <form className="relative flex flex-row bg-[var(--color-Harbor-first)]">
          <input className="bg-[var(--color-Harbor-first)] w-[708px] h-[40px] text-slate-300 pr-[60px]" />
          <button
            type="submit"
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
