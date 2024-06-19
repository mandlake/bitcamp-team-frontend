import Image from "next/image";

const LawyersBoardPage = () => {
  return (
    <>
      <div className={`flex flex-col justify-center items-center relative`}>
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <h1 className="text-[40px] font-semibold font-chosunlo">
            Lawyers Board
          </h1>
          <div className="w-[60vw] flex flex-col items-center gap-5">
            <div className="w-[60vw] border border-[var(--color-Harbor-first)] rounded-md h-[25vh]"></div>
            <div className="flex w-[60vw] flex-wrap justify-start items-baseline gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
                (item) => (
                  <div
                    key={item}
                    className=" border border-[var(--color-Harbor-first)] rounded-md text-[var(--color-Harbor-first)] items-center flex flex-col p-3  font-chosunsg"
                  >
                    <Image
                      src="https://mblogthumb-phinf.pstatic.net/MjAyMTA1MjlfNzYg/MDAxNjIyMjE1MjMwOTk5.TSOSi5EAsh3MX9bdN3W9ugQyjSBYV_I0jMkcLwN9Wkwg.6KIRElwl9bBEUu-Br1UmWMMb0Fuku_CIFNb64SttOHkg.JPEG.acttosun08/IMAGE%EF%BC%BF2020%EF%BC%BF09%EF%BC%BF18%EF%BC%BF06%EF%BC%BF09%EF%BC%BF35.jpg?type=w800"
                      className="mb-3"
                      width={150}
                      height={150}
                      alt="lawyer-image"
                    />
                    <div className="w-[155px] flex flex-col gap-2">
                      <h1 className="text-[15px] font-semibold">
                        진보라 변호사
                      </h1>
                      <div className="text-[12px] flex gap-2">
                        <div>#성매매알선</div>
                        <div>#장부단속</div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyersBoardPage;
