import moment from "moment-timezone";

export function getTodayDateInIst() {
  return moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
}

export function getPlusOneMonthDate() {
  const today = getTodayDateInIst();
  const date = moment(today).add(1, "month").format("YYYY-MM-DD");
  return date;
}

export function getPlusOneYearDate() {
  const today = getTodayDateInIst();
  const date = moment(today).add(1, "year").format("YYYY-MM-DD");
  return date;
}

export const convertToRupee = (amount: number) => {
  return amount / 100;
};
