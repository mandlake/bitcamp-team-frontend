import Image from "next/image";
import { useRouter } from "next/navigation";

export const RecommendedLawyerPage = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className="h-[350px] border-[var(--color-Harbor-sec)] border-y-2 p-5 w-[60vw] text-[var(--color-Harbor-first)] flex flex-col gap-5">
          <p className=" text-[18px] mx-8 font-semibold">추천 변호사</p>
          <div className="h-[181px] animate__animated animate__fadeInRight animate__slow ease-in flex flex-wrap items-center justify-center gap-7">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className=" border border-[var(--color-Harbor-sec)] text-[var(--color-Harbor-first)] items-center flex flex-col py-5 px-3"
              >
                <div className="w-[120px] h-[130px] mb-3">
                  <Image
                    src="https://mblogthumb-phinf.pstatic.net/MjAyMTA1MjlfNzYg/MDAxNjIyMjE1MjMwOTk5.TSOSi5EAsh3MX9bdN3W9ugQyjSBYV_I0jMkcLwN9Wkwg.6KIRElwl9bBEUu-Br1UmWMMb0Fuku_CIFNb64SttOHkg.JPEG.acttosun08/IMAGE%EF%BC%BF2020%EF%BC%BF09%EF%BC%BF18%EF%BC%BF06%EF%BC%BF09%EF%BC%BF35.jpg?type=w800"
                    width={140}
                    height={160}
                    alt="lawyer-image"
                  />
                </div>
                <div className="w-[155px] flex flex-col gap-2">
                  <h1 className="text-[15px] font-semibold">진보라 변호사</h1>
                  <div className="text-[13px] flex gap-2">
                    <div>#성매매알선</div>
                    <div>#장부단속</div>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={() => router.push("/lawyers")}>
              <Image
                src="https://img.icons8.com/?size=100&id=45286&format=png&color=000000"
                width={22}
                height={22}
                alt="arrow-right"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
