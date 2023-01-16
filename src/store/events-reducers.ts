// import EventI from "../components/interfaces/EventI";
import {EventAction, EventState} from "../type";
import * as actionTypes from "./actionTypes";
import EventI from "../components/interfaces/EventI";

const eventState: EventState = {
    events: [],
}

const eventsReducer = (state = eventState, action: EventAction) => {
    console.log('eventsReducer', action)
    switch(action.type) {
        case actionTypes.UPDATE_EVENTS:
            return {
                events: action.events
            }
        case actionTypes.ADD_EVENTS:
            return {
                events: [...state.events, ...action.events]
            }
        default:
            return state
    }
}

// const genresReducer = (state = genreState, action: GenreAction) => {
//     switch(action.type) {
//         case actionTypes.SET_GENRES:
//             return {
//                 genres: action.genres
//             }
//         default:
//             return state
//     }
// }

export default eventsReducer