import { addComplaint} from "../actions/action-type"

const state = {
    compalint:[],
}

const complaintReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case addComplaint:
            mState.compalint.push(action.payload);
            return clone(mState);
        default:
            return clone(mState);
    }
}

export default complaintReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));