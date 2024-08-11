"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LawyerColumnByIdPage = (props: any) => {
  const ColumnId = props.params.id;
  const options = [
    { value: "형사법", label: "형사법" },
    { value: "공법", label: "공법" },
    { value: "국제법", label: "국제법" },
    { value: "국제거래법", label: "국제거래법" },
  ];
  const dispatch = useDispatch();
  const [column, setColumn] = useState({} as any);

  const getColumn = async () => {
    // const data = await dispatch(getColumnById(ColumnId));
    // console.log(data);
    // setColumn(data.payload);
  };

  const formattedOptions = options.reduce((acc, option) => {
    return acc + " - " + option.label;
  }, "");

  useEffect(() => {
    getColumn();
  }, []);

  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col p-20 gap-10">
          <div className="font-light text-base">
            {formattedOptions.slice(3)}
          </div>
          <h1 className="font-bold text-4xl">
            형사 재판에서 &#39;공모&#39;의 의미에 대한 질문
          </h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>작성자</p>
              <div>
                <p>시작 날짜 - 끝 날짜</p>
              </div>
            </div>
          </div>
          <p className="font-light text-lg">
            범죄에 있어서 공모의 의미에 대해서 질문드립니다. 제 경우를
            단순화시켜 설명하겠습니다. 누군가(A) 재산상의 이익을 취하고자
            제3자(B)에게 교사하여 피해자(C)를 협박하게 했습니다. B는 실제로
            C에게 죽여버리겠다고 협박했습니다.
            <br />
            <br />이 경우 A에게는 협박 교사와 공갈미수의 혐의가 있는 것
            같습니다. 문제는 B가 자신이 C를 협박할 때 A가 재산상의 이익을
            얻는다는 걸 몰랐어도 협박죄와 공갈미수가 성립할 수 있나요? 협박죄는
            성립할 것 같은데, 공갈미수의 공모 혐의가 성립하는지 잘 모르겠습니다.
          </p>
          <div className="flex flex-row gap-2 text-sm">
            <p>조회수 1,000</p>
          </div>
          <div className="flex flex-row items-baseline gap-2">
            {options.map((i: any) => (
              <>
                <div className="flex flex-row justify-center items-center p-2 text-xs rounded-2xl border">
                  #{i.value}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerColumnByIdPage;
