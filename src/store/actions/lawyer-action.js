import { addLawyer, updateLawyer, loginLawyer } from "./action-type";
import { ToastAndroid } from "react-native";
import { WEBSITE_URL } from '../helpers/misc.js';

import AsyncStorage from '@react-native-community/async-storage';

const saveMutipleData = async (data, id) => {
    try {
        const items = [["DATA_KEY", data], ["ID_KEY", id]]
        await AsyncStorage.multiSet(items, () => (console.log('Data successfully saved')))

    } catch (e) {
        return console.log("Data Unsuccess");
    }
}

export const getUsers = (id) => dispatch => {
    fetch(WEBSITE_URL + '/api/lawyerusers/me', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    }).
        then(res => res.json()).
        then(res2 => {
            // console.log("Get From User 2: ", res2);
            // ToastAndroid.show("oh ue ye" + res2, ToastAndroid.LONG);
            return dispatch({ type: addLawyer, payload: res2 });
        }
        );
};

export const addUser = (data) => dispatch => {
    console.log("Data is: ", data)
    fetch(WEBSITE_URL + '/api/lawyerusers', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            if (res2.success == 1) {
                return dispatch({ type: addLawyer, payload: res2 });
            }
            else {
                return ToastAndroid.show(res2.message, ToastAndroid.LONG);
            }
        }
        );
};

export const LoginUser = (data) => dispatch => {
    console.log("Data is: ", data);
    fetch(WEBSITE_URL + '/api/lauth', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            if (res2.success == 1) {
                console.log("........", res2);
                saveMutipleData(res2.token, res2.data._id);
                ToastAndroid.show(res2.message, ToastAndroid.LONG);
                return dispatch({ type: loginLawyer, payload: res2 });
            }
            else
                return ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
        );
};

export const UpdateUser = (data, id) => dispatch => {
    console.log("Data is: ", data);
    fetch(WEBSITE_URL + '/api/lawyerusers/' + id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            if (res2.success == 1) {
                console.log(res2.message);
                ToastAndroid.show(res2.message, ToastAndroid.LONG);
                return dispatch({ type: updateLawyer, payload: res2 });
            }
            else
                return ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
        );
};
