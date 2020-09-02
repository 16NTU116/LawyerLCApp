import { getpostsfromdb, addPostsToDB, searchpostsfromdb, getAssignedpostsfromdb, searchCategoryfromdb } from "../actions/action-type"

const state = {
    posts: [],
    lpost: [],
    searchPost: [],
    assignedPosts: [],
    categoryPost: [],
}

const postReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case getpostsfromdb:
            mState.posts = action.payload;
            return clone(mState);
        case getAssignedpostsfromdb:
            mState.assignedPosts = action.payload;
            return clone(mState);
        case addPostsToDB:
            mState.posts.push(action.payload);
            return clone(mState);
        case searchpostsfromdb:
            mState.searchPost = action.payload;
            return clone(mState);
        case searchCategoryfromdb:
            mState.categoryPost = action.payload;
            return clone(mState);
        default:
            return clone(mState);
    }
}

export default postReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));