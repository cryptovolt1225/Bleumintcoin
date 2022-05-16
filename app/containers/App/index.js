/**
 *
 * App
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import Routes from 'containers/__Routes';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import GlobalStyle from '../../global-styles';
import theme from '../../material-theme'

/* eslint-disable react/prefer-stateless-function */
export class App extends Component {
  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <Helmet
          titleTemplate={`%s - ${this.props.intl.formatMessage({
            ...messages.appTitle,
          })}`}
          defaultTitle={this.props.intl.formatMessage({ ...messages.appTitle })}
        />
        <Routes />
        <ToastContainer position="top-right" />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
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

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(App));
