"use client";

import { getCaseLawList } from "@/components/_service/judicial-precedent/judicial.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const JudicialPrecidentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const judicialPrecident = [
    {
      serialNumber: "000001",
      caseName:
        "판례 제목판례 제목판례 제목판례 제목판례 제목판례 제목판례 제목판례 제목판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000002",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000003",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000004",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000005",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000006",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000007",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000008",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000009",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
    {
      serialNumber: "000010",
      caseName: "판례 제목",
      caseNumber: "2021.10.01",
      dateOfDecision: "2021.10.01",
    },
  ];

  const handleCaseLawList = async () => {
    await dispatch(getCaseLawList()).then((res: any) => {
      console.log(res);
    });
  };

  useEffect(() => {
    handleCaseLawList();
  }, []);

  const truncateCaseName = (caseName: any, maxLength = 25) => {
    if (caseName.length <= maxLength) {
      return caseName;
    }
    return caseName.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className={`flex flex-col justify-center items-center relative `}>
        <div className="flex flex-col items-center py-16">
          <h1 className=" text-[40px] font-semibold font-chosunlo">
            판례 게시판
          </h1>
          <div className="flex flex-wrap items-center justify-center w-[60vw] box-border gap-7 py-7">
            <div className="flex flex-col items-baseline border rounded-md border-[var(--color-Harbor-sec)] w-[60vw] h-[22vh] p-8 gap-2"></div>
            <div className="flex flex-wrap items-center justify-center w-[60vw] box-border gap-6">
              {judicialPrecident.map((item) => (
                <div
                  key={item.serialNumber}
                  className="flex flex-col items-baseline border rounded-md border-[var(--color-Harbor-sec)] w-[60vw] h-[15vh] p-8 gap-2"
                  onClick={() =>
                    router.push(`/judicial-precedent/${item.serialNumber}`)
                  }
                >
                  <div className="flex flex-row w-[55vw] justify-between font-chosunsg text-[14px]">
                    <div>{item.serialNumber}</div>
                    <div>
                      {item.caseNumber} ~ {item.dateOfDecision}
                    </div>
                  </div>
                  <div className="text-[36px]">
                    {truncateCaseName(item.caseName)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JudicialPrecidentPage;
