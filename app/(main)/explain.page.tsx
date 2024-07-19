export const ExplainLawmatePage = () => {
  return (
    <>
      <div className="h-[300px] border-[var(--color-Harbor-sec)] border-y-2 text-[var(--color-Harbor-first)] w-[60vw] py-5 flex flex-row gap-[2vw]">
        <section className="flex flex-col items-baseline border-r">
          <h2 className=" text-[18px] mx-8 mb-2 font-semibold w-[25vw]">
            Lawmate의 주요 특징
          </h2>
          <ul className="text-[15px] flex flex-col gap-2">
            <li>
              <div className=" font-semibold">
                인공지능 기술 기반 맞춤형 법률 서비스
              </div>
              <div>개인의 상황과 문제에 맞는 최적의 해결책을 제시합니다.</div>
            </li>
            <li>
              <div className=" font-semibold">엄선된 전문 변호사 네트워크</div>
              <div>풍부한 경험과 전문성을 갖춘 변호사와 빠르게 연결</div>
            </li>
            <li>
              <div className=" font-semibold">합리적인 비용</div>
              <div>투명한 비용 체계로 예상치 못한 부담 없이 이용 가능</div>
            </li>
            <li>
              <div className=" font-semibold">안전하고 보안</div>
              <div>엄격한 정보 보호 정책으로 개인정보 안전을 최우선으로</div>
            </li>
          </ul>
        </section>

        <section className="flex flex-col items-baseline">
          <h2 className=" text-[18px] mx-8 mb-2 font-semibold w-[25vw]">
            Lawmate를 사용하면 무엇을 얻을 수 있을까요?
          </h2>
          <ul className=" text-[var(--color-Harbor-sec)]">
            <li>- 시간과 비용 절약</li>
            <li>- 보다 정확하고 효율적인 법률 서비스 제공</li>
            <li>- 법률 문제 해결에 대한 스트레스 감소</li>
          </ul>
        </section>
      </div>
    </>
  );
};
