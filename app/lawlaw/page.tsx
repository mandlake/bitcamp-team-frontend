"use client";

import { useState } from "react";
import LawLawBeforePage from "./before.page";
import LawLawCurrentPage from "./current.page";

const LawLawPage = ({ isOpenLawLaw }: any) => {
  const [isBefore, setIsBefore] = useState(false);
  return (
    <>
      <div
        className={`flex flex-row w-[60vw] h-screen items-center justify-centery ${
          isOpenLawLaw
            ? "visible animate__animated animate__fadeInBottomRight"
            : "invisible"
        } absolute z-0 bottom-0 right-0 h-screen bg-white/80 justify-center gap-3`}
      >
        <ul className="flex h-[70vh] flex-col gap-7 text-sm font-medium text-start text-[var(--color-Harbor-firth)] border-r border-gray-200">
          <li className="me-2">
            <a
              aria-current="page"
              onClick={() => setIsBefore(false)}
              className={`inline-block p-4 rounded-l-lg active ${
                isBefore
                  ? "bg-gray-50 hover:text-gray-600 hover:bg-gray-100 text-[var(--color-Harbor-first)]"
                  : "bg-[var(--color-Harbor-first)]"
              }`}
            >
              C<br />u<br />r<br />r<br />e<br />n<br />t
            </a>
          </li>
          <li className="me-2">
            <a
              onClick={() => setIsBefore(true)}
              className={`inline-block p-4 rounded-l-lg ${
                isBefore
                  ? "bg-[var(--color-Harbor-first)]"
                  : "bg-gray-50 hover:text-gray-600 hover:bg-gray-100 text-[var(--color-Harbor-first)]"
              }`}
            >
              B<br />e<br />f<br />o<br />r<br />e
            </a>
          </li>
        </ul>
        {isBefore ? <LawLawBeforePage /> : <LawLawCurrentPage />}
      </div>
    </>
  );
};

export default LawLawPage;
