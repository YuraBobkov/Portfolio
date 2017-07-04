let now = new Date();
export const calendarInitialState = {
  year: now.getFullYear(),
  month: now.getMonth(),
  thisMonthNow: true,
  thisMonthSelected: true,
  selected: {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate()
  }
};
