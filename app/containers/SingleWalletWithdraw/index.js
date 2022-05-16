/**
 *
 * SingleWalletWithdraw
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import injectSaga from 'utils/injectSaga';
import TextField from '@material-ui/core/TextField';

import injectReducer from 'utils/injectReducer';
import { Button, FormControl } from '@material-ui/core';
import Form from '../../components/uiStyle/Form';

import makeSelectSingleWalletWithdraw from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import walletCircleIcon from '../../images/icon/wallet-circle.png';

import Images from '../../components/uiStyle/Images';

import './style.scss';
import { isAmount, skipSpace } from '../../utils/commonFunctions';
import { toast } from 'react-toastify';

/* eslint-disable react/prefer-stateless-function */
export class SingleWalletWithdraw extends React.Component {
  state = {
    address: '',
    amount: '',
    note: '',
    errors: '',
  };

  changeHandler = e => {
    const Name = e.target.name;
    let Value = e.target.value;
    if (Name === 'address') {
      Value = skipSpace(Value);
      this.setState({
        [Name]: Value,
      });
    }
    if (Name === 'amount' && isAmount(Value)) {
      this.setState({
        [Name]: Value,
      });
    }
    if (Name === 'note') {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  validateMulti = () => {
    const errors = {};

    const { address, amount, note } = this.state;
    if (address === '') {
      errors.address = 'Please provide Address';
    }
    if (amount === '') {
      errors.amount = 'Please provide Amount';
    }
    if (note === '') {
      errors.note = 'Please provide Note';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  submitHandler = e => {
    e.preventDefault();
    const errors = this.validateMulti();
    this.setState({
      errors: errors || {},
    });

    if (errors){
      toast.error("Please give a valid input");
    }
    else {
      toast.success("Successfully send your request!");
    }

  };

  render() {
    const { address, amount, note, errors } = this.state;
    return (
      <Grid className="singleWalletWithdraw">
        <Grid container>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={8}>
            <Form onSubmit={this.submitHandler}>
              <FormControl fullWidth className="mb3">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <Images className="inputIcon" src={walletCircleIcon} />
                    ),
                  }}
                  label="To"
                  helperText={errors.address}
                  id="bit_coin_address"
                  className="inputStyleBasic"
                  name="address"
                  value={address}
                  placeholder="Bitcoin address"
                  onChange={this.changeHandler}
                />
              </FormControl>
              <FormControl fullWidth className="mb3">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Amount"
                  helperText={errors.amount}
                  id="amount"
                  className="inputStyleBasic"
                  name="amount"
                  value={amount}
                  placeholder="Amount in Bits"
                  onChange={this.changeHandler}
                />
              </FormControl>
              <FormControl fullWidth className="mb3">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  label="Note"
                  helperText={errors.note}
                  id="note"
                  className="inputStyleBasic"
                  name="note"
                  value={note}
                  placeholder="Type your message here. . . . . .(Optional)"
                  onChange={this.changeHandler}
                />
              </FormControl>
              <Button type="submit" className="formSubmitBtn">
                Submit
              </Button>
            </Form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SingleWalletWithdraw.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singleWalletWithdraw: makeSelectSingleWalletWithdraw(),
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

const withReducer = injectReducer({ key: 'singleWalletWithdraw', reducer });
const withSaga = injectSaga({ key: 'singleWalletWithdraw', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SingleWalletWithdraw);
