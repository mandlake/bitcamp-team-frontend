import Link from "next/link";
import { useState } from "react";
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
  date: string;
  time: string;
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
      <input
        type="hidden"
        value={props.lawyerId}
        {...register("lawyer", { required: true })}
      ></input>
      <input
        type="text"
        placeholder="제목"
        className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] bg-white"
        {...register("title", { required: "제목을 입력해 주세요." })}
      />
      {errors.title && (
        <p className="text-red-500 text-xs">{errors.title.message}</p>
      )}

      <input
        type="text"
        placeholder="분야"
        className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] bg-white"
        {...register("law", { required: "분야를 입력해 주세요." })}
      />
      {errors.law && (
        <p className="text-red-500 text-xs">{errors.law.message}</p>
      )}

      <textarea
        placeholder="상담 내용"
        className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] bg-white"
        {...register("content", { required: "내용을 입력해 주세요." })}
      />
      {errors.content && (
        <p className="text-red-500 text-xs">{errors.content.message}</p>
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
