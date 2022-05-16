/**
 *
 * Header
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { NavLink } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Image from 'components/uiStyle/Images';
import { Grid, List, ListItem } from '@material-ui/core';
import logo from 'images/logo.svg';

import './style.scss';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import cookie from 'js-cookie';
import saga from './saga';
import reducer from './reducer';
import makeSelectHeader from './selectors';
import FontAwesome from '../../components/uiStyle/FontAwesome';

import UserDefaultImage from '../../images/author/user-image.jpg';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import Redirect from 'react-router-dom/es/Redirect';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    placement: null,
    sideMenu: false,
  };

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

  sMenuHandler = () => {
    const sideMenu = this.state.sideMenu;
    this.setState({
      sideMenu: !sideMenu,
    });
  };

  sMenuHandleClose = () => {
    this.setState({
      sideMenu: false,
    });
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  logOutHandler = () => {
    cookie.remove('Auth');
    toast.warn("You have been loged out!");

    this.setState({ state: this.state });
  };

  render() {
    const { anchorEl, open, placement, sideMenu } = this.state;
    const Auth = cookie.get('Auth');
    if (!Auth) {
      return <Redirect to="/login" />;
    }

    return (
      <Grid className="mainHeadeArea">
        <Grid container alignItems="center" className="container">
          <Grid item xs={12} sm={4} md={2}>
            <Logo logo={logo} alt="CryptWallet" link="/dashboard" />
          </Grid>
          <Hidden smDown>
            <Grid item md={8}>
              <List className="mainMenu">
                <ListItem className="menuItem">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </ListItem>
                <ListItem className="menuItem">
                  <NavLink to="/buy-coin">Buy Coin</NavLink>
                </ListItem>
                <ListItem className="menuItem">
                  <NavLink to="/my-wallet">My Wallet</NavLink>
                </ListItem>
                <ListItem className="menuItem">
                  <NavLink to="/my-profile">My Profile</NavLink>
                </ListItem>
                <ListItem className="menuItem">
                  <NavLink to="/settings">Settings</NavLink>
                </ListItem>
                <ListItem className="menuItem">
                  <NavLink to="/referral">Referral</NavLink>
                </ListItem>
                <ListItem className="menuItem">
                  <NavLink to="/landingpage">landingpage</NavLink>
                </ListItem>
              </List>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={8} md={2} className="profileMenu">
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <Grid>
                <Button
                  disableRipple
                  className="profileBtn"
                  onClick={this.handleClick('bottom-end')}
                >
                  <Typography className="userImage" component="div">
                    <Image src={UserDefaultImage} />
                  </Typography>
                  <Typography className="userName" component="span">
                    John Doe
                  </Typography>
                  <FontAwesome name={!open ? 'caret-down' : 'caret-up'} />
                </Button>

                <Popper
                  open={open}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <List className="profileMenuList">
                          <ListItem>
                            <NavLink to="/my-profile">My Profile</NavLink>
                          </ListItem>
                          {Auth ? (
                            <ListItem>
                              <Button
                                onClick={this.logOutHandler}
                                disableRipple
                              >
                                Sign Out
                              </Button>
                            </ListItem>
                          ) : (
                            <ListItem>
                              <NavLink to="/login">Login</NavLink>
                            </ListItem>
                          )}
                        </List>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Grid>
            </ClickAwayListener>
            <Hidden mdUp>
              <IconButton
                className="hamBurger"
                color="primary"
                aria-label="Menu"
                onClick={this.sMenuHandler}
              >
                <FontAwesome name={sideMenu ? 'times' : 'bars'} />
              </IconButton>
            </Hidden>
          </Grid>
        </Grid>
        <Hidden mdUp>
          <Grid className={`sidebarMenu ${sideMenu ? 'showSidebar' : ''}`}>
            <Typography
              onClick={this.sMenuHandleClose}
              component="div"
              className="backDrop"
            />
            <MenuList>
              <MenuItem>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/buy-coin">Buy Coin</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/my-wallet">My Wallet</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/my-profile">My Profile</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/settings">Settings</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/referral">Referral</NavLink>
              </MenuItem>
            </MenuList>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

Header.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
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

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
