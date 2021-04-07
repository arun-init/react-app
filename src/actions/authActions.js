import axios from "axios";
import { SubmissionError } from 'redux-form';
import history from "../utils/historyUtils";
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";
import store from "../store";
import { getUserToken } from "../utils/authUtils";

export function authLogin(token) {
    return {
        type: AuthTypes.LOGIN,
        payload: token
    };
}
// LOGIN
export function loginUser(formValues, dispatch, props) {
    const loginUrl = AuthUrls.LOGIN;

    return axios.post(loginUrl, formValues).then((response) => {

        const authtoken = response.data.data.auth_token;
        dispatch(authLogin(authtoken));

        localStorage.setItem("auth_token", authtoken);
        history.push("/");
    }).catch(error => {

        const processedError = processServerError((error.response.data));
        processedError._error = error.response.data.error.message;
        throw new SubmissionError(processedError);
    });
}

//LOGOUT
export function logoutUser() {
    localStorage.removeItem("auth_token");
    return {
        type: AuthTypes.LOGOUT
    };
}

// SIGNUP
export function signupUser(formValues, dispatch, props) {
    const signupUrl = AuthUrls.SIGNUP;

    var payload = {
        "email": formValues.email,
        "mobile_number": formValues.mobile_number,
        "password": formValues.password1
    }
    return axios.post(signupUrl, payload)
        .then((response) => {

            history.push("/signup_done");
        })
        .catch((error) => {

            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);

        });
}

function setUserProfile(payload) {

    return {
        type: AuthTypes.USER_PROFILE,
        payload: payload
    };
}
// GET : me/profile/
export function getUserProfile() {
    return function (dispatch) {
        const token = getUserToken(store.getState());

        if (token) {
            axios.get(AuthUrls.USER_PROFILE, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }


            }).then(response => {
                dispatch(setUserProfile(response.data))
            }).catch((error) => {
                console.log(error);
                // TODO: send notification some login in your accout
            });
        }
    };
}
// USER PASSWORD CHANGE
export function changePassword(formValues, dispatch, props) {
    const changePasswordUrl = AuthUrls.USER_CHANGE_PASSWORD;
    const token = getUserToken(store.getState());

    if (token) {
        return axios.put(changePasswordUrl, formValues, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                dispatch(notifSend({
                    message: "Password has been changed successfully",
                    kind: "info",
                    dismissAfter: 5000
                }));
                // redirect to the route '/profile'
                history.push("/profile");
            })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                const processedError = processServerError(error.response.data);
                processedError._error = "Current Password is not correct ";
                throw new SubmissionError(processedError);
            });
    }
}

// Account Password Reset
export function resetPassword(formValues, dispatch, props) {
    const resetPasswordUrl = AuthUrls.EMAIL_RESET_PASSWORD;
    return axios.post(resetPasswordUrl, formValues)
        .then(response => {
            history.push("/email_sent");
        }).catch((error) => {

            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

//Confirm password Reset
export function confirmPasswordChange(formValues, dispatch, props) {
    const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
    const password = formValues.new_password1;
    const param = props.location.search
    const token = param.split('=')[1];
    var data = {
        "token": token,
        "password": password
    }
    console.log(data);
    return axios.post(resetPasswordConfirmUrl, data)
        .then(response => {
            dispatch(notifSend({
                message: "Password has been reset successfully, please log in",
                kind: "info",
                dismissAfter: 5000
            }));

            history.push("/login");
        }).catch((error) => {
            const processedError = processServerError(error.response.data);
            processedError._error = error.response.data.error.message;
            throw new SubmissionError(processedError);
        });
}
//Activate account
export function activateUserAccount(formValues, dispatch, props) {
    const activateUserUrl = AuthUrls.USER_ACTIVATION;
    const param = props.location.search

    const token = param.split('=')[1];
    const payload = {
        "token": token
    }
    console.log(payload);
    return axios.post(activateUserUrl, payload)
        .then(response => {
            dispatch(notifSend({
                message: "Your account has been activated successfully, please log in",
                kind: "info",
                dismissAfter: 5000
            }));

            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            processedError._error = "Link is Expire or Invalid ";
            throw new SubmissionError(processedError);
        });
}

//UPDATE USER PROFILE
export function updateUserProfile(formValues, dispatch, props) {
    const token = getUserToken(store.getState());

    return axios.put(AuthUrls.USER_PROFILE, formValues, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(notifSend({
                message: "Your profile has been updated successfully",
                kind: "info",
                dismissAfter: 5000
            }));

            history.push("/profile");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);

            throw new SubmissionError(processedError);
        });
}
//UTIL FUNCTION
function processServerError(error) {
    return Object.keys(error).reduce(function (newDict, key) {
        if (key === "non_field_errors") {
            newDict["_error"].push(error[key]);
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else {
            newDict[key] = error[key];
        }

        return newDict
    }, { "_error": [] });
}