import { getlawyerpostsfromdb, addLawyerPostsToDB, searchpostsfromdb, getMypostsfromdb, searchCategoryfromdb } from "./action-type";
import { WEBSITE_URL } from '../helpers/misc.js';

export const getLawyerPosts = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/all', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Lawyer: ", res2);
            if(res2 !== null) {
                dispatch({ type: getlawyerpostsfromdb, payload: res2 })
            }
        }
        );
};

export const getMyPosts = (id) => dispatch => {
    fetch(WEBSITE_URL + '/api/lawyerpost/me', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Server2: ", res2);
            if (res2 !== null) {
                dispatch({ type: getMypostsfromdb, payload: res2 })
            }
        }
        );
};

export const sendLawyerPost = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/lawyerpost', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            if (res2.success == 0)
                return alert(res2.message);
            dispatch({ type: addLawyerPostsToDB, payload: res2.data })
        }
        );
};

export const searchPosts = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/lawyerpost/searchById', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From SearchById: ", res2);
            if(res2 !== null) {
                dispatch({ type: searchpostsfromdb, payload: res2 })
            }
        }
        );
};

export const searchCategoryPosts = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/byCategory', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Search Category: ", res2);
            if(res2 !== null) {
                dispatch({ type: searchCategoryfromdb, payload: res2 })
            }
        }
        );
};