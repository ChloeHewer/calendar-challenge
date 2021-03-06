import { ThunkAction } from "redux-thunk";

// ICalendarEvents interface
export interface ICalendarEvents {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: {
    email: string;
  };
  organizer: {
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: string;
  };
  end: {
    date: string;
  };
  transparency: string;
  iCalUID: string;
  sequence: number;
  extendedProperties: {
    private: {
      everyoneDeclinedDismissed: string;
    };
  };
}

// action types
export const FETCH_CALENDAR_EVENTS = "FETCH_CALENDAR_EVENTS";
export const FETCH_CALENDAR_EVENTS_SUCCESS = "FETCH_CALENDAR_EVENTS_SUCCESS";
export const FETCH_CALENDAR_EVENTS_FAILURE = "FETCH_CALENDAR_EVENTS_FAILURE";
export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";

// action creators
export const getCalendarEvents = (): IGetCalendarEventsAction => ({
  type: FETCH_CALENDAR_EVENTS
});
export const getCalendarEventsSuccess = (
  calendarEvents: ICalendarEvents[]
): IGetCalendarEventsSuccessAction => ({
  type: FETCH_CALENDAR_EVENTS_SUCCESS,
  calendarEvents
});
export const getCalendarEventsFailure = (
  error: Error
): IGetCalendarEventsFailureAction => ({
  type: FETCH_CALENDAR_EVENTS_FAILURE,
  error
});
export const setSearchText = (searchText: string): ISetSearchTextAction => ({
  type: SET_SEARCH_TEXT,
  searchText
});

type ThunkResult<R> = ThunkAction<
  R,
  ICalendarState,
  null,
  ICalendarEventsActions
>;

export const fetchCalendar = (): ThunkResult<void> => {
  const calendarId =
    "nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com";
  const apiKey = "AIzaSyCHZijg8vL_s_cSjdz3Pc-mOz4aswss9WU";
  return dispatch => {
    dispatch(getCalendarEvents());
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?maxResults=20&key=${apiKey}`
    )
      .then(res => res.json())
      .then(data => dispatch(getCalendarEventsSuccess(data.items)))
      .catch(error => dispatch(getCalendarEventsFailure(error)));
  };
};

// action interfaces
export interface IGetCalendarEventsAction {
  type: typeof FETCH_CALENDAR_EVENTS;
}
export interface IGetCalendarEventsSuccessAction {
  type: typeof FETCH_CALENDAR_EVENTS_SUCCESS;
  calendarEvents: ICalendarEvents[];
}
export interface IGetCalendarEventsFailureAction {
  type: typeof FETCH_CALENDAR_EVENTS_FAILURE;
  error: Error;
}
export interface ISetSearchTextAction {
  type: typeof SET_SEARCH_TEXT;
  searchText: string;
}

// combining action creators

type ICalendarEventsActions =
  | IGetCalendarEventsAction
  | IGetCalendarEventsSuccessAction
  | IGetCalendarEventsFailureAction
  | ISetSearchTextAction;

export interface ICalendarState {
  calendarEvents: ICalendarEvents[];
  error: null | Error;
  loading: boolean;
  searchText: string;
}

// reducer with initial state
const initialState: ICalendarState = {
  calendarEvents: [],
  error: null,
  loading: false,
  searchText: ""
};

const bookReducer = (state = initialState, action: ICalendarEventsActions) => {
  switch (action.type) {
    case FETCH_CALENDAR_EVENTS:
      return { ...state, loading: true, error: null };
    case FETCH_CALENDAR_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        calendarEvents: action.calendarEvents
      };
    case FETCH_CALENDAR_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    default:
      return state;
  }
};

export default bookReducer;
