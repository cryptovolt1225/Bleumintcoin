/**
 *
 * WalletActivityTable
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { List, ListItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function WalletActivityTable({
  currentPage,
  rowsPerPage,
  row,
  pageNumberOfPage,
  paginateHandler,
}) {
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = row.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(row.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <ListItem
      key={number}
      id={number}
      className={pageNumberOfPage === number ? 'active' : ''}
      onClick={paginateHandler(number)}
    >
      {number}
    </ListItem>
  ));
  return (
    <Fragment>
      <Grid className="walletActivityBody">
        <Grid className="tableWrapper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Hash</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="dateTd">
                    <p>{row.address}</p>
                  </TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <p>{row.hash}</p>
                  </TableCell>
                  <TableCell className="dateTd">{row.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid className="PaginationWrapper">
        <List>{renderPageNumbers}</List>
      </Grid>
    </Fragment>
  );
}

WalletActivityTable.propTypes = {};

export default WalletActivityTable;
