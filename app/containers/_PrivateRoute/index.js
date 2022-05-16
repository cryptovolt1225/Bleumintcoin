import React, { Component, Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';

import './style.scss';
import { Header } from '../Header';
import { BreadCrumbs } from '../BreadCrumbs';
import Footer from '../../components/Footer';

export class PrivateRoute extends Component {
  render() {
    const Component = this.props.component;
    this.props = { ...this.props, component: null };
    return (
      <Fragment>
        <Grid className="headerWrapper">
          <Header />
          <BreadCrumbs icon={this.props.icon} title={this.props.title} />
        </Grid>
        <Route {...this.props} render={props => <Component {...props} />} />
        <Footer />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PrivateRoute);
