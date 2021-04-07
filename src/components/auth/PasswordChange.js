import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { changePassword } from "../../actions/authActions";
import { renderField, renderError } from "../../utils/renderUtils";

class PasswordChange extends Component {

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
                    <h4 className="text-md-center">Change Password</h4>
                    <hr />

                    <fieldset className="form-group">
                        <Field name="curr_password" label="Current Password" component={renderField}
                            type="password" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="new_password" label="New Password" component={renderField}
                            type="password" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>


                    <fieldset className="form-group">
                        {renderError(error)}
                        <button action="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { curr_password, new_password } = values;
    var password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    if (!password_pattern.test(new_password)) {
        errors.new_password = "Not Strong (A,a,1,#) must be in password (min-8)  ";
    }
    if (curr_password === new_password) {
        errors.new_password = "It is same as previous one";
    }
    return errors;
};

export default reduxForm({
    form: "change_password",
    validate: validateForm,
    onSubmit: changePassword

})(PasswordChange);
