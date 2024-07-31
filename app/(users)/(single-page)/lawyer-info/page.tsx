"use client";

import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";
import {
  getLawyerByUsername,
  getLawyerDetailByUsername,
  updateLawyer,
} from "@/components/_service/lawyer/lawyer.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LawyerSingleInfoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lawyer, setLawyer] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    birth: "",
    lawyerNo: "",
    account: "",
    auth: false,
    createdDate: "",
    modifiedDate: "",
    posts: {},
    files: {},
    replies: {},
    reservations: {},
    notices: {},
    detail: {},
  } as ILawyer);
  const [lawyerDetail, setLawyerDetail] = useState({
    id: "",
    belong: "",
    address: "",
    addressDetail: "",
    belongPhone: "",
    law: "",
    visitCost: "",
    phoneCost: "",
    videoCost: "",
    university: "",
    major: "",
    premium: false,
    createdDate: "",
    modifiedDate: "",
    time: "",
  } as ILawyerDetail);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleSubmit = async () => {
    await dispatch(updateLawyer(lawyer)).then((res: any) => {
      console.log(res);
    });
  };

  useEffect(() => {
    return () => {
      getLawyer();
      getLawyerDetail();
    };
  }, []);

  return (
    <>
      <div className="flex flex-row relative">
        <div className="w-[390px]"></div>
        <div className="w-[390px] h-screen border-x border-[var(--color-Harbor-first)] p-5 items-center fixed top-0 bg-[var(--color-Harbor-firth)]">
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
              priority
              style={{ width: 180, height: 180 }}
              className="text-[var(--color-Harbor-first)]"
            />
            <h1 className=" font-semibold text-[26px] text-[var(--color-Harbor-first)]">
              {lawyer.username}
            </h1>
            <p className=" text-[var(--color-Harbor-first)]/60 text-[22px]">
              {lawyer.email}
            </p>
          </div>
        </div>
        <div className="items-center p-20 gap-6 flex flex-col">
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
                  <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                    {lawyer.name}
                  </p>
                </div>
                <p className="w-[22vw] h-[3vh] text-[14px] px-[1.111vw] bg-white">
                  {lawyer.email}
                </p>
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">비밀번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={lawyer.password}
                  onChange={(e: any) =>
                    setLawyer({ ...lawyer, password: e.target.value })
                  }
                  className="w-[22vw] h-[3vh] text-[14px] bg-white"
                />
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyer.phone}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">Email</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyer.email}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">세부정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">Birth</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyer.birth}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">계좌</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyer.account}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">변호사 번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyer.lawyerNo}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">대학</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.university}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">학과</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.major}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">소속 정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">소속</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.belong}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">주소</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.address}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <div className="flex flex-row w-[650px] justify-between items-center">
                <p>{lawyerDetail?.addressDetail}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화번호</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.belongPhone}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
          </div>
          <div className="w-[694px] border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
            <p className="text-[var(--color-Harbor-sec)]">예약 정보</p>
            <div className="flex flex-row w-[650px] items-center px-2 pt-5">
              <p className="w-[100px]">분야</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.law}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">방문상담비용</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.visitCost}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">전화상담비용</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.phoneCost}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div className="flex flex-row w-[650px] items-center px-2">
              <p className="w-[100px]">영상상담비용</p>
              <div className="flex flex-row w-[550px] justify-between items-center">
                <p>{lawyerDetail?.videoCost}</p>
                <input type="submit" value="수정" className="px-2" />
              </div>
            </div>
            <div className="w-[650px] h-[1px] bg-[var(--color-Harbor-firth)] my-2"></div>
            <div>
              <div className="flex flex-row w-[650px] items-center px-2">
                <p
                  className="w-[100px]"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  상담가능시간
                </p>
                <div className="flex flex-row w-[550px] justify-between items-center">
                  <p>{lawyerDetail?.time}</p>
                  <input type="submit" value="수정" className="px-2" />
                </div>
              </div>
              <div
                className={`my-5 ${showCalendar ? "block" : "hidden"}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerSingleInfoPage;
