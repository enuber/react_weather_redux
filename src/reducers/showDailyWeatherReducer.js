import { SHOW_DAILY } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case SHOW_DAILY:
            return action.payload;
        default:
            return state;
    }
};