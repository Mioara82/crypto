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