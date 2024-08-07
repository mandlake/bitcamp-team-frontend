"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const QnaBoardAddPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectBoard, setSelectBoard] = useState({
    title: "",
    content: "",
    writer: "작성자1",
    email: "",
    tag: [] as any,
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleHashtagAdd = () => {
    if (inputValue.trim() !== "") {
      setSelectBoard({
        ...selectBoard,
        tag: [...selectBoard.tag, { value: inputValue }], // Create a new object with the value
      });
      setInputValue("");
    }
  };

  const handleHashtagRemove = (index: any) => {
    setSelectBoard({
      ...selectBoard,
      tag: selectBoard.tag.filter((_: any, i: any) => i !== index),
    });
  };
  const submit = async () => {
    console.log(selectBoard);
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
          <div>
            <h1 className=" text-3xl border-b-2 p-4">법률상담 질문하기</h1>
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <p className="text-xl">제목</p>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
              onChange={(event: any) =>
                setSelectBoard({
                  ...selectBoard,
                  title: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-3 pb-2">
            <p className="text-xl">태그</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="해시태그를 입력하세요"
              className="w-10/12 p-2"
            />
            <button onClick={handleHashtagAdd}>추가</button>
          </div>
          <div className="flex flex-row items-center gap-5">
            {selectBoard.tag.map((hashtag: any, index: any) => (
              <span
                key={index}
                className="flex flex-row gap-3 items-center px-2 rounded-lg bg-[var(--color-Harbor-third)] text-[var(--color-Harbor-first)] border border-[var(--color-Harbor-first)]"
              >
                # {hashtag.value}
                <Image
                  src={
                    "https://img.icons8.com/?size=100&id=OpfeY8fFZX2F&format=png&color=354649"
                  }
                  onClick={() => handleHashtagRemove(index)}
                  alt={"x"}
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
              </span>
            ))}
          </div>
          <textarea
            placeholder="내용을 입력하세요."
            className=" mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                content: event.target.value,
              })
            }
          ></textarea>
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

export default QnaBoardAddPage;
