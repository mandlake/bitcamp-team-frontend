import React, { useEffect, useState } from "react";
import { Issue } from "../../_model/issue/issue";
import { userURL } from "../../common/url";
import axios from "axios";

const IssueList = (props: any) => {
  const lawyerId = props.lawyerId;
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${userURL}/issues/sse`);

    eventSource.onmessage = (event) => {
      const newIssue = JSON.parse(event.data);

      setIssues((prevIssues) => [newIssue, ...prevIssues]);
    };

    eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div id="border-2 border-[var(--color-Harbor-firth)] rounded-2xl p-5">
        {issues.length === 0 ? (
          <p>알림이 없습니다.</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id}>
              <h2>{issue.title}</h2>
              <p>{issue.content}</p>
              <p>{issue.law}</p>
              <p>{issue.date}</p>
              <p>{issue.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssueList;
