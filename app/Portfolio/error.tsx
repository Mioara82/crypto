"use client";

import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiAlertTriangle,
  FiWifi,
  FiServer,
  FiClock,
} from "react-icons/fi";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Error classification function
const classifyError = (error: Error) => {
  const errorMessage = error.message.toLowerCase();
  const errorStack = error.stack?.toLowerCase() || "";

  // API Rate Limit Errors
  if (
    errorMessage.includes("rate limit") ||
    errorMessage.includes("too many requests") ||
    errorMessage.includes("429") ||
    errorStack.includes("rate limit")
  ) {
    return {
      type: "rate_limit",
      title: "API Rate Limit Exceeded",
      description:
        "We've hit our API rate limit. This usually resolves itself within a few minutes.",
      icon: FiClock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      suggestion:
        "Please wait a few minutes and try again, or try refreshing the page.",
    };
  }

  // Network/Connection Errors
  if (
    errorMessage.includes("network") ||
    errorMessage.includes("fetch") ||
    errorMessage.includes("connection") ||
    errorMessage.includes("timeout") ||
    errorStack.includes("network")
  ) {
    return {
      type: "network",
      title: "Network Connection Error",
      description:
        "Unable to connect to our servers. Please check your internet connection.",
      icon: FiWifi,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      suggestion: "Check your internet connection and try refreshing the page.",
    };
  }

  // API Response Errors
  if (
    errorMessage.includes("invalid response") ||
    errorMessage.includes("no data received") ||
    errorMessage.includes("coingecko") ||
    errorMessage.includes("api")
  ) {
    return {
      type: "api",
      title: "Data Service Error",
      description:
        "We're having trouble getting the latest cryptocurrency data.",
      icon: FiServer,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      suggestion:
        "This is usually temporary. Try refreshing the page in a few moments.",
    };
  }

  // Authentication/Authorization Errors
  if (
    errorMessage.includes("unauthorized") ||
    errorMessage.includes("authentication") ||
    errorMessage.includes("auth") ||
    errorMessage.includes("login")
  ) {
    return {
      type: "auth",
      title: "Authentication Error",
      description: "There was a problem with your account authentication.",
      icon: FiAlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      suggestion: "Try logging out and logging back in, or refresh the page.",
    };
  }

  // Generic/Unknown Errors
  return {
    type: "unknown",
    title: "Something went wrong",
    description: "An unexpected error occurred while loading your portfolio.",
    icon: FiAlertTriangle,
    color: "text-common-red",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    suggestion:
      "Try refreshing the page. If the problem persists, please contact support.",
  };
};

const PortfolioError: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const errorInfo = classifyError(error);
  const IconComponent = errorInfo.icon;

  const handleReset = () => {
    reset();
  };

  return (
    <div className="relative">
      <main className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full max-w-2xl rounded-xl border ${errorInfo.borderColor} ${errorInfo.bgColor} p-8 text-center shadow-lg`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${errorInfo.bgColor}`}
          >
            <IconComponent className={`h-8 w-8 ${errorInfo.color}`} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4 text-2xl font-bold text-light-primaryTextColor dark:text-dark-text lg:text-3xl"
          >
            {errorInfo.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6 text-light-secondaryTextColor dark:text-dark-textFocus lg:text-lg"
          >
            {errorInfo.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor"
          >
            {errorInfo.suggestion}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-common-purple to-common-cyan px-8 py-3 text-light-primary shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-common-purple focus:ring-offset-2 dark:focus:ring-offset-dark-primaryBg"
          >
            <FiRefreshCw className="h-5 w-5" />
            <span className="font-medium">Try Again</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() => (window.location.href = "/")}
              className="text-sm text-light-secondaryTextColor hover:text-common-purple dark:text-dark-chartTextColor dark:hover:text-common-cyan"
            >
              Go to Homepage
            </button>
            <span className="hidden text-light-secondaryTextColor dark:text-dark-chartTextColor sm:inline">
              •
            </span>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-light-secondaryTextColor hover:text-common-purple dark:text-dark-chartTextColor dark:hover:text-common-cyan"
            >
              Reload Page
            </button>
          </motion.div>
          {process.env.NODE_ENV === "development" && (
            <motion.details
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 text-left"
            >
              <summary className="cursor-pointer text-sm font-medium text-light-secondaryTextColor hover:text-common-purple dark:text-dark-chartTextColor dark:hover:text-common-cyan">
                Error Details (Development)
              </summary>
              <div className="mt-4 rounded-lg bg-light-primaryBg p-4 dark:bg-dark-darkBg">
                <p className="mb-2 text-xs font-medium text-light-primaryTextColor dark:text-dark-text">
                  Error Message:
                </p>
                <p className="mb-4 text-xs text-common-red">{error.message}</p>

                {error.stack && (
                  <>
                    <p className="mb-2 text-xs font-medium text-light-primaryTextColor dark:text-dark-text">
                      Stack Trace:
                    </p>
                    <pre className="max-h-40 overflow-auto text-xs text-light-secondaryTextColor dark:text-dark-chartTextColor">
                      {error.stack}
                    </pre>
                  </>
                )}

                {error.digest && (
                  <>
                    <p className="mb-2 mt-4 text-xs font-medium text-light-primaryTextColor dark:text-dark-text">
                      Error Digest:
                    </p>
                    <p className="text-xs text-light-secondaryTextColor dark:text-dark-chartTextColor">
                      {error.digest}
                    </p>
                  </>
                )}
              </div>
            </motion.details>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default PortfolioError;
