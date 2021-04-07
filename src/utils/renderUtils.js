/* 
AUTHOR : ARUN
*/

import React from "react";

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} type={type} />
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderTextAreaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea className="form-control" {...input} type={type} />
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderError = (errorMessages) => {
    if (errorMessages) {
        return (
            <div className="alert alert-danger">
                {errorMessages}
            </div>
        )
    }
};

// FIX ME: This is not modular method 
export const CredentialError = (errorMessages) => {
    if (errorMessages) {
        return (
            <div className="alert alert-danger">
                Unable to log in with provided credentials.
            </div>
        )
    }
};
