import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import eventsReducers from "./store/events-reducers";
import genresReducer from "./store/genre-reducers";
import {DispatchType, EventAction, EventState} from "./type";
import {configureStore} from "@reduxjs/toolkit";
// import {EventAction, EventState} from "./type";

import store from "./store/store";

// const rootReducer = combineReducers({
//     events: eventsReducers,
//     genres: genresReducer
// });
//
// type RootState = ReturnType<typeof rootReducer>
//
//
// const store: Store<RootState, Action> & {
//     dispatch: DispatchType;
// } = configureStore({
//     reducer: rootReducer,
//     middleware: [thunk]
// });



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
