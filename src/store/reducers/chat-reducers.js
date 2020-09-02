import { sendmsgtodb, getmsgfromdb } from "../actions/action-type"

const state = {
    newmessges: 0
}

const ChatReducer = (mState = clone(state), action) => {
    switch (action.type) {
        
        default:
            return clone(mState);
    }
}

export default ChatReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));