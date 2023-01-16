import {GenreState, GenreAction} from "../type";
import * as actionTypes from "./actionTypes";

const genreState: GenreState = {
    genres: [],
}

const genresReducer = (state = genreState, action: GenreAction) => {
    switch(action.type) {
        case actionTypes.SET_GENRES:
            return {
                genres: action.genres
            }
        default:
            return state
    }
}

export default genresReducer