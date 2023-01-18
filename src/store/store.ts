import {combineReducers, Store} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import eventsReducers from "./events-reducers";
import genresReducer from "./genre-reducers";
import {EventAction, GenreAction, DispatchType, SelectedGenreAction} from "../type";
import thunk from "redux-thunk";
import selectedGenreReducer from "./setGenreId-reducer";

const rootReducer = combineReducers({
    events: eventsReducers,
    genres: genresReducer,
    selectedGenreId: selectedGenreReducer
});

const store: Store<RootState,
        EventAction |
        GenreAction |
        SelectedGenreAction>
    & {
    dispatch: DispatchType;
} = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;