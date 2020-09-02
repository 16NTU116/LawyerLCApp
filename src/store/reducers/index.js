import {combineReducers} from "redux";
import posts from './post-reducer';
import lawyerUser from './lawyer-reducer';
import chats from './chat-reducers';
import jobs from './job-reducers';

const rootReducers = combineReducers({
    post: posts,
    user: lawyerUser,
    chat: chats,
    job: jobs
});

export default rootReducers;