import EventI from "../components/interfaces/EventI";
import * as actionTypes from "./actionTypes";
import GenreI from "../components/interfaces/GenreI";

export const updateEvents = (events: EventI[]) => {
    return {
        type: actionTypes.UPDATE_EVENTS,
        events
    }
}
export const addEvents = (events: EventI[]) => {
    return {
        type: actionTypes.ADD_EVENTS,
        events
    }
}
export const setGenres = (genres: GenreI[]) => {
    return {
        type: actionTypes.SET_GENRES,
        genres
    }
}
export const setSelectedGenre = (genre: string) => {
    return {
        type: actionTypes.SET_SELECTED_GENRE,
        genre
    }
}