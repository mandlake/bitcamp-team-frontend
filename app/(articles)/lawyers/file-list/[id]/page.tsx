"use client";

import { useEffect } from "react";

const LawyerFileListPage = (props: any) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <div>
        <h1>Lawyer File List Page</h1>
      </div>
    </>
  );
};

export default LawyerFileListPage;
