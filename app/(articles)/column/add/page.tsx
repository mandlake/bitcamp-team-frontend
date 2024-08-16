"use client";

import { ILawyerPost } from "@/components/_model/lawyer/lawyer";
import { createPost } from "@/components/_service/lawyer/lawyer.service";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const ColumnBoardAddPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const accessToken: string = parseCookies().accessToken;
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectBoard, setSelectBoard] = useState({
    lawyerId: "",
    post: {} as ILawyerPost,
    files: [] as File[],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectBoard({
      ...selectBoard,
      post: { ...selectBoard.post, category: event.target.value },
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectBoard({ ...selectBoard, files: filesArray });

      // 이미지 미리보기 URL 생성
      const previewUrls = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previewUrls);
    }
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("lawyerId", selectBoard.lawyerId);
    formData.append("post", JSON.stringify(selectBoard.post));

    if (selectBoard.files.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    selectBoard.files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await dispatch(createPost(formData));
      if (response.meta.requestStatus === "fulfilled") {
        alert("파일이 성공적으로 등록되었습니다.");
        router.push("/some-other-page"); // 원하는 페이지로 리다이렉트
      }
    } catch (error) {
      console.log("Post creation error:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode<any>(accessToken);
        setDecodedToken(decoded);
        setSelectBoard({ ...selectBoard, lawyerId: decoded.id });
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="border border-black w-[50vw] p-10">
        <h1 className="text-3xl border-b-2 p-4">법률상담 질문하기</h1>
        <div className="flex flex-row items-center justify-between mt-3">
          <p className="text-xl">제목</p>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
            onChange={(event) =>
              setSelectBoard({
                ...selectBoard,
                post: { ...selectBoard.post, title: event.target.value },
              })
            }
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

        {/* 이미지 미리보기 렌더링 */}
        <div className="flex flex-wrap mt-4">
          {imagePreviews.map((url, index) => (
            <div key={index} className="mr-2 mb-2">
              <img src={url} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-lg" />
            </div>
          ))}
        </div>

        <textarea
          placeholder="내용을 입력하세요."
          className="mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
          onChange={(event) =>
            setSelectBoard({
              ...selectBoard,
              post: { ...selectBoard.post, content: event.target.value },
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
  );
};

export default ColumnBoardAddPage;