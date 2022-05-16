import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

import { withRouter } from 'react-router-dom';

import { Grid, Typography, Button } from '@material-ui/core';

// uistyle
import Title from 'components/uiStyle/Title';
import Image from 'components/uiStyle/Images';
import Form from 'components/uiStyle/Form';

// images
import logo from 'images/logo.svg';

import ReactCodeInput from 'react-code-input';
import '../SignupPage/account.scss';
import { toast } from 'react-toastify';
import messages from './messages';

class ConfirmCodePage extends Component {
  state = {
    code: '1234',
  };

  submitHandler = event => {
    event.preventDefault();
    toast.success('Successfully confirmed');
    this.props.history.push('/login');
  };

  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
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
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid className="accountContent">
                <Typography variant="h3">Code varification</Typography>
                <Typography className="text" paragraph>
                  Enter the varification code which was{' '}
                  <Typography component="span">sent to your email.</Typography>
                </Typography>
                <Form onSubmit={this.submitHandler}>
                  <ReactCodeInput
                    className="codeVarificationInput"
                    value={this.state.code}
                    type="text"
                    autoFocus={false}
                    name="code"
                    isValid
                    fields={4}
                  />
                  <Button type="submit" className="submitButton">
                    Send
                  </Button>
                </Form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default injectIntl(withRouter(ConfirmCodePage));
