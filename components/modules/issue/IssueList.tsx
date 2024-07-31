import React, { useEffect, useState } from "react";
import { ISse } from "../../_model/issue/issue";
import { userURL } from "../../common/url";

const IssueList: React.FC = () => {
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
      <div id="events" className="mt-10">
        <h2>Real-time Issues:</h2>
        {issues.length === 0 ? (
          <p>No real-time issues received yet.</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="bubble-text">
              <h2 className="bubble get">{issue.title}</h2>
              <p className="bubble get">{issue.content}</p>
              <p className="bubble get">{issue.law}</p>
              <p className="bubble get">{issue.attachment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssueList;
