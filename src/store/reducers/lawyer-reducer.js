import { addLawyer, updateLawyer, loginLawyer } from "../actions/action-type"

const state = {
    lawyer:[]
}

const lawyerReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case addLawyer:
            mState.lawyer = action.payload;
            return clone(mState);
        case loginLawyer:
                mState.lawyer = action.payload.data;
                mState.token = "Bearer " + action.payload.token;
                return clone(mState);
        case updateLawyer:
                mState.lawyer = action.payload.data;
                return clone(mState);
        default:
            return clone(mState);
    }
}

export default lawyerReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));