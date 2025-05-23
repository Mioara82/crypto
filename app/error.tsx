"use client";

import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
  message?: string;
}

function ErrorPage({ statusCode, message }: ErrorProps) {
  return (
    <div>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err?.message || "An unexpected error occurred";
  return { statusCode, message };
};

export default ErrorPage;
