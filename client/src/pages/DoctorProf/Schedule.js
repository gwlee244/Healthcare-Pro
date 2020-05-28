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

