/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import makeSelectSettings from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Form from '../../components/uiStyle/Form';

import Image from '../../components/uiStyle/Images';

import AuthLock from '../../images/auth-lock-icon.png';

import './style.scss';
import { toast } from 'react-toastify';

const styles = theme => ({
  colorBar: {},
  colorChecked: {},
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#6258FB',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(48px)',
    '& + $iOSBar': {
      opacity: 1,
    },
  },
  iOSBar: {
    borderRadius: 100,
    width: 94,
    height: 44,
    marginTop: -22,
    marginLeft: -30,
    border: 'none',
    backgroundColor: '#A4A4A4',
    opacity: 1,
    transition: theme.transitions.create(['background-color']),
  },
  iOSIcon: {
    width: 40,
    height: 40,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Settings extends React.Component {
  state = {
    checked: false,
    language: 'english',
    currency: 'usd',
  };

  handleChange = event => {
    this.setState({ checked: event.target.checked });
  };

  authSubmitHandler = e => {
    e.preventDefault();

    console.log(this.state.checked);
  };

  ChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  preferenceSubmitHandler = e => {
    e.preventDefault();

    const data = {
      language: this.state.language,
      currency: this.state.currency,
    };

    toast.success("Settings saved");
  };

  render() {
    const { classes } = this.props;
    const { language, currency } = this.state;

    return (
      <Grid className="settingsArea">
        <Grid className="container">
          <Grid className="settingsBody">
            <Typography component="h4" className="section-title">
              Google Authentication Settings
            </Typography>
            <Grid className="setAuthentication">
              <Image src={AuthLock} />
              <Form onSubmit={this.authSubmitHandler}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography className="subTitle">
                      Authenticator app
                    </Typography>
                    <Typography component="p">
                      Use the Authenticator app to get free verification codes,
                      even when your phone is offline. Available for Android and
                      iPhone.
                    </Typography>
                    <Button type="submit" className="formSubmitBtn">
                      Set up
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="subTitle">Security</Typography>
                    <Typography component="p">
                      Please on this option to enable two factor authentication
                      at login.
                    </Typography>
                    <Grid className="swtichCheck">
                      <FormControlLabel
                        control={
                          <Switch
                            classes={{
                              switchBase: classes.iOSSwitchBase,
                              bar: classes.iOSBar,
                              icon: classes.iOSIcon,
                              iconChecked: classes.iOSIconChecked,
                              checked: classes.iOSChecked,
                            }}
                            disableRipple
                            checked={this.state.checked}
                            onChange={this.handleChange}
                            value="checked"
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
          </Grid>
          <Grid className="settingsBody mt8">
            <Typography component="h4" className="section-title">
              Preference Settings
            </Typography>
            <Grid className="preferenceSettings">
              <Form onSubmit={this.preferenceSubmitHandler}>
                <Grid container spacing={16}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth className="selectInputField">
                      <InputLabel shrink htmlFor="language">
                        Language
                      </InputLabel>
                      <Select
                        className="inputSelectStyle"
                        value={language}
                        onChange={this.ChangeHandler}
                        input={<Input name="language" id="language" />}
                        displayEmpty
                        name="language"
                      >
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="portuguese">Portuguese</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth className="selectInputField">
                      <InputLabel shrink htmlFor="language">
                        Currency
                      </InputLabel>
                      <Select
                        className="inputSelectStyle"
                        value={currency}
                        onChange={this.ChangeHandler}
                        input={<Input name="currency" id="currency" />}
                        displayEmpty
                        name="currency"
                      >
                        <MenuItem value="usd">USD</MenuItem>
                        <MenuItem value="btc">BTC</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button className="formSubmitBtn" type="submit">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Settings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
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

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(Settings));
