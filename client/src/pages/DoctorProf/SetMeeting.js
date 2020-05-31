/*
	Component, where patient can set next meeting with doctor
	@imported at DoctorProfileTabs
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
//Helpers
import getEndTime from "../../helpers/getEndTime";
import getAvailableTime from "../../helpers/getAvailableTime";
import startOfWeek from "../../helpers/startOfWeek";
// Actions
import {
	appointmentAdd,
	getPatientAppointments
} from "../../actions/calendarAction";
const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	container: {
		flexDirection: "column",
		width: "50vw",
		margin: "1em auto"
	},
	marginBottom: {
		marginBottom: "5vh"
	},
	bottomButtons: {
		width: "100%"
	},
	cancelButton: {
		marginRigth: "0.5em",
		width: "100%"
	},
	submitButton: {
		marginLeft: "0.5em",
		width: "100%"
	},
	close: {
		padding: theme.spacing.unit / 2
	}
});
