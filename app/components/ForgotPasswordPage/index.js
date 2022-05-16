import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { injectIntl } from 'react-intl';
import messages from './messages';

import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

// uistyle
import Title from 'components/uiStyle/Title';
import Image from 'components/uiStyle/Images';
import Form from 'components/uiStyle/Form'

import Joi from 'joi-browser'

// images
import logo from 'images/logo.svg'

import '../SignupPage/account.scss'
import { toast } from 'react-toastify';
class ForgotPasswordPage extends Component {

  state = {
    email: '',
    error: {},
  }
  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }

  schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.email":
            err.message = "Email Must be Email Format";
            break;
          case "any.required":
            err.message = "Email is Requared";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  }
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
      error
    })
  };

  validationProperty = event => {
    const Obj = { [event.target.name]: event.target.value };
    const schema = { [event.target.name]: this.schema[event.target.name] }
    const { error } = Joi.validate(Obj, schema);
    return error ? error.details[0].message : null
  };

  validate = () => {
    const options = { abortEarly: false }
    const form = {
      password: this.state.password,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = event => {
    event.preventDefault();
    const error = this.validate();
    if (this.state.email === "") {
      this.setState({
        error: error || {}
      })
      toast.error("Enter your email first")
    } else {
      toast.success("Varification code Sended")
      this.props.history.push('/confirm-code')
    }

  }


  render() {
    return (
      <Fragment>
        <Helmet>
          <Title>{this.t({ ...messages.pageTitle })}</Title>
        </Helmet>
        <Grid className="accountArea">
          <Grid className="container" container>
            <Grid item lg={6} xs={12}>
              <Grid className="accountImage">
                <Image src={logo} alt="logo" />
                <p>Store and manage digital currencies with ease in the smart and beautiful cryptocurrency wallets.</p>
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid className="accountContent">
                <Typography variant="h3">Forgot Password ?</Typography>
                <Typography className="text" paragraph>Please enter the email address to request a password reset.</Typography>
                <Form onSubmit={this.submitHandler}>
                  <TextField
                    label="Email"
                    className="inputStyle"
                    name="email"
                    variant="outlined"
                    onChange={this.changeHandler}
                    value={this.state.email}
                    helperText={this.state.error.email ? this.state.error.email : ""}
                  />
                  <Button
                    type="submit"
                    className="submitButton"
                  >Send</Button>
                </Form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default injectIntl(withRouter(ForgotPasswordPage));
