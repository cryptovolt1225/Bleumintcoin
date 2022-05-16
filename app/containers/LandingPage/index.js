/**
 *
 * LandingPage
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  Grid,
  Typography,
  List,
  ListItem,
  Button,
  Tab,
  Tabs,
} from '@material-ui/core';

import 'slick-carousel/slick/slick.css';

import { Link, animateScroll as scroll } from 'react-scroll';

// uistyle
import Title from 'components/uiStyle/Title';
import Footer from 'components/uiStyle/Footer';
import Image from 'components/uiStyle/Images';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import hero from 'images/mockup/laptop.png';
import ellipse from 'images/icon/ellipse.svg';
import whoWeAre from 'images/mockup/Image.png';
import feature1 from 'images/icon/img1.png';
import feature1White from 'images/icon/img1.1.png';
import feature2 from 'images/icon/img2.png';
import feature2White from 'images/icon/img2.1.png';
import feature3 from 'images/icon/img3.png';
import feature3White from 'images/icon/img3.1.png';
import payment from 'images/mockup/payment.png';
import refferal from 'images/mockup/refferal.png';
import next from 'images/icon/next.svg';
import prev from 'images/icon/prev.svg';
import tools from 'images/mockup/tools.svg';
import FooterMenu from './footerMenu';
import FeaturedContent from './featuredContent';
import SectionTitle from './SectionTitle';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectLandingPage from './selectors';

import FontAwesome from '../../components/uiStyle/FontAwesome';

// images

// screenshots
import screen1 from '../../images/screenshort/1.jpg';
import screen2 from '../../images/screenshort/2.png';
import screen3 from '../../images/screenshort/3.jpg';
import screen4 from '../../images/screenshort/4.jpg';
import screen5 from '../../images/screenshort/5.jpg';
import screen6 from '../../images/screenshort/6.jpg';
import screen7 from '../../images/screenshort/7.jpg';
import screen8 from '../../images/screenshort/8.jpg';
import screen9 from '../../images/screenshort/9.jpg';
import screen10 from '../../images/screenshort/10.jpg';

import logo from '../../images/logo.svg';

import './landing.scss';

const SampleNextArrow = props => (
  <Button onClick={props.onClick} className="next">
    <Image src={next} alt="Next" />
  </Button>
);

const SamplePrevArrow = props => (
  <Button onClick={props.onClick} className="prev">
    <Image src={prev} alt="Next" />
  </Button>
);

const mainMenu = [
  { menu: 'Home', id: 'home' },
  { menu: 'About', id: 'about' },
  { menu: 'Features', id: 'features' },
  { menu: 'Demo', id: 'demo' },
  { menu: 'Integration', id: 'integration' },
];

const sliderItem = [
  { item: screen1, id: 1, link: '/dashboard' },
  { item: screen2, id: 2, link: '/buy-coin' },
  { item: screen3, id: 3, link: '/my-wallet' },
  { item: screen4, id: 4, link: '/my-profile' },
  { item: screen5, id: 5, link: '/settings' },
  { item: screen6, id: 6, link: '/referral' },
  { item: screen7, id: 7, link: '/confirm-code' },
  { item: screen8, id: 8, link: '/signup' },
  { item: screen9, id: 9, link: '/login' },
  { item: screen10, id: 10, link: '/forgot-password' },
];

const whoWeAreContetntList = [
  {
    image: ellipse,
    title: 'User Panel',
    text:
      'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.Many desktop.',
  },
  {
    image: ellipse,
    title: 'Material Ui Design',
    text:
      'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.Many desktop.',
  },
  {
    image: ellipse,
    title: 'Easy Customizeable',
    text:
      'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.Many desktop.',
  },
];

const awesomeFeatureList = [
  {
    image: feature1,
    imageWhite: feature1White,
    title: 'Easy Customize',
    text:
      'The point of using Lorem Ipsum is that it has or-less normal distribution letters, as opposed Content here.',
  },
  {
    image: feature2,
    imageWhite: feature2White,
    title: 'Awesome Design',
    text:
      'The point of using Lorem Ipsum is that it has or-less normal distribution letters, as opposed Content here.',
  },
  {
    image: feature3,
    imageWhite: feature3White,
    title: 'Extreme Security',
    text:
      'The point of using Lorem Ipsum is that it has or-less normal distribution letters, as opposed Content here.',
  },
];

const tabMenu = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'app', label: 'App' },
];

const pricingList = [
  { left: 'Category :', right: 'Crypt Wallet' },
  { left: 'Version :', right: '5.44' },
  { left: 'SIze :', right: '545 MB' },
  { left: 'Language :', right: 'English' },
  { left: 'Seller :', right: 'itech Soft Solution' },
  { left: 'Updated :', right: '20 February 2019' },
];

const importantLink = [
  { menu: 'Home', link: '#' },
  { menu: 'Feature', link: '#' },
  { menu: 'Integrations', link: '#' },
  { menu: 'About', link: '#' },
];
const awesomeFeature = [
  { menu: 'Security', link: '#' },
  { menu: 'Customization', link: '#' },
  { menu: 'Support', link: '#' },
  { menu: 'Integrations', link: '#' },
];
const socialLink = [
  { menu: 'Facebook', link: '#' },
  { menu: 'Dribbble', link: '#' },
  { menu: 'Behance', link: '#' },
  { menu: 'LinkedIn', link: '#' },
];

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends Component {
  state = {
    value: 'admin',
    rating: 3.5,
    sideMenu: false,
  };

  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }

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

  render() {

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      focusOnSelect: true,
      initialSlide: 0,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <Fragment>
        <Helmet>
          <Title>{this.t({ ...messages.pageTitle })}</Title>
        </Helmet>
        <Grid className="headerArea">
          <Grid container spacing={32} className="container">
            <Grid item xs={6}>
              <Grid className="logoWrap">
                <Image src={logo} alt="logo" />
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item lg={6}>
                <List className="mainMenu">
                  {mainMenu.map(menu => (
                    <ListItem key={menu.id}>
                      <Link
                        activeClass="active"
                        spy
                        smooth
                        offset={0}
                        duration={1000}
                        to={menu.id}
                      >
                        {menu.menu}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid item xs={6}>
                <IconButton
                  className="hamBurger"
                  color="primary"
                  aria-label="Menu"
                  onClick={this.sMenuHandler}
                >
                  <FontAwesome name={this.state.sideMenu ? 'times' : 'bars'} />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>

        <Hidden mdUp>
          <Grid
            className={`sidebarMenu ${
              this.state.sideMenu ? 'showSidebar' : ''
              }`}
          >
            <Typography
              onClick={this.sMenuHandleClose}
              component="div"
              className="backDrop"
            />
            <MenuList>
              {mainMenu.map(menu => (
                <ListItem key={menu.id}>
                  <Link
                    activeClass="active"
                    spy
                    smooth
                    offset={0}
                    duration={1000}
                    to={menu.id}
                  >
                    {menu.menu}
                  </Link>
                </ListItem>
              ))}
            </MenuList>
          </Grid>
        </Hidden>

        <Grid className="heroArea" id="home">
          <Grid className="container" container spacing={32}>
            <Grid item xl={7}>
              <Grid className="heroContent">
                <Typography variant="h2">
                  The Highly Secured Bitcoin Wallet
                </Typography>
                <Typography paragraph>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.There are
                  many There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.There are
                  many.
                </Typography>
                <Button component={NavLink} to="/signup">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="heroImage">
            <Image src={hero} alt="hero" />
          </Grid>
        </Grid>
        <Grid className="whoWeAreArea" id="about">
          <Grid className="whoWeAreImg">
            <Image src={whoWeAre} alt="who we are" />
          </Grid>
          <Grid className="container" container spacing={32}>
            <Grid item xs={12}>
              <SectionTitle
                title="Who We are"
                text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
              />
            </Grid>
            <Grid item md={6} />
            <Grid item md={6}>
              <List className="whoWeAreContetnt">
                {whoWeAreContetntList.map((whoWeAreContetnt, i) => (
                  <ListItem key={i}>
                    <Typography variant="h4">
                      <Image src={whoWeAreContetnt.image} alt="icon" />
                      {whoWeAreContetnt.title}
                    </Typography>
                    <Typography paragraph>{whoWeAreContetnt.text}</Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="awesomeFeatureArea" id="features">
          <Grid className="container" container spacing={32}>
            <Grid item xs={12}>
              <SectionTitle
                title="Our Awesome Feature"
                text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
              />
            </Grid>
            {awesomeFeatureList.map((awesomeFeature, i) => (
              <Grid key={i} item md={4} xs={12}>
                <Grid className="awesomeFeaturedWrap">
                  <Grid className="awesomeFeaturedIcon">
                    <Image
                      className="awesomeFeaturedIconMainImg"
                      src={awesomeFeature.image}
                      alt="icon"
                    />
                    <Image
                      className="awesomeFeaturedIconHoverImg"
                      src={awesomeFeature.imageWhite}
                      alt="icon"
                    />
                  </Grid>
                  <Typography variant="h3">{awesomeFeature.title}</Typography>
                  <Typography paragraph>{awesomeFeature.text}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid className="featuredArea">
          <Grid className="container" spacing={32} container>
            <FeaturedContent
              title="Easy Customization & Secure Payment System."
              button="Know More"
              link="/login"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy when Lorem Ipsum is simply dummy text of the printing and typesetting industry I completely follow all your instructions."
            />
            <Grid item md={7}>
              <Grid className="featuredImg">
                <Image src={payment} alt="payment" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="featuredArea pt0">
          <Grid className="container" spacing={32} container>
            <Grid item md={7}>
              <Grid className="featuredImg">
                <Image src={refferal} alt="refferal" />
              </Grid>
            </Grid>
            <FeaturedContent
              title="Easy Customization & Secure Payment System."
              button="Know More"
              link="/login"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy when Lorem Ipsum is simply dummy text of the printing and typesetting industry I completely follow all your instructions."
            />
          </Grid>
        </Grid>
        <Grid id="demo" className="productScreenShortArea">
          <Grid className="container" container spacing={32}>
            <Grid item xs={12}>
              <SectionTitle
                title="Demo"
                text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                {sliderItem.map(item => (
                  <Grid key={item.id} item xs={12} md={6}>
                    <Grid className="screenshortWrap">
                      <NavLink target="_blank" to={item.link}><Image src={item.item} alt="slider" /></NavLink>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="featuredArea" id="integration">
          <Grid className="container" container spacing={32}>
            <FeaturedContent
              title="It Has Useful Integration With Other Awesome tools."
              button="Get Started"
              link="/login"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy when.Lorem Ipsum is simply dummy text of the printing and typesetting."
            />
            <Grid item md={7}>
              <Grid className="featuredImg">
                <Image src={tools} alt="tools" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer className="footerArea">
          <Grid className="container" spacing={32} container>
            <Grid item md={4} xs={12}>
              <Grid className="footerLogo">
                <Image src={logo} alt="footer logo" />
                <Typography paragraph>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been text ever since.
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
              <Grid container spacing={32}>
                <FooterMenu title="Important Link" footerMenu={importantLink} />
                <FooterMenu
                  title="Awesome Feature"
                  footerMenu={awesomeFeature}
                />
                <FooterMenu title="Social Link" footerMenu={socialLink} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid className="footerBottom">
                <Typography paragraph>
                  2019 | All Right Reserved By{' '}
                  <Typography component="span">Cryptwallet</Typography>{' '}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Footer>
      </Fragment>
    );
  }
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
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

const withReducer = injectReducer({ key: 'landingPage', reducer });
const withSaga = injectSaga({ key: 'landingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(LandingPage));
