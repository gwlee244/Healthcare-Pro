// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import { connect } from "react-redux";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Snackbar from "@material-ui/core/Snackbar";
// import IconButton from "@material-ui/core/Icon";
// import CloseIcon from "@material-ui/icons/Close";
// // Components
// import ProfileActions from "../app-bar/ProfileActions";
// // Actions
// import {
// 	updatePatientSettings,
// 	getPatientSettings
// } from "../../actions/settingsActions";
// const styles = theme => ({
// 	root: {
// 		width: "100%"
// 	},
// 	heading: {
// 		fontSize: theme.typography.pxToRem(17),
// 		flexBasis: "33.33%",
// 		flexShrink: 0
// 	},
// 	secondaryHeading: {
// 		fontSize: theme.typography.pxToRem(15),
// 		color: theme.palette.text.secondary
// 	},
// 	paperConfig: {
// 		width: "60vw",
// 		height: "100%",
// 		margin: "2em auto",
// 		padding: "2em"
// 	},
// 	dateField: {
// 		marginLeft: theme.spacing.unit,
// 		marginRight: theme.spacing.unit,
// 		width: 300
// 	},
// 	headerConfig: {
// 		marginBottom: "3vh",
// 		marginTop: "3vh"
// 	},
// 	btn: {
// 		margin: "3em 0 1em 1em",
// 		width: "10vw"
// 	},
// 	spaceAround: {
// 		display: "flex",
// 		justifyContent: "space-between"
// 	}
// });