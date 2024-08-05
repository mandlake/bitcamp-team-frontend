import React, { useEffect, useState } from "react";
import { ISse } from "../../_model/issue/issue";
import { userURL } from "../../common/url";
import axios from "axios";

const IssueList = (props: any) => {
  const lawyerId = props.lawyerId;
  const [issues, setIssues] = useState<ISse[]>([]);

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
      <div id="events" className="m-10">
        <h2>알림</h2>
        <h1>변호사 {lawyerId}의 알림창</h1>
        {issues.length === 0 ? (
          <p>No Notifications</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id}>
              <h2>{issue.title}</h2>
              <p>{issue.content}</p>
              <p>{issue.law}</p>
              <p>{issue.attachment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssueList;
