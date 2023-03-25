import EventI from "../components/interfaces/EventI";
import * as actionTypes from "./actionTypes";
import GenreI from "../components/interfaces/GenreI";

import portfolioItemI from "../components/interfaces/portfolioItemI";

export const updateEvents = (events: portfolioItemI[]) => {
    return {
        type: actionTypes.UPDATE_EVENTS,
        events
    }
}
export const addEvents = (events: portfolioItemI[]) => {
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

export const setSelectedDropdownItemId = (id: string) => {
    return {
        type: actionTypes.SET_SELECTED_DROPDOWN_ITEM_ID,
        id
    }
}