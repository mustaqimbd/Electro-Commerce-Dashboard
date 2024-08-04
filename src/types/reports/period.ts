export type TPeriod =
  | "Select date"
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "lastYear"
  | "yearly"
  | "customDate"
  | "customRange";

export type TReportsQuery = {
  type: TPeriod;
  customDate?: string;
  startDate?: string;
  endDate?: string;
};
