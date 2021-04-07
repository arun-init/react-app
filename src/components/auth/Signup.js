import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError } from "../../utils/renderUtils";
import { signupUser } from "../../actions/authActions";
import validator from 'validator';
import { max } from "lodash-es";

class Signup extends Component {

    static propTypes = {
        ...propTypes
    };


    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="row justify-content-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Sign Up</h4>
                    <hr />

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                            type="text" validate={[required({ message: "This field is required." })]} />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="mobile_number" label="Mobile Number" component={renderField}
                            type="text" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password1" label="Password" component={renderField}
                            type="password" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password2" label="Confirm Password" component={renderField}
                            type="password" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>



                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-primary">Sign Up</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { email, mobile_number } = values;
    const { password1, password2 } = values;
    var email_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var mobile_pattern = new RegExp(/^[0-9\b]+$/);
    var password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    if (!email_pattern.test(email)) {
        errors.email = "Please enter valid email address.";
    }
    if (!mobile_pattern.test(mobile_number)) {
        errors.mobile_number = " Must 10 Digit Mobiel Number."
    }
    if (!password_pattern.test(password1)) {
        errors.password1 = "Must Strong (A,a,1,#) must be in password (min-8)  "
    }

    if (password1 !== password2) {
        errors.password2 = "Password does not match."
    }

    return errors;
};

export default reduxForm({
    form: "signup",
    validate: validateForm,
    onSubmit: signupUser
})(Signup);
