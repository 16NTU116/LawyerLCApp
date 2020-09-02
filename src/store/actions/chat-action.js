import {  } from "./action-type";

import { WEBSITE_URL } from '../helpers/misc.js';

export const getChatCounter = () => dispatch => {
    fetch(WEBSITE_URL + '/api/chat/counter', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Client: ", res2);
            if (res2 !== null) {
                dispatch({ type: getpostsfromdb, payload: res2 })
            }
        }
        );
};