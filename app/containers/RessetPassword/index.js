/**
 *
 * RessetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Joi from 'joi-browser';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';
import Form from '../../components/uiStyle/Form';

import makeSelectRessetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import pass from '../../images/icon/eye2.svg';
import showPass from '../../images/icon/eye.svg';
import Image from '../../components/uiStyle/Images';

/* eslint-disable react/prefer-stateless-function */
export class RessetPassword extends React.Component {
  state = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
    currentPasswordShow: false,
    passwordShow: false,
    confirmPasswordShow: false,
    error: {},
  };

  handleClickShowPassword = current => {
    this.setState({
      [current]: !this.state[current],
    });
  };

  schema = {
    password: Joi.string()
      .required()
      .min(8)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case 'string.min':
              err.message = 'Password must be at least 8 characters long';
              break;
            case 'any.empty':
              err.message = 'Password is not allowed to be empty ';
              break;
            case 'any.allowOnly':
              err.message = '!!Passwords do not match ';
              break;
            default:
              err.message = 'Please provide valid password';
              break;
          }
        });
        return errors;
      }),
    confirmPassword: Joi.string()
      .required()
      .min(8)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case 'string.min':
              err.message = 'Password must be at least 8 characters long';
              break;
            case 'any.empty':
              err.message = 'Password is not allowed to be empty ';
              break;
            default:
              err.message = 'Please provide valid password';
              break;
          }
        });
        return errors;
      }),
    currentPassword: Joi.string()
      .required()
      .min(8)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case 'string.min':
              err.message = 'Password must be at least 8 characters long';
              break;
            case 'any.empty':
              err.message = 'Password is not allowed to be empty ';
              break;
            default:
              err.message = 'Please provide valid password';
              break;
          }
        });
        return errors;
      }),
  };

  changeHandler = event => {
    const error = { ...this.state.error };
    const errorMassage = this.validationProperty(event);
    if (errorMassage) {
      error[event.target.name] = errorMassage;
    } else {
      delete error[event.target.name];
    }
    this.setState({
      [event.target.name]: event.target.value,
      error,
    });
  };

  validationProperty = event => {
    const Obj = { [event.target.name]: event.target.value };
    const schema = { [event.target.name]: this.schema[event.target.name] };
    const { error } = Joi.validate(Obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const form = {
      currentPassword: this.state.currentPassword,
      confirmPassword: this.state.confirmPassword,
      password: this.state.password,
    };
    const { error } = Joi.validate(form, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  submitHandler = event => {
    event.preventDefault();

    let error = this.validate();

    console.log(error, '1');

    this.setState({
      error: error || {},
    });

    if (error === null) {
      if (this.state.password !== this.state.confirmPassword) {
        error = {
          confirmPassword: "Password Dosen't Match",
        };
        this.setState({
          error: error || {},
        });
        toast.error("password dosen't match!");
      } else {
        this.setState({
          currentPassword: '',
          password: '',
          confirmPassword: '',
        });
        toast.success('Successfully password reset!');
      }
    }
  };

  render() {
    const { password, confirmPassword, currentPassword } = this.state;
    return (
      <Grid container className="ressetPaddword">
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <Form onSubmit={this.submitHandler}>
            <TextField
              label="Current Password"
              className="inputStyle"
              name="currentPassword"
              variant="outlined"
              type={this.state.currentPasswordShow ? 'text' : 'password'}
              onChange={this.changeHandler}
              value={currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment className="showPassword" position="end">
                    <IconButton
                      onClick={() =>
                        this.handleClickShowPassword('currentPasswordShow')
                      }
                    >
                      <Image
                        src={this.state.currentPasswordShow ? pass : showPass}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                this.state.error.currentPassword
                  ? this.state.error.currentPassword
                  : ''
              }
            />
            <TextField
              label="Password"
              className="inputStyle"
              name="password"
              variant="outlined"
              type={this.state.passwordShow ? 'text' : 'password'}
              onChange={this.changeHandler}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment className="showPassword" position="end">
                    <IconButton
                      onClick={() =>
                        this.handleClickShowPassword('passwordShow')
                      }
                    >
                      <Image src={this.state.passwordShow ? pass : showPass} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                this.state.error.password ? this.state.error.password : ''
              }
            />
            <TextField
              label="Confirm Password"
              className="inputStyle"
              name="confirmPassword"
              variant="outlined"
              type={this.state.confirmPasswordShow ? 'text' : 'password'}
              onChange={this.changeHandler}
              value={confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment className="showPassword" position="end">
                    <IconButton
                      onClick={() =>
                        this.handleClickShowPassword('confirmPasswordShow')
                      }
                    >
                      <Image
                        src={this.state.confirmPasswordShow ? pass : showPass}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                this.state.error.confirmPassword
                  ? this.state.error.confirmPassword
                  : ''
              }
            />
            <Button type="submit" className="formSubmitBtn">
              Save
            </Button>
          </Form>
        </Grid>
      </Grid>
    );
  }
}

RessetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ressetPassword: makeSelectRessetPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'ressetPassword', reducer });
const withSaga = injectSaga({ key: 'ressetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RessetPassword);
