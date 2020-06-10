import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Icon, Typography, TableHead } from '@material-ui/core';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { getPatientsRecords } from '../../actions/utilsAction';
import { connect } from "react-redux";
// 

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
  };
  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return <div className={classes.root}>
      <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={this.handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={this.handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>;
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);




let counter = 0;
let rows = [];

function createData(doctor, diaryRecord, date) {
  counter += 1;
  return { id: counter, doctor, diaryRecord, date };
}

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  tableHead: {
    backgroundColor: '#DCDCDC',
    color: 'black',
    fontWeight: "bold",
    padding: 6,
    border: "1px solid #ccc",
  },
  tableData: {
    padding: 6,
    border: "1px solid #ccc",
  }
});

export class PatientDiaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      rows: []
    }
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  };

  componentDidMount() {
    this.props.getPatientsRecords(this.props.auth.user.id)
  }
  handleChangePage = (e, page) => {
    this.setState({
      page
    })
  }
  handleChangeRowsPerPage = (e) => {
    this.setState({
      rowsPerPage: e.target.value
    })
  }
  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, rows } = this.state;
    let { patientRecords } = this.props.general;
    if (patientRecords == null) {

    } else {
      if (rows.length === 0) {
        for (let i = 0; i < patientRecords.length; i++) {
          rows.unshift(
            createData(
              patientRecords[i].doctor,
              patientRecords[i].diaryRecord,
              patientRecords[i].date
            )
          )
        }
      }
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    return (
      <div>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tableHead} align="left">Doctor</TableCell>
                  <TableCell className={classes.tableHead} align="left">Appointment Notes</TableCell>
                  <TableCell className={classes.tableHead} align="left">Date</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => <TableRow key={row.id}>
                  <TableCell 
                     className={`${classes.tableData} ${classes.tableLeft}`}
                    align="left">{row.doctor}</TableCell>
                  <TableCell
                  className={classes.tableData}
                   align="left">{row.diaryRecord}</TableCell>
                  <TableCell 
                  className={classes.tableData}
                  align="left">{row.date}</TableCell>
                </TableRow>)}
                {emptyRows > 0 && <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination rowsPerPageOptions={[5, 10, 25]} colSpan={3} count={rows.length} rowsPerPage={rowsPerPage} page={page} SelectProps={{
                    native: true
                  }} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage} ActionsComponent={TablePaginationActionsWrapped} />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    )
  }
}

// TablePaginationAction.propTypes = {
//   classes: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   general: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
});

export default connect(
  mapStateToProps,
  { getPatientsRecords }
)(withStyles(styles)(PatientDiaryTab));

