import Link from "next/link";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { userURL } from "../../common/url";
import UserId from "@/components/hooks/userId";

interface IssueFormProps {
  onSave: (issue: Issue) => void;
  lawyerId: string;
}

interface Issue {
  id: number;
  title: string;
  content: string;
  law: string;
  attachment: string;
  client?: {
    id?: number;
  };
  lawyer?: string;
}

const IssueForm: React.FC<IssueFormProps> = (props: any) => {
  const onSave = props.onSave;
  const userId = parseInt(UserId() || "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Issue>();

  const onSubmit = async (data: Issue) => {
    const newIssue = { ...data, client: { id: userId } };
    try {
      await fetch(`${userURL}/issues/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIssue),
      });
      console.log("Issue saved:", newIssue);
      onSave(newIssue);
      reset(); // 폼 리셋
    } catch (error) {
      console.error("Error saving issue:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3"
    >
      <p>
        사용자 {UserId()}가 변호사 {props.lawyerId || ""}에게 보내는 알림
      </p>
      <input
        type="hidden"
        value={props.lawyerId}
        {...register("lawyer", { required: true })}
      ></input>
      <input
        type="text"
        placeholder="Title"
        value={`사용자 ${UserId()}가 변호사 ${
          props.lawyerId || ""
        }에게 보내는 알림`}
        className="text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        type="text"
        placeholder="Law"
        className="text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
        {...register("law", { required: "Law is required" })}
      />
      {errors.law && <p className="text-red-500">{errors.law.message}</p>}

      <input
        type="text"
        placeholder="Attachment"
        value={`${props.date} ${props.time}에 ${props.consultingType}을 요청합니다.`}
        className="text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
        {...register("attachment", { required: "Attachment is required" })}
      />
      {errors.attachment && (
        <p className="text-red-500">{errors.attachment.message}</p>
      )}

      <textarea
        placeholder="Describe everything about this issue here."
        className="text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 bg-transparent"
        {...register("content", { required: "Content is required" })}
      />
      {errors.content && (
        <p className="text-red-500">{errors.content.message}</p>
      )}
      <button
        type="submit"
        className="w-[22vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
      >
        전송
      </button>
    </form>
  );
};

export default IssueForm;
