import { getpostsfromdb, addPostsToDB, searchpostsfromdb, getAssignedpostsfromdb, searchCategoryfromdb } from "./action-type";
import { WEBSITE_URL } from '../helpers/misc.js';

export const getPosts = (data) => dispatch => {
    console.log("Data send to Server: ", data)
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
            console.log("Get Post From Client: ", res2);
            if(res2 !== null) {
                dispatch({ type: getpostsfromdb, payload: res2 })
            }
        }
        );
};

export const getAssignedPosts = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/allassigned', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From User: ", res2);
            if (res2 !== null) {
                dispatch({ type: getAssignedpostsfromdb, payload: res2 })
            }
        }
        );
};

export const searchPosts = (details) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/search', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Search: ", res2);
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