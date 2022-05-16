/**
 *
 * DashboardPage
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  VictoryPie,
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
} from 'victory';

import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';
import DwLineChart from '../../components/DwLineChart';

const withdrawData = [
  { month: 'Jan', actual: 140 },
  { month: 'Feb', actual: 310 },
  { month: 'March', actual: 190 },
  { month: 'April', actual: 320 },
  { month: 'May', actual: 200 },
  { month: 'Jun', actual: 320 },
];

const depositeData = [
  { month: 'Jan', actual: 220 },
  { month: 'Feb', actual: 350 },
  { month: 'March', actual: 490 },
  { month: 'April', actual: 320 },
  { month: 'May', actual: 250 },
  { month: 'Jun', actual: 350 },
];

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.Component {
  state = {
    metric: 0,
    withDraw: withdrawData,
    deposite: depositeData,
  };

  componentDidMount() {
    this.setState({
      metric: 70,
    });
  }

  toggleHistory = prop => () => {
    if (prop === 'deposite') {
      if (this.state[prop].length >= 0) {
        this.setState({
          [prop]: [],
        });
      }
      if (this.state[prop].length === 0) {
        this.setState({
          [prop]: depositeData,
        });
      }
    }
    if (prop === 'withDraw') {
      console.log(prop);
      if (this.state[prop].length >= 0) {
        this.setState({
          [prop]: [],
        });
      }
      if (this.state[prop].length === 0) {
        console.log('called');
        this.setState({
          [prop]: withdrawData,
        });
      }
    }
  };

  render() {

    const { withDraw, deposite } = this.state;

    return (
      <Grid className="mainBody">
        <Grid container spacing={16} className="container">
          <Grid item xs={12} md={4}>
            <Grid className="card">
              <Typography className="section-title" component="h4">
                Withdrawal Status
              </Typography>
              <Grid className="victoryPieArea">
                <VictoryPie
                  padAngle={0}
                  // used to hide labels
                  labelComponent={<Fragment />}
                  innerRadius={80}
                  width={200}
                  height={200}
                  data={[
                    { key: '', y: this.state.metric },
                    { key: '', y: 100 - this.state.metric },
                  ]}
                  colorScale={['#1CA9EE', '#DFF3FF']}
                  animate={{
                    duration: 2000,
                  }}
                />
                <Typography className="victoryPieCenterLabel" component="p">
                  {this.state.metric}%
                </Typography>
              </Grid>
              <Typography className="victoryPieTitle" component="p">
                Withdraw : <span>{this.state.metric}%</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid className="card">
              <Grid container>
                <Grid item xs={12} sm={7}>
                  <Typography className="section-title" component="h4">
                    Last 6 month history
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Grid className="barController">
                    <Button
                      disableRipple
                      onClick={this.toggleHistory('deposite')}
                    >
                      <p />
                      Deposite
                    </Button>
                    <Button
                      disableRipple
                      className="withDraw"
                      onClick={this.toggleHistory('withDraw')}
                    >
                      <p />
                      Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <VictoryChart height={220} minDomain={{ x: 0 }}>
                <VictoryBar
                  animate={{ duration: 250 }}
                  barWidth={20}
                  style={{
                    data: { fill: '#DFF3FF', stroke: '#DFF3FF' },
                  }}
                  data={deposite}
                  x="month"
                  y={d => d.actual}
                />
                <VictoryBar
                  animate={{ duration: 250 }}
                  barWidth={20}
                  style={{
                    data: { fill: '#5E55E6', stroke: '#5E55E6' },
                  }}
                  data={withDraw}
                  x="month"
                  y={d => d.actual}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: '#dddddd' },
                    axisLabel: { fontSize: 10 },
                    ticks: { stroke: 'grey', size: 0 },
                    tickLabels: { fontSize: 10 },
                  }}
                />
                <VictoryAxis
                  tickFormat={t => `$ ${Math.round(t)}`}
                  theme={VictoryTheme.material}
                  style={{
                    axis: { stroke: '#ffffff' },
                    axisLabel: { fontSize: 10 },
                    grid: { stroke: 'rgba(93, 85, 230, 0.05)' },
                    ticks: { stroke: 'grey', size: 0 },
                    tickLabels: { fontSize: 10 },
                  }}
                  dependentAxis
                />
              </VictoryChart>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid className="card">
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <Typography className="section-title" component="h4">
                    Deposit & Withdrawal
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid className="barController">
                    <Button disableRipple>
                      <p />
                      Deposite
                    </Button>
                    <Button disableRipple className="withDraw">
                      <p />
                      Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <DwLineChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

DashboardPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
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

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);
