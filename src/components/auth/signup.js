import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from'../../actions';

class Signup extends Component {

    renderError(field) {
        return (field.touched && field.error) ? <div className="error">{field.error}</div> : '';
    }

    handleFormSubmit(formProps) {
        // Call action creator to sign up the user
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label >Email:</label>
                    <input type="text" className="form-control" {...email} />
                    {this.renderError(email)}
                </fieldset>

                <fieldset className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" {...password} />
                    {this.renderError(password)}
                </fieldset>

                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" className="form-control" {...passwordConfirm} />
                    {this.renderError(passwordConfirm)}
                </fieldset>

                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = "Passwords do not match";
    }

    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);
