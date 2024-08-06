"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const InquiryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectBoard, setSelectBoard] = useState({
    title: "",
    content: "",
    writer: "작성자1",
  });

  const submit = async () => {
    // const formData = new FormData();
    // formData.append("boardDto", JSON.stringify(selectBoard));
    // if (selectedFile.length == 0) {
    //   alert("파일을 선택해주세요.");
    //   return 0;
    // }
    // Array.from(selectedFile).forEach((file: File) => {
    //   formData.append("files", file);
    // });
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8082/board/save",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     alert("파일이 성공적으로 등록되었습니다.");
    //     router.push("/notification");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <div className=" border border-black w-[50vw] p-10">
          <h1 className=" text-[32px] border-b-2 p-4">건의사항 제출하기</h1>
          <input
            placeholder="제목을 입력하세요."
            className=" mt-10 w-[45vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                title: event.target.value,
              })
            }
          />
          <textarea
            className=" mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                content: event.target.value,
              })
            }
          ></textarea>
          {/* <input
            type="file"
            className="mt-4"
            onChange={(event: any) => {
              const files = event.target.files;
              setSelectedFile(Array.from(files));
            }}
            multiple
          /> */}
          <input
            type="submit"
            value="제출하기"
            className="mt-4 bg-black text-white w-[45vw] h-[44px] rounded-xl"
            onClick={submit}
          />
        </div>
      </div>
    </>
  );
};

export default InquiryPage;
