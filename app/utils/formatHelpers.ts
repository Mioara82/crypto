export function formatMarketCap(marketCap: number) {
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
    return Number(marketCap).toFixed(0);
  }
}

export function roundNumber(number: number) {
  return Math.round(number).toFixed(2);
}

export function roundTo4Decimals(number: number) {
  return Math.round(number * 10000) / 10000;
}

export function formatString(str: string) {
  if (str.length > 8) {
    return str.slice(0, 8).concat("..");
  }
  return str;
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

export function formatHistoricDate(date: any) {
  return date.split("-").reverse().join("-");
}

export function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
}

export function formatDateToDDMMYYYY(date: any) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function checkIfIsInteger(number: number | null) {
  if (number === null) {
    return "";
  }
  return Number.isInteger(number) ? number : number.toFixed(2);
}

export const calculateNumberOfBars = (days: number) => {
  if (days === 1) {
    return 24;
  } else if (days === 7) {
    return 96;
  } else if (days === 14) {
    return 14 * 12;
  } else if (days === 30) {
    return 30;
  } else {
    return 60;
  }
};

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

export const formatTimestampToDateAndTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function calculateProgress(unitOne: any, unitTwo: any) {
  return Math.floor((unitOne / unitTwo) * 100);
}

function uppercaseLetter(letter: string) {
  return letter.toUpperCase();
}

export function capitaliseString(string: string) {
  if (!string) return "";
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

export function formatInvestmentChartDate(date: Date | number) {
  return Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

export const getDisplayCoin = (value: string, list: any) => {
  if (!list && list.length === 0) {
    return { name: "Bitcoin" };
  }
  return list.find((coin: any) => {
    if (value === "") {
      return coin.name.toLowerCase() === "bitcoin";
    } else {
      return coin.name.toLowerCase() === value.toLowerCase();
    }
  });
};

export function calculateTotalInvestmentPerGrowth(
  initial: number,
  growRate: number,
  interval: number,
  start: string,
  end: string,
): number {
  let totalAmount: number = Number(initial);
  const differenceInDays: number = getInvestmentDuration(start, end);
  for (let i = 1; i <= differenceInDays; i += interval) {
    totalAmount += (totalAmount * growRate) / 100;
  }
  return Number(totalAmount.toFixed());
}

export function calculateTotalInvestmentPerInvestmentAdded(
  initial: number,
  additional: number,
  interval: number,
  start: string,
  end: string,
): number {
  let totalAmount: number = Number(initial);
  const differenceInDays = getInvestmentDuration(start, end);
  for (let i = 1; i <= differenceInDays; i += interval) {
    totalAmount += Number(additional);
  }
  return Number(totalAmount);
}

export function convertDateToTimestamp(date: string) {
  const newDate = new Date(date.split(" ").join("T"));
  return newDate.getTime() / 1000;
}

export const generatePurchaseDates = (
  startDate: string,
  endDate: string,
  interval: number,
): number[] => {
  const purchaseTimestamps: number[] = [];
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();

  let currentTimestamp = startTimestamp;

  while (currentTimestamp <= endTimestamp) {
    purchaseTimestamps.push(currentTimestamp);
    currentTimestamp += interval * 24 * 60 * 60 * 1000;
  }

  return purchaseTimestamps;
};

export function getInvestmentDuration(start: string, end: string) {
  const firstDate = new Date(start);
  const lastDate = new Date(end);
  const difference = lastDate.getTime() - firstDate.getTime();
  const differenceInDays = Math.round((difference / 1000) * 3600 * 24);
  return differenceInDays;
}

export const calculateCoinsWithRegularInvestments = (
  pricesForPurchaseDates: number[],
  initialInvestment: number,
  intervalInvestment: number,
  currentPrice: number,
) => {
  let totalCoins = 0;
  pricesForPurchaseDates.forEach((price, index) => {
    const investment = index === 0 ? initialInvestment : intervalInvestment;
    const coinsPurchased = investment / price;
    totalCoins += coinsPurchased;
  });
  const totalCoinsValue = Math.floor(totalCoins * currentPrice);
  return totalCoinsValue;
};

export const calculateCoinsWithGrowthRate = (
  pricesForPurchaseDates: number[],
  initialInvestment: number,
  growthRate: number,
  currentPrice: number,
) => {
  let currentInvestment = initialInvestment;
  let totalCoins = 0;
  let totalCoinsValue = 0;
  pricesForPurchaseDates.forEach((price) => {
    const coinsPurchased = currentInvestment / price;
    totalCoins += coinsPurchased;
    currentInvestment *= 1 + growthRate / 100;
  });
  totalCoinsValue = Math.floor(totalCoins * currentPrice);
  return totalCoinsValue;
};
