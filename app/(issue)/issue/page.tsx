"use client";
import { createEventSource } from "@/components/_service/issue/issue-api";
import IssueList from "@/components/modules/issue/IssueList";
import IssueForm from "@/components/modules/issue/NewIssueForm";
import { useEffect, useState } from "react";

interface Issue {
  id: number;
  title: string;
  content: string;
  law: string;
  attachment: string;
}

const IssuePage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const eventSource = createEventSource("/issues/sse", (newIssue: Issue) => {
      setIssues((prevIssues) => [...prevIssues, newIssue]);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const handleSaveIssue = (newIssue: Issue) => {
    setIssues((prevIssues) => [...prevIssues, newIssue]);
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0 gap-10">
      <div
        className="mt-28 w-[73vh] h-[67vh] flex rounded-[3.5vh] shadow-2xl overflow-x-auto"
        style={{ backgroundColor: "var(--form-background)" }}
      >
        <div className="w-full p-[8.5vh] justify-center items-center">
          <h1 className="text-2xl text-center font-bold">Submit an Issue</h1>
          <IssueForm onSave={handleSaveIssue} />
        </div>
      </div>
      <form className="mt-28 w-[54vh] h-[67vh]">
        <IssueList />
      </form>
    </div>
  );
};

export default IssuePage;
