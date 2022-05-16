/**
 *
 * Footer
 *
 */

import React from 'react';

import { ListItem, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

import './style.scss';

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <Grid className="footerArea">
      <Grid container alignItems="center" className="container">
        <Grid item xs={12} sm={6}>
          <Typography component="p">
            {currentYear} | All Right Reserved By <strong>Crypt Wallet</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List disablePadding>
            <ListItem>
              <Link to="/">FAQS</Link>
            </ListItem>
            <ListItem>
              <Link to="/">Terms And Conditions</Link>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

Footer.propTypes = {};

export default Footer;
