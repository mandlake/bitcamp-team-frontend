"use client";

import IssueForm from "@/components/modules/issue/NewIssueForm";
import { useState } from "react";

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

const SubmitIssuePage = (props: any) => {
  const lawyerId = props.lawyerId;
  const [issues, setIssues] = useState<Issue[]>([]);
  const handleSaveIssue = (newIssue: Issue) => {
    setIssues((prevIssues) => [...prevIssues, newIssue]);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center border gap-4 p-5">
        <h1 className="text-2xl text-center font-bold">Submit an Issue</h1>
        <IssueForm onSave={handleSaveIssue} lawyerId={lawyerId} {...props} />
      </div>
    </>
  );
};

export default SubmitIssuePage;
