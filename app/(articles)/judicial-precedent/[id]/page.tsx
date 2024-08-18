"use client";

import { CaseLaw, CaseLawDetail } from "@/components/_model/manage/manage";
import { getCaseLawDetail } from "@/components/_service/judicial-precedent/judicial.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const JudicialPrecedentByIdPage = (props: any) => {
  const JudicialPrecedentId = props.params.id;
  const [judicialPrecedent, setJudicialPrecedent] = useState(
    {} as CaseLawDetail
  );
  const [caseLaw, setCaseLaw] = useState({} as CaseLaw);
  const dispatch = useDispatch();

  const getJudicialPrecedentById = async (id: string) => {
    try {
      await dispatch(getCaseLawDetail(id)).then((res: any) => {
        setJudicialPrecedent(res.payload);
        setCaseLaw(res.payload.caseLaw);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJudicialPrecedentById(props.params.id);
  }, [JudicialPrecedentId]);

  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col p-20 gap-5">
          <p>{caseLaw.serialNumber}</p>
          <div className="flex flex-col gap-2">
            <p className="text-2xl">
              [{caseLaw.caseNumber} - {judicialPrecedent.caseType}]
            </p>
            <h1 className="font-bold text-4xl leading-snug">
              {caseLaw.caseName}
            </h1>
          </div>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>{judicialPrecedent.court}</p>
              <div>
                <pre>{caseLaw.dateOfDecision}</pre>
              </div>
            </div>
          </div>
          <div>
            <div className="border-b pb-10">
              <p
                className="font-light text-lg"
                dangerouslySetInnerHTML={{ __html: judicialPrecedent.summary }}
              ></p>
            </div>
            <div className="py-10">
              <p
                className="font-light text-lg"
                dangerouslySetInnerHTML={{ __html: judicialPrecedent.detail }}
              ></p>
            </div>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <p>조회수 1,000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JudicialPrecedentByIdPage;
