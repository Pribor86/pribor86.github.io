import {SelectedDropdownItemIdState, SelectedDropdownItemIdAction} from "../type";
import * as actionTypes from "./actionTypes";

const selectedDropdownItemIdState: SelectedDropdownItemIdState = {
    selectedDropdownItemId: '',
}

const selectedDropdownItemIdReducer =
    (state = selectedDropdownItemIdState, action: SelectedDropdownItemIdAction) => {
        switch (action.type) {
            case actionTypes.SET_SELECTED_DROPDOWN_ITEM_ID:
                return {
                    selectedDropdownItemId: action.id
                }
            default:
                return state
        }
    }

export default selectedDropdownItemIdReducer