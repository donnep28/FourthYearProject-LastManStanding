import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './tables.css';
import {TableHead} from '@material-ui/core';

function getFixtures(results) {
  if (typeof results !== 'undefined') {
    return (
      <>
        <TableContainer component={Paper} className='tableContainer'>
          <h1 className='h1'>Fixtures</h1>
          <Table aria-label="customized table" className="table">
            <TableHead>
              <TableRow className="tableRowTitles">
                <TableCell align="center" height="auto" className='tableCell'>
                  <h1>Home Team</h1>
                </TableCell>
                <TableCell align="center" className='tableCell'>VS</TableCell>
                <TableCell align="center" className='tableCell'>
                  <h1>Away Team</h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='tableBody' style={{minHeight: 'auto', backgroundColor: "white", color: "black"}}>
              {results[1].map((item) => (
                <TableRow key={item.HomeTeam}>
                  <TableCell align="center" className='tableCell'>
                    {item.HomeTeam}
                  </TableCell>
                  <TableCell align="center" className='tableCell'>VS</TableCell>
                  <TableCell align="center" className='tableCell'>
                    {item.AwayTeam}
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

const PremierLeagueFixtures = ({
  results,
}) => {
  return (
    <div>
      {getFixtures(results['data'])}
    </div>
  );
};

PremierLeagueFixtures.propTypes = {
  results: PropTypes.object,
};

PremierLeagueFixtures.defaultProps = {
  results: {},
};

export default PremierLeagueFixtures;
