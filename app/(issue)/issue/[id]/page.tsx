"use client";

import { createEventSource } from "@/components/_service/issue/issue-api";
import { userURL } from "@/components/common/url";
import IssueList from "@/components/modules/issue/IssueList";
import IssueForm from "@/components/modules/issue/NewIssueForm";
import { useEffect, useState } from "react";
import { Issue } from "@/components/_model/issue/issue";

const IssuePage = (props: any) => {
  const lawyerId = props.lawyerId;
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const eventSource = createEventSource(
      userURL + `user/issues/sse`,
      (newIssue: Issue) => {
        setIssues((prevIssues) => [...prevIssues, newIssue]);
      }
    );

    return () => {
      eventSource.close();
    };
  }, []);

  const handleSaveIssue = (newIssue: Issue) => {
    setIssues((prevIssues) => [...prevIssues, newIssue]);
  };

  return (
    <div className="flex justify-center w-full px-4 sm:px-0 gap-10">
      <div className="border border-gray-300 rounded-2xl py-2 px-4">
        <div className="w-full p-2 justify-center items-center">
          <h1 className="text-2xl text-center font-bold">Submit an Issue</h1>
          <IssueForm onSave={handleSaveIssue} lawyerId={lawyerId} />
        </div>
      </div>
      <IssueList lawyerId={lawyerId} />
    </div>
  );
};

export default IssuePage;
