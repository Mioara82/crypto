export function formatMarketCap(marketCap: any) {
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;

  if (marketCap >= trillion) {
    return (marketCap / trillion).toFixed(2) + "T";
  } else if (marketCap >= billion) {
    return (marketCap / billion).toFixed(2) + "B";
  } else if (marketCap >= million) {
    return (marketCap / million).toFixed(2) + "M";
  } else {
    return marketCap;
  }
}

export function roundNumber(number: number) {
  return Math.round(number).toFixed(2);
}

export function formatLabelDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const currentDate = `${month} ${day}, ${year}`;
  return currentDate;
}

export function formatDateAndTime(millisecondsFromNow: number) {
  const currentTime = new Date();
  const pastTime = new Date(currentTime.getTime() - millisecondsFromNow);
  const month = String(pastTime.getMonth() + 1).padStart(2, "0");
  const day = String(pastTime.getDate()).padStart(2, "0");
  const hour = String(pastTime.getHours()).padStart(2, "0");
  const formattedDateTime = `${month}/${day}, ${hour}:00`;
  return formattedDateTime;
}

export function checkIfIsInteger(number: number | null) {
  if (number === null) {
    return "";
  }
  return Number.isInteger(number) ? number : number.toFixed(2);
}

export const getDisplayFormats = (days: number | string) => {
  if (days === 1) {
    return {
      unit: "hour" as const,
      displayFormats: {
        hour: "HH:mm",
      },
      stepSize: 4,
    };
  } else if (days === 7) {
    return {
      unit: "day" as const,
      displayFormats: {
        day: "MMM dd",
      },
    };
  } else if (days === 14) {
    return {
      unit: "day" as const,
      displayFormats: {
        day: "MMM dd",
      },
      stepSize: 2,
    };
  } else if (days === 30) {
    return {
      unit: "day" as const,
      displayFormats: {
        day: "MMM dd",
      },
      stepSize: 4,
    };
  } else if (days === 180) {
    return {
      unit: "month" as const,
      displayFormats: {
        month: "MMM yyyy",
      },
    };
  } else if (days === 360) {
    return {
      unit: "month" as const,
      displayFormats: {
        month: "MMM yyyy",
      },
      stepSize: 2,
    };
  } else if (days === "max") {
    return {
      unit: "month" as const,
      displayFormats: {
        month: "MMM yyyy",
      },
      stepSize: 4,
    };
  }
};

export function formatTimestampToDate(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function uppercaseLetter(letter: string) {
  return letter.toUpperCase();
}

export function capitaliseString(string: string) {
  return string
    .split("")
    .map((el) => uppercaseLetter(el))
    .join("");
}

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const hexWithoutHash = hex.replace("#", "");
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
