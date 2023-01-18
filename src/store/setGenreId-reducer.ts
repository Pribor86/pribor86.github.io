import {SelectedGenreState, SelectedGenreAction} from "../type";
import * as actionTypes from "./actionTypes";

const selectedGenreState: SelectedGenreState = {
    selectedGenre: '',
}

const selectedGenreReducer = (state = selectedGenreState, action: SelectedGenreAction) => {
    switch(action.type) {
        case actionTypes.SET_SELECTED_GENRE:
            return {
                selectedGenre: action.genre
            }
        default:
            return state
    }
}

export default selectedGenreReducer