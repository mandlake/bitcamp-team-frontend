"use client";

import { downloadFiles } from "@/components/_service/lawyer/lawyer.service";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NorificationAddPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File[]>([] as File[]);
  const [fileId, setFileId] = useState<string[]>([]);
  const [filename, setFilename] = useState<string[]>([]);

  const handleFileChange = (event: any) => {
    setSelectedFile([...event.target.files]);
  };

  const upload = async () => {
    const formData = new FormData();

    if (selectedFile.length === 0) {
      alert("파일을 선택해주세요.");
      return 0;
    }

    Array.from(selectedFile).forEach((file: File) => {
      formData.append("file", file);
    });

    console.log(formData.get("file"));

    try {
      const response = await axios.post(
        "http://localhost:8081/files/upload/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("파일 업로드 성공");

        setFileId(response.data.map((item: { id: string }) => item.id));
        setFilename(
          response.data.map((item: { filename: string }) => item.filename)
        );
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  const handleDownload = async (index: number) => {
    if (fileId.length === 0) return;

    try {
      const response = await dispatch(downloadFiles(fileId[index]));

      const contentDisposition = response.headers["content-disposition"];
      let fileName = filename[index]; // 기본 파일 이름 설정

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // 다운로드할 파일 이름 설정

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <div className=" border border-black w-[50vw] p-10">
          <h1 className=" text-[32px] border-b-2 p-4">
            파일 업로드 및 다운로드
          </h1>
          <input
            type="file"
            onChange={(event: any) => handleFileChange(event)}
            className="mt-4"
            multiple
          />
          <input
            type="submit"
            value="업로드"
            onClick={upload}
            className="mt-4 bg-black text-white w-[45vw] h-[44px] rounded-xl"
          />

          {fileId?.map((id, index) => (
            <div key={id}>
              <span className="mt-4">{filename[index]}</span>
              <button
                onClick={() => handleDownload(index)}
                className="mt-4 bg-black text-white w-[45vw] h-[44px] rounded-xl"
              >
                다운로드
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NorificationAddPage;
