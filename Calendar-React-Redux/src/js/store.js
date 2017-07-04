import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import calendarReducer from "./reducers/calendar";
import {middleware} from "./middleware";
import requestEvents from "./reducers/RSEvents";
import requestTrainers from './reducers/RSTrainers'

const store = createStore(combineReducers({
  calendar: calendarReducer,
  req: requestEvents,
  trainers: requestTrainers
}),
  applyMiddleware(
    promise(),
    thunk,
    logger(),
    middleware
  ));

export default store;