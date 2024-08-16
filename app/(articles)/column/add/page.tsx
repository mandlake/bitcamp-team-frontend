"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { lawyerURL } from "@/components/common/url";

// Post 타입 정의
interface Post {
  title: string;
  content: string;
  category?: string;
  fileUrls?: string[];
  lawyerId?: string;
}

// Thunk 함수 정의
export const createPost = createAsyncThunk(
  "lawyer/createPost",
  async ({
    lawyerId,
    post,
    files,
  }: {
    lawyerId: string;
    post: Post;
    files: File[];
  }) => {
    const formData = new FormData();
    formData.append("post", JSON.stringify(post));

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        lawyerURL + `/posts/save/${lawyerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Create post error:", error);
      throw error;
    }
  }
);

const ColumnBoardAddPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const accessToken = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectBoard, setSelectBoard] = useState({
    lawyerId: "",
    post: {} as Post,
    files: [] as File[],
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectBoard({
      ...selectBoard,
      post: { ...selectBoard.post, category: event.target.value },
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectBoard({
        ...selectBoard,
        files: Array.from(event.target.files),
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectBoard.files || selectBoard.files.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    try {
      const action = await dispatch(
        createPost({
          lawyerId: selectBoard.lawyerId,
          post: selectBoard.post,
          files: selectBoard.files,
        })
      );

      if (createPost.fulfilled.match(action)) {
        alert("파일이 성공적으로 등록되었습니다.");
        router.push("/"); // 원하는 페이지로 리다이렉트
      }
    } catch (error) {
      console.log("Post creation error:", error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return; // or handle the case where there's no token
    }
    setIsLoggedIn(!!accessToken);
    try {
      const decoded = jwtDecode<any>(accessToken);
      setDecodedToken(decoded);
      if (decoded.roles) {
        setSelectBoard({ ...selectBoard, lawyerId: decoded.id });
      }
    } catch (error) {
      console.log(error);
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="border border-black w-[50vw] p-10">
        <div>
          <h1 className="text-3xl border-b-2 p-4">법률상담 질문하기</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center justify-between mt-3">
            <p className="text-xl">제목</p>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSelectBoard({
                  ...selectBoard,
                  post: { ...selectBoard.post, title: event.target.value },
                })
              }
              required
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-3 pb-2">
            <p className="text-xl">카테고리</p>
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="카테고리를 입력하세요"
              className="w-10/12 p-2"
            />
          </div>
          <div className="flex items-center justify-center align-middle mt-3">
            <input
              type="file"
              className="w-[42vw] h-[44px] focus:outline-none"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <textarea
            placeholder="내용을 입력하세요."
            className="mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setSelectBoard({
                ...selectBoard,
                post: {
                  ...selectBoard.post,
                  content: event.target.value,
                  lawyerId: decodedToken.id,
                },
              })
            }
            required
          ></textarea>
          <input
            type="submit"
            value="제출하기"
            className="mt-4 bg-black text-white w-[45vw] h-[44px] rounded-xl"
          />
        </form>
      </div>
    </div>
  );
};

export default ColumnBoardAddPage;
