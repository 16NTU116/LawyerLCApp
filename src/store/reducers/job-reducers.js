import { getlawyerpostsfromdb, getLawyerAssignedpostsfromdb, getMypostsfromdb, addLawyerPostsToDB, searchpostsfromdb, searchCategoryfromdb } from "../actions/action-type"

const state = {
    lpost: [],
    searchPost: [],
    assignedPosts: [],
    myPosts: [],
}

const jobReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case getlawyerpostsfromdb:
            mState.lpost = action.payload;
            return clone(mState);
        case getLawyerAssignedpostsfromdb:
            mState.assignedPosts = action.payload;
            return clone(mState);
        case addLawyerPostsToDB:
            mState.lpost.push(action.payload);
            mState.myPosts.push(action.payload);
            return clone(mState);
        case getMypostsfromdb:
            mState.myPosts = action.payload;
            return clone(mState);
        // case searchpostsfromdb:
        //     mState.searchPost = action.payload;
        //     return clone(mState);
        // case searchCategoryfromdb:
        //     mState.categoryPost = action.payload;
        //     return clone(mState);
        default:
            return clone(mState);
    }
}

export default jobReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));