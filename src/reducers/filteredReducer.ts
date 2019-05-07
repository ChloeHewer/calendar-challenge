import { ThunkAction } from "redux-thunk";
import { ICalendarEvents } from "./calendarReducer";

// action types
export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";

// action creators
export const setSearchText = (searchText: string): ISetSearchTextAction => ({
  type: SET_SEARCH_TEXT,
  searchText
});
export const setCalendarEvents = (
  calendarFiltered: ICalendarEvents[]
): ISetCalendarEvents => ({
  type: SET_CALENDAR_EVENTS,
  calendarFiltered
});

type ThunkResult<R> = ThunkAction<
  R,
  IFilteredState,
  null,
  ICalendarEventsActions
>;

// action interfaces
export interface ISetSearchTextAction {
  type: typeof SET_SEARCH_TEXT;
  searchText: string;
}
export interface ISetCalendarEvents {
  type: typeof SET_CALENDAR_EVENTS;
  calendarFiltered: ICalendarEvents[];
}

// combining action creators

type ICalendarEventsActions = ISetCalendarEvents | ISetSearchTextAction;

export interface IFilteredState {
  calendarFiltered: ICalendarEvents[];
  searchText: string;
}

// reducer with initial state
const initialState: IFilteredState = {
  calendarFiltered: [],
  searchText: ""
};

const bookReducer = (state = initialState, action: ICalendarEventsActions) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    case SET_CALENDAR_EVENTS:
      return { ...state, calendarEvents: action.calendarFiltered };
    default:
      return state;
  }
};

export default bookReducer;
