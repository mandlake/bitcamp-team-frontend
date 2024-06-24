"use client";

import { useState } from "react";

const LawLawBeforePage = () => {
  const [message, setMessage] = useState("There is no data to show.");
  return (
    <>
      <div className="flex h-[70vh]  flex-col bg-white/80 justify-center gap-3">
        <div className="w-[58vw] h-[70vh] bg-[var(--color-Harbor-sec)] items-center justify-center flex">
          <p className=" text-white text-3xl">
            {message ? message : "How Can I Help You Today ?"}
          </p>
        </div>
      </div>
    </>
  );
};

export default LawLawBeforePage;
