import { addComplaint } from "./action-type";
import { ToastAndroid } from "react-native";
import { WEBSITE_URL } from '../helpers/misc.js';

export const PostComplaint = (data) => dispatch => {
    console.log("Data is: ", data);
    fetch(WEBSITE_URL + '/api/complaint/l', {
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            if(res2.success = 0)
                return ToastAndroid.show(res2.message, ToastAndroid.SHORT);
            dispatch({ type: addComplaint, payload: res2.data})
        }
    );
};
