/**
 *
 * SingleWalletDeposite
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { toast } from 'react-toastify';

import QRCode from 'qrcode';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Form from '../../components/uiStyle/Form';
import makeSelectSingleWalletDeposite from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Images from '../../components/uiStyle/Images';
import './style.scss';

/* eslint-disable react/prefer-stateless-function */
export class SingleWalletDeposite extends React.Component {
  state = {
    qr_code: '',
    address: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi',
    showAddress: false,
  };

  componentDidMount() {
    QRCode.toDataURL(
      'Hi, I am Rashed! 2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi 2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi',
    )
      .then(url => {
        this.setState({
          qr_code: url,
          address: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi',
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  copyHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(this.state.address);

    toast.info("Copied to clipboard");
  };

  generateAddressHandler = () => {
    QRCode.toDataURL(
      'New Generate Address! 2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi 2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi',
    )
      .then(url => {
        this.setState({
          qr_code: url,
          address: 'VwwiNDq9MqvjDJV4DcBj3Q2NCzoi',
        });

        toast.success("New Address Generated!");
      })
      .catch(err => {
        console.error(err);
      });
  };

  showAddressHandler = () => {
    this.setState({
      showAddress: true,
    });
  };

  render() {
    const { address, qr_code, showAddress } = this.state;

    const AddressTable = (
      <Grid className="addressTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q</TableCell>
              <TableCell className="dateTd">2019-01-24 12:50:17</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q</TableCell>
              <TableCell className="dateTd">2019-01-24 12:50:17</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    );

    return (
      <Grid className="qrResults">
        <Grid container>
          <Grid item xs={12} md={3}>
            <Images className="qrImage" src={qr_code} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Form onSubmit={this.copyHandler}>
              <TextField
                InputProps={{
                  disabled: true,
                }}
                className="addressInput"
                value={address}
              />
              <Button type="submit">Copy</Button>
            </Form>
            <Typography
              onClick={this.generateAddressHandler}
              className="generateNewAdress"
              component="p"
            >
              Generate a new address
            </Typography>
            <Grid className="addressList">
              <Button
                onClick={this.showAddressHandler}
                disabled={showAddress}
                className={`formSubmitBtn ${showAddress && 'disableBtn'}`}
              >
                Show past address
              </Button>
              {showAddress ? AddressTable : ''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SingleWalletDeposite.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singleWalletDeposite: makeSelectSingleWalletDeposite(),
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

const withReducer = injectReducer({ key: 'singleWalletDeposite', reducer });
const withSaga = injectSaga({ key: 'singleWalletDeposite', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SingleWalletDeposite);
