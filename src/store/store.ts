import {combineReducers, Store} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import eventsReducers from "./events-reducers";
import genresReducer from "./genre-reducers";
import {EventAction, GenreAction, DispatchType} from "../type";
import thunk from "redux-thunk";
import exp from "constants";

const rootReducer = combineReducers({
    events: eventsReducers,
    genres: genresReducer
});

const store: Store<RootState, EventAction | GenreAction> & {
    dispatch: DispatchType;
} = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;