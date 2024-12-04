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

export function formatDate(value: Date) {
  const date = new Date(value);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return date.toLocaleDateString("en-GB", options);
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

export const getDisplayFormats = (days: number) => {
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
  } else if (days === 90 || days === 180) {
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
  } 
};

export function formatTimestampToDate(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export function calculateProgress(unitOne: any, unitTwo: any) {
  return Math.floor((unitOne / unitTwo) * 100);
}

function uppercaseLetter(letter: string) {
  return letter.toUpperCase();
}

export function capitaliseString(string: string) {
  return string
    .split("")
    .map((el) => (el === "_" ? " " : el))
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

export function formatLink(url: string | null) {
  if (url === null) return;
  const newUrl = url.slice(8).split("").reverse().concat("www.").reverse();
  const lastIndex = newUrl.length - 1;
  if (newUrl[lastIndex] === "/") {
    newUrl.pop();
  }
  return newUrl.join("");
}

export function formatNumber(num: any) {
  if (num === null) return;
  const parts = num.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedInteger + (decimalPart ? "." + decimalPart : "");
}

export function handleCoinDateDisplay(date: Date | number, days: number) {
  switch (days) {
    case 0.0416666666666667:
    case 1:
      return Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    case 7:
    case 14:
    case 30:
    case 90:
      return Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
      }).format(date);
    case 180:
    case 365:
      return Intl.DateTimeFormat("en-GB", {
        month: "short",
        year: "numeric",
      }).format(date);
  }
}