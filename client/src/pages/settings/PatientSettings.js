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

// class PatientSettings extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			expanded: null,
// 			openSnackBar: false,
// 			address: {
// 				street: "",
// 				city: "",
// 				number: ""
// 			},
// 			birthday: "",
// 			sex: "",
// 			email: "",
// 			work: "",
// 			maritalStatus: "",
// 			emergency: {
// 				fName: "",
// 				lName: "",
// 				relation: "",
// 				phoneNumber: ""
// 			},
// 			phone: "",
// 			allergies: "",
// 			medAllergies: "",
// 			injuries: "",
// 			operations: "",
// 			currMeds: "",
// 			height: "",
// 			weight: "",
// 			blood: {
// 				type: "",
// 				rhesus: ""
// 			}
// 		};
// 		this.handleExpand = this.handleExpand.bind(this);
// 		this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
// 		this.onAddress = this.onAddress.bind(this);
// 		this.onEmergency = this.onEmergency.bind(this);
// 		this.onChangeSettings = this.onChangeSettings.bind(this);
// 		this.onChangeBloodType = this.onChangeBloodType.bind(this);
// 		this.onSave = this.onSave.bind(this);
// 	}
// 	handleExpand = panel => (event, expanded) => {
// 		this.setState({
// 			expanded: expanded ? panel : false
// 		});
// 	};
// 	handleCloseSnackBar = () => {
// 		this.setState({ openSnackBar: false });
// 	};
// 	onAddress = ev => {
// 		this.setState({
// 			address: Object.assign({}, this.state.address, {
// 				[ev.target.name]: ev.target.value
// 			})
// 		});
// 	};
// 	onEmergency = ev => {
// 		this.setState({
// 			emergency: Object.assign({}, this.state.emergency, {
// 				[ev.target.name]: ev.target.value
// 			})
// 		});
// 	};
// 	onChangeSettings = ev => {
// 		this.setState({
// 			[ev.target.name]: ev.target.value
// 		});
// 	};
// 	onChangeBloodType = ev => {
// 		this.setState({
// 			blood: Object.assign({}, this.state.blood, {
// 				[ev.target.name]: ev.target.value
// 			})
// 		});
// 	};
// 	componentDidMount = () => {
// 		this.props.getPatientSettings(this.props.auth.user.id);
// 	};
// 	componentWillReceiveProps(nextProps) {
// 		if (nextProps.settings) {
// 			this.setState(Object.assign({}, nextProps.settings));
// 		}
// 	}
// 	onSave = ev => {
// 		this.setState({ openSnackBar: true, expanded: null });
// 		this.props.updatePatientSettings(this.state, this.props.auth.user.id);
//     };