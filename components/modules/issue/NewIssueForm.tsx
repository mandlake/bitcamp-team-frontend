import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { userURL } from "../../common/url";

interface IssueFormProps {
  onSave: (issue: Issue) => void;
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
}

const IssueForm: React.FC<IssueFormProps> = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Issue>();

  const onSubmit = async (data: Issue) => {
    const newIssue = { ...data, id: Date.now(), client: { id: 1 } };
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
      className="flex flex-col gap-3 shadow-none"
    >
      <input
        type="text"
        placeholder="Title"
        className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        type="text"
        placeholder="Law"
        className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
        {...register("law", { required: "Law is required" })}
      />
      {errors.law && <p className="text-red-500">{errors.law.message}</p>}

      <input
        type="text"
        placeholder="Attachment"
        className="h-[6vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
        {...register("attachment", { required: "Attachment is required" })}
      />
      {errors.attachment && (
        <p className="text-red-500">{errors.attachment.message}</p>
      )}

      <textarea
        placeholder="Describe everything about this issue here."
        className="h-[20vh] light:text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500 bg-transparent"
        {...register("content", { required: "Content is required" })}
      />
      {errors.content && (
        <p className="text-red-500">{errors.content.message}</p>
      )}

      <button
        type="submit"
        className="m-10 btn overflow-hidden relative p-3 px-8 uppercase"
      >
        Submit
      </button>
    </form>
  );
};

export default IssueForm;
