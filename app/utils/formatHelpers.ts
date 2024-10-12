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

export function formatDateAndTime(millisecondsFromNow: number){
  const currentTime = new Date();
  const pastTime = new Date(currentTime.getTime() - millisecondsFromNow);
  const month = String(pastTime.getMonth() + 1).padStart(2, "0");
  const day = String(pastTime.getDate()).padStart(2, "0");
  const hour = String(pastTime.getHours()).padStart(2, "0");
  const formattedDateTime = `${month}/${day}, ${hour}:00`;
  return formattedDateTime;
}

export function checkIfIsInteger(number:number){
  return Number.isInteger(number) ? number : number.toFixed(2);
}