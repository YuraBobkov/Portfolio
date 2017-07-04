export function calendarNavToday() {
  return {
    type: "CALENDAR_NAV_TODAY",
  }
}
export function calendarNavNext() {
  return {
    type: "CALENDAR_NAV_NEXT",
  }
}
export function calendarNavPrev() {
  return {
    type: "CALENDAR_NAV_PREV"
  }
}
export function calendarSelectDay(year, month, day) {
  return {
    type: "CALENDAR_SELECT_DAY",
    payload: {
      year: year,
      month: month,
      day: day
    }
  }
}
