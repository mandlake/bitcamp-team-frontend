"use client";

import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import {
  getLawyerByUsername,
  getLawyerDetailByUsername,
} from "@/components/_service/lawyer/lawyer.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LawyerSingleInfoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lawyer, setLawyer] = useState({} as ILawyer);
  const [lawyerDetail, setLawyerDetail] = useState({} as ILawyerDetail);

  const getLawyer = async () => {
    await dispatch(getLawyerByUsername(parseCookies().username)).then(
      (res: any) => {
        console.log(res);
        setLawyer(res.payload);
      }
    );
  };

  const getLawyerDetail = async () => {
    await dispatch(getLawyerDetailByUsername(parseCookies().username)).then(
      (res: any) => {
        console.log(res);
        setLawyerDetail(res.payload);
      }
    );
  };

  useEffect(() => {
    return () => {
      getLawyer();
      getLawyerDetail();
    };
  }, []);

  return (
    <>
      <div className="flex flex-row ">
        <div className="w-[395px] h-screen border-x border-[var(--color-Harbor-first)] p-5 items-center">
          <div
            className="flex items-center justify-center text-[var(--color-Harbor-first)] font-bold text-[22px] cursor-pointer"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            LAWWMATE LOGO
          </div>
          <div className="flex flex-col items-center justify-center pt-12">
            <Image
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              width={180}
              height={180}
              alt="user-image"
              style={{ width: 180, height: 180 }}
              className="text-[var(--color-Harbor-first)]"
            />
            <h1 className=" font-semibold text-[26px] text-[var(--color-Harbor-first)]">
              {lawyer.username}
            </h1>
            <p className=" text-[var(--color-Harbor-first)]/60 text-[22px]">
              {lawyer.birth}
            </p>
          </div>
        </div>
        <div className="w-[838px] h-screen items-center p-20 gap-6 flex flex-col">
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">기본정보</p>
            <div className="flex flex-row items-center justify-center p-2">
              <Image
                src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                width={50}
                height={50}
                alt="user-image"
                style={{ width: 50, height: 50 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="w-[600px] px-2">
                <div className="flex flex-row justify-between items-center">
                  <p>{lawyer.name}</p>
                  <input type="submit" value="수정" className="px-2" />
                </div>
                <p className="text-[14px] text-[var(--color-Harbor-sec)]">
                  {lawyer.email}
                </p>
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <Image
                src="https://img.icons8.com/?size=100&id=48377&format=png&color=000000"
                width={20}
                height={20}
                alt="user-image"
                style={{ width: 20, height: 20 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="flex flex-row w-[620px] justify-between items-center">
                <p>{lawyer.phone}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <Image
                src="https://img.icons8.com/?size=100&id=85467&format=png&color=000000"
                width={20}
                height={20}
                alt="user-image"
                style={{ width: 20, height: 20 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="flex flex-row w-[620px] justify-between items-center">
                <p>{lawyer.email}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">세부정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <Image
                src="https://img.icons8.com/?size=100&id=87961&format=png&color=000000"
                width={20}
                height={20}
                alt="user-image"
                style={{ width: 20, height: 20 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="flex flex-row w-[620px] justify-between items-center">
                <p>{lawyer.birth}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <Image
                src="https://img.icons8.com/?size=100&id=101172&format=png&color=000000"
                width={20}
                height={20}
                alt="계좌번호"
                style={{ width: 20, height: 20 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="flex flex-row w-[620px] justify-between items-center">
                <p>{lawyer.account}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <Image
                src="https://img.icons8.com/?size=100&id=101172&format=png&color=000000"
                width={20}
                height={20}
                alt="자격번호"
                style={{ width: 20, height: 20 }}
                className="text-[var(--color-Harbor-first)]"
              />
              <div className="flex flex-row w-[620px] justify-between items-center">
                <p>{lawyer.lawyerNo}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerSingleInfoPage;
