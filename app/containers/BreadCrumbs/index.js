/**
 *
 * BreadCrumbs
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import { ListItem, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Image from 'components/uiStyle/Images';
import BitCoinIcon from 'images/icon/wallet/bitcoin.svg';
import makeSelectBreadCrumbs from './selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';
import FontAwesome from 'components/uiStyle/FontAwesome';

/* eslint-disable react/prefer-stateless-function */
export class BreadCrumbs extends React.Component {
  render() {
    return (
      <Grid className="breadCrumbs">
        <Grid container alignItems="center" className="container">
          <Grid item xs={12} sm={4} className="breadCrumbInfo">
            <Typography component="div">
              <Image src={this.props.icon} />
              <span>{this.props.title}</span>
            </Typography>
            <List disablePadding className="breadList">
              <ListItem>
                Crypt Wallet
                <FontAwesome name="caret-right" />
              </ListItem>
              <ListItem className="active">{this.props.title}</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={8} className="walletInfo">
            <Grid className="walletSingle">
              <Grid className="icon">
                <Image src={BitCoinIcon} />
              </Grid>
              <Grid className="content">
                <Typography component="p">Available Balance</Typography>
                <List>
                  <ListItem>
                    <Typography component="span">9067.7800000</Typography>
                    BTC
                  </ListItem>
                  <ListItem>
                    <Typography component="span">127509750.800</Typography>
                    USD
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Grid className="walletSingle pending">
              <Grid className="icon">
                <Image src={BitCoinIcon} />
              </Grid>
              <Grid className="content">
                <Typography component="p">Pending Withdrawal</Typography>
                <List>
                  <ListItem>
                    <Typography component="span">9067.7800000</Typography>
                    BTC
                  </ListItem>
                  <ListItem>
                    <Typography component="span">127509750.800</Typography>
                    USD
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BreadCrumbs.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  breadCrumbs: makeSelectBreadCrumbs(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'breadCrumbs', reducer });
const withSaga = injectSaga({ key: 'breadCrumbs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BreadCrumbs);
