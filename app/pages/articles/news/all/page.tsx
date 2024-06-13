"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NewsAllPage = () => {
  const router = useRouter();
  return (
    <>
      <div className=" px-[10vw]">
        <div className=" flex flex-row justify-between items-center">
          <h1 className="text-[8vw] font-normal">Examples 2</h1>
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="w-[80vw] h-[30vh] border-2 border-black">
              <img
                className="w-[80vw] h-[20vh]"
                alt="news-image"
                src="https://www.shutterstock.com/image-illustration/abstract-watercolor-smear-blot-painting-260nw-1976207843.jpg"
                onClick={() =>
                  router.push(`/pages/articles/news/details/${item}`)
                }
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsAllPage;
