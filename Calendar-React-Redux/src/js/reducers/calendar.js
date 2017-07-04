import {calendarInitialState} from "../constants/constants";

export default function reducer(state=calendarInitialState, action) {
  let now = new Date();
  switch (action.type) {
    case "CALENDAR_NAV_TODAY":
      return {...state,
        year: now.getFullYear(),
        month: now.getMonth(),
        thisMonthNow: true,
        thisMonthSelected: (now.getFullYear() === state.selected.year) && (now.getMonth() === state.selected.month)
      };
    case "CALENDAR_NAV_NEXT":
      let next = new Date(state.year, state.month +1, 1);
      return {...state,
        year: next.getFullYear(),
        month: next.getMonth(),
        thisMonthNow: (now.getFullYear() === next.getFullYear()) && (now.getMonth() === next.getMonth()),
        thisMonthSelected: (next.getFullYear() === state.selected.year) && (next.getMonth() === state.selected.month)
      };
    case "CALENDAR_NAV_PREV":
      let prev = new Date(state.year, state.month -1, 1);
      return {...state,
        year: prev.getFullYear(),
        month: prev.getMonth(),
        thisMonthNow: (now.getFullYear() === prev.getFullYear()) && (now.getMonth() === prev.getMonth()),
        thisMonthSelected: (prev.getFullYear() === state.selected.year) && (prev.getMonth() === state.selected.month)
      };
    case "CALENDAR_SELECT_DAY":
      return {...state, selected: action.payload, thisMonthSelected: true};
  }
  return state;
}
