import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError } from "../../utils/renderUtils";
import { loginUser } from "../../actions/authActions";

class Login extends Component {

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
                    <h4 className="text-md-center">Log In</h4>
                    <hr />
                    {renderError(error)}
                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                            type="text" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={renderField}
                            type="password" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>

                    <fieldset className="form-group">

                        <button action="submit" className="btn btn-primary">Login</button>
                    </fieldset>

                    <p>Not registered? <Link to="/signup">Signup Here!</Link></p>
                    <Link to="/reset_password">forgot password?</Link>
                </form>
            </div>
        )
    }
}
const validateForm = values => {
    const errors = {};
    const { email } = values;

    var email_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!email_pattern.test(email)) {
        errors.email = "Please enter valid email address.";
    }


    return errors;
};
export default reduxForm({
    form: "login",
    validate: validateForm,
    onSubmit: loginUser
})(Login);
