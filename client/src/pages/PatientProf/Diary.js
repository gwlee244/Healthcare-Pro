/*
  Component in Patient Profile that show history of all visits to the doctor, threatment and so on.
  @imported in PatientProfileTabs
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import { connect } from "react-redux";

// Actions
import {
  sendDiaryRecord,
  getPatientsRecords
} from "../../actions/utilsAction";

var stuff;
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});
class TablePaginationActions extends Component {
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
    this.props.onChangePage(
      event,
      Math.max(
        0,
        Math.ceil(this.props.count / this.props.rowsPerPage) - 1
      )
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page">
          {theme.direction === "rtl" ? (
            <LastPageIcon />
          ) : (
              <FirstPageIcon />
            )}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page">
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
              <KeyboardArrowLeft />
            )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page">
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
              <KeyboardArrowRight />
            )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page">
          {theme.direction === "rtl" ? (
            <FirstPageIcon />
          ) : (
              <LastPageIcon />
            )}
        </IconButton>
      </div>
    );
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

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

let counter = 0,
  rows = [];
function createData(doctor, record, date) {
  counter += 1;
  return { id: counter, doctor, record, date };
}

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
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
    },
  inputAdjustment: {
    width: "100%",
    margin: "1em"
  },
  btnAdd: {
    width: "20%",
    marginRight: "2em"
  }
});

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      diaryRecord: ""
      
    };
    this.onAddRecord = this.onAddRecord.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  componentDidMount = () => {
    rows = [];
   this.props.getPatientsRecords(this.props.user._id);
  }

  onAddRecord = () => {
    let now = new Date();
    const record = {
      diaryRecord: this.state.diaryRecord,
      date: `${now.getHours()}:${now.getMinutes()}, ${now.getDate()}.${now.getMonth() +
        1}.${now.getFullYear()}`,
      doctor: `${this.props.auth.user.firstName} ${
        this.props.auth.user.lastName
        }`
    };
    this.props.sendDiaryRecord(record, this.props.user._id);
    this.setState({ diaryRecord: "" });
    rows.unshift(
      createData(record.doctor, record.diaryRecord, record.date)
    );
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    let patientRecords;

    if (this.props.general && this.props.general.loading == false) {
      patientRecords = this.props.general.patientRecords;
    }

    if (patientRecords == null) {
      return null
    }
    else {
      if (rows.length === 0) {
        for (let i = 0; i < patientRecords.length; i++) {
          rows.unshift(
            createData(
              patientRecords[i].doctor,
              patientRecords[i].diaryRecord,
              patientRecords[i].date
            )
          );
        }
      }
    }
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className="flex flex-center">
          <TextField
            multiline
            placeholder="Symptoms, threatment, etc..."
            value={this.state.diaryRecord}
            label="Set record"
            className={classes.inputAdjustment}
            variant="outlined"
            onChange={ev => {
              this.setState({ diaryRecord: ev.target.value });
            }}
          />
          <Button
            variant="contained"
            onClick={this.onAddRecord}
            className={classes.btnAdd}
            color="secondary">
            Add record
					</Button>
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell 
                className={classes.tableHead}>
                  Doctor
                  </TableCell>
                <TableCell 
                className={classes.tableHead}
                >Visit Notes
                </TableCell>
                <TableCell
                className={classes.tableHead}
                >Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell
                        className={`${classes.tableData} ${classes.tableLeft}`}
                        style={{ fontSize: "1.2em" }}
                        component="th"
                        scope="row">
                        {row.doctor}
                      </TableCell>
                      <TableCell
                       className={classes.tableData}
                        style={{ fontSize: "1.2em" }}>
                        {row.record}
                      </TableCell>
                      <TableCell
                       className={classes.tableData}
                        style={{ fontSize: "1.2em" }}>
                        {row.date}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={
                    this.handleChangeRowsPerPage
                  }
                  ActionsComponent={
                    TablePaginationActionsWrapped
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

Diary.propTypes = {
  auth: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    general: state.general
  };
};

export default connect(
  mapStateToProps,
  { sendDiaryRecord, getPatientsRecords }
)(withStyles(styles)(Diary));