"use client";

const JudicialPrecedentByIdPage = (props: any) => {
  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col p-20 gap-10">
          <p>{props.params.id}</p>
          <h1 className="font-bold text-4xl leading-snug">
            [형법] 군인이 군관사에서 폭행한 경우에도 군형법에 의하여 형법상
            반의사불벌죄 적용이 배제되는지 여부가 문제된 사건
          </h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>작성자</p>
              <div>
                <p>시작 날짜 - 끝 날짜</p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <p>첨부파일 모아보기</p>
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
        </div>
      </div>
    </>
  );
};

export default JudicialPrecedentByIdPage;
