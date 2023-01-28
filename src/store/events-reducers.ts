import {EventAction, EventState} from "../type";
import * as actionTypes from "./actionTypes";

const eventState: EventState = {
    events: [],
}

const eventsReducer = (state = eventState, action: EventAction) => {
    switch (action.type) {
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

export default eventsReducer