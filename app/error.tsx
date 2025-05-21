"use client";

import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
  message?: string;
}
function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errMessage = err?.message || "An unexpected error occurred";
  return { statusCode };
};

export default ErrorPage;
