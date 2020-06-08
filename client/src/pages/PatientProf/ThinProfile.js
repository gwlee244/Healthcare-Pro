/*
  Component, that show in My patients tab for doctor, thin and long, opens Patient profile component
  @imported in PatientsList
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPatientsList } from "../../actions/utilsAction";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import PatientProfile from "./PatientProfile";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});
//Components

// const styles = theme => ({
// 	root: {
// 		...theme.mixins.gutters(),
// 		paddingTop: theme.spacing.unit * 1.5,
// 		paddingBottom: theme.spacing.unit * 1.5,
// 		margin: "auto",
// 		width: "85%",
// 		display: "flex",
// 		flexWrap: "wrap",
// 		marginBottom: ".5em"
// 	},
// showBtn: {
// 	marginLeft: "auto"
// },
//   infoItems: {
//     color: "black"
//   }
// });

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
//  var rows = [];
function createData(first, last, email, phone, id, patient) {
  return { id, first, last, email, phone, patient };

}
const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500,
  },
  tableLeft: {
    paddingLeft: 50
  },
  tableWrapper: {
    overflowX: "auto",
  },
  inputAdjustment: {
    width: "100%",
    margin: "1em"
  },
  btnAdd: {
    width: "20%",
    marginRight: "2em"
  },
  tableHead: {
    padding: 6,
    border: "1px solid #ccc",
    backgroundColor: '#708090',
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left"
  },
  tableData: {
    padding: 6,
    border: "1px solid #ccc",

  },
  patientSearch: {
    margin: 20
  },
  showBtn: {
    marginLeft: "auto",
    zIndex: "100",
    border: "1px solid red",
    color: "red",
    borderRadius: 10
  }
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



class ThinProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      open: false,
      id: "",
      patients: "",
      filtered: "",
      searchTerm: "",
      order: "",
      loading: true,
      expanded: null
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.removeBadPatients = this.removeBadPatients.bind(this);
    this.infoItem = this.infoItem.bind(this);
    this.closeProfile = this.closeProfile.bind(this);
    // this.calculateAge = this.calculateAge.bind(this);
    this.Transition = this.Transition.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }
  infoItem = (icon, text) => {
    return (
      <div className="flex flex-center infoItemMargin">
        {icon}
        <Typography variant="subtitle1">
          {text ? text : "N/A"}
        </Typography>
      </div>
    );
  };

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  closeProfile = () => {
    this.setState({ open: false });
  };
  Transition(props) {
    return <Slide direction="up" {...props} />;
  }
  // calculateAge(birthday) {
  //   // birthday is a date
  //   var ageDifMs = Date.now() - birthday.getTime();
  //   var ageDate = new Date(ageDifMs); // miliseconds from epoch
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);
  // }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    console.log(event.target.value);
    const rpp = parseInt(event.target.value)
    this.setState({ rowsPerPage: rpp });
  };
  removeBadPatients(patient, i) {
    console.log(patient + i);
    const goodPatients = patient.splice(i, 1);
    console.log(goodPatients);
    this.setState({ patients: goodPatients,
    filtered: goodPatients })
  }
  componentDidMount = () => {
    this.props.getPatientsList(this.props.auth.user.id)

  };

  componentWillReceiveProps(nextProps) {
    const goodPatients = [];
    const patients = nextProps.general.patientData;
    for(let i=0;i <patients.length; i++) {
      if (patients[i].settings) {
        goodPatients.push(patients[i]);
      }
    }
    this.setState({
      loading: false,
      patients: goodPatients,
      filtered: goodPatients
    });
  }

  btnClick = (event) => {
    this.setState({
      id: event.target.value,
      open: true
    })
  }


  //filter employees by user search
  handleInputChange = (event) => {
    event.preventDefault();
    const newSearch = event.target.value.toLowerCase();

    this.setState({
      searchTerm: newSearch
    },
      () => {
        console.log(this.state.filtered);
        this.setState({
          filtered: this.state.patients.filter(person =>
            person.firstName.toLowerCase().includes(this.state.searchTerm) || person.lastName.toLowerCase().includes(this.state.searchTerm) || person.settings.phone.toString().includes(this.state.searchTerm) || person.settings.email.toLowerCase().includes(this.state.searchTerm))
        });
      })
  }

  render() {
    let rows = [];
    const { classes } = this.props;
    let { patientData } = this.props.general

    const { rowsPerPage, page, patients, id, filtered, expanded } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    if (patientData == null) {
    }
    else {
      // console.log(patientData);
      if (rows.length === 0) {

        for (let i = 0; i < filtered.length; i++)
          if (filtered[i].settings) {
            rows.unshift(
              createData(
                filtered[i].firstName,
                filtered[i].lastName,
                filtered[i].settings.email,
                filtered[i].settings.phone,
                i,
                filtered[i]
              )
            );
          }
      }
    }
    // console.log(rows);



    return (
      <>
        <br></br>
        <Paper className={classes.root}>
          <ExpansionPanel
            expanded={expanded === "panel7"}
            onChange={this.handleExpand("panel7")}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>

              </Typography>
              <Typography className={classes.secondaryHeading}>
                Search For a Specific Patient
							</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                fullWidth
                name="patientSearch"
                value={this.state.term}
                onChange={this.handleInputChange}
                label="Patient Search"
                variant="outlined"
                placeholder="John Doe"
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br></br>

          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead className="table-head">
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tableHead}>First Name</TableCell>
                  <TableCell className={classes.tableHead}>Last Name</TableCell>
                  <TableCell className={classes.tableHead}>Email</TableCell>
                  <TableCell className={classes.tableHead}>Phone</TableCell>
                  <TableCell className={classes.tableHead}>Full Info</TableCell>
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

                      <StyledTableRow className="patient-table-row" key={row.id}>
                        <TableCell
                          className={`${classes.tableData} ${classes.tableLeft}`}
                          component="th"
                          scope="row"
                          style={{ fontSize: "1.2em" }}>
                          {row.first}
                        </TableCell>
                        <TableCell
                          className={classes.tableData}
                          style={{ fontSize: "1.2em" }}>
                          {row.last}
                        </TableCell>
                        <TableCell
                          className={classes.tableData}
                          style={{ fontSize: "1.2em" }}>
                          {row.email}
                        </TableCell>
                        <TableCell
                          className={classes.tableData}
                          style={{ fontSize: "1.2em" }}>
                          {row.phone}
                        </TableCell>
                        <TableCell
                          className={classes.tableData}
                          style={{ fontSize: "1.2em" }}>
                          <button
                            className={classes.showBtn}
                            variant="outlined"
                            value={row.id}
                            label="Show"
                            color="secondary"
                            onClick={this.btnClick}>
                            Show
					                </button>
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
                {
                  emptyRows > 0 && (
                    <TableRow style={{ height: 0 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )
                }


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

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.closeProfile}
          TransitionComponent={this.Transition}>
          <AppBar className="profile-bar">
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.closeProfile}
                aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.flex}>
                {/* {filtered[0].firstName} {
                  filtered[0].lastName
                } */}
              </Typography>
            </Toolbar>
          </AppBar>
          <PatientProfile user={filtered[id]} />
        </Dialog>

      </>
    );

  }
}
ThinProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
});

export default connect(
  mapStateToProps,
  { getPatientsList }
)(withStyles(styles)(ThinProfile));