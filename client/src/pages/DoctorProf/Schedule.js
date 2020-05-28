import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const CustomTableCell = WithStyles(theme => ({
    head: {
        backgroundColor: "#ADD8E6",
        color: theme.palette.common.white,
        fontSize: 18
    },
    body: {
        fontSize: 20,
    }
}))(TableCell);

const styles = {
    root: {
        width: "100%"
    },
    table: {
        minWidth: 700
    }
};

let id = 0;

function createDay(day, from, to) {
    id += 1;
    return {
        id, day, from, to
    };
}

function DoctorSchedule(props) {
    const { classes, timeTable } = props;
    const rows = [
        createData(
            "Monday", 
            timeTable.monday.fromMonday,  //need to create setMonday class
            timeTable.monday.toMonday
        ),
        createData(
            "Tuesday", 
            timeTable.tuesday.fromTuesday,  //need to create setMonday class
            timeTable.tuesday.toTuesday
        ),
        createData(
            "Wednesday", 
            timeTable.wednesday.fromWednesday,  //need to create setMonday class
            timeTable.wednesday.toWednesday
        ),
        createData(
            "Thursday", 
            timeTable.thursday.fromThursday,  //need to create setMonday class
            timeTable.thursday.toThursday
        ),
        createData(
            "Friday", 
            timeTable.friday.fromFriday,  //need to create setMonday class
            timeTable.friday.toFriday
        )
    ];
    return (
        <Paper className={ classes.root }>
            <Table className= { classes.table }>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Day of Week</CustomTableCell>
                        <CustomTableCell align="right">Start of Working Day</CustomTableCell>
                        <CustomTableCell align="right">End of Working Day</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map( row => {
                        <TableRow key={ row.id }>
                        <CustomTableCell>{row.day}</CustomTableCell>
                        <CustomTableCell>{row.from}</CustomTableCell>
                        <CustomTableCell>{row.to}</CustomTableCell>
                    </TableRow>
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}

DoctorSchedule.propTypes = {
    classes: PropTypes.object.isRequired
  }
  
  export default withStyles(styles)(DoctorSchedule);

