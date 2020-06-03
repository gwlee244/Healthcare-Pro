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
    
//     render() {
// 		const { classes } = this.props;
// 		const { expanded } = this.state;
// 		return (
// 			<div className={classes.root}>
// 				<ProfileActions
// 					userRole="Patient"
// 					back={true}
// 					toLocation="/patient/home"
// 				/>
// 				<Paper elevation={5} className={classes.paperConfig}>
// 					<Typography variant="h4" className={classes.headerConfig}>
// 						General Settings
// 					</Typography>
// 					<ExpansionPanel
// 						expanded={expanded === "panel1"}
// 						onChange={this.handleExpand("panel1")}>
// 						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
// 							<Typography className={classes.heading}>
// 								Address
// 							</Typography>
// 							<Typography className={classes.secondaryHeading}>
// 								Please input your address
// 							</Typography>
// 						</ExpansionPanelSummary>
// 						<ExpansionPanelDetails>
// 							<div className={classes.spaceAround}>
// 								<TextField
// 									type="text"
// 									onChange={this.onAddress}
// 									name="city"
// 									value={this.state.address.city}
// 									variant="outlined"
// 									label="Your city"
// 									placeholder="i.e. Kyiv, Kharkiv, Odessa"
// 								/>
// 								<TextField
// 									type="text"
// 									onChange={this.onAddress}
// 									name="street"
// 									variant="outlined"
// 									label="Your street"
// 									value={this.state.address.street}
// 									placeholder="i.e. Ivana Franka, Zelena"
// 								/>
// 								<TextField
// 									type="text"
// 									onChange={this.onAddress}
// 									name="number"
// 									variant="outlined"
// 									value={this.state.address.number}
// 									label="Your house number"
// 									placeholder="i.e. 46"
// 								/>
// 							</div>
// 						</ExpansionPanelDetails>
// 					</ExpansionPanel>
// 					<ExpansionPanel
// 						expanded={expanded === "panel2"}
// 						onChange={this.handleExpand("panel2")}>
// 						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
// 							<Typography className={classes.heading}>
// 								Date of Birth
// 							</Typography>
// 							<Typography className={classes.secondaryHeading}>
// 								Please input your birthday, so we know your age
// 							</Typography>
// 						</ExpansionPanelSummary>
// 						<ExpansionPanelDetails>
// 							<TextField
// 								type="date"
// 								variant="outlined"
// 								name="birthday"
// 								value={this.state.birthday}
// 								onChange={this.onChangeSettings}
// 								className={classes.dateField}
// 								label=""
// 							/>
// 						</ExpansionPanelDetails>
// 					</ExpansionPanel>
// 					<ExpansionPanel
// 						expanded={expanded === "panel3"}
// 						onChange={this.handleExpand("panel3")}>
// 						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
// 							<Typography className={classes.heading}>
// 								Sex
// 							</Typography>
// 							<Typography className={classes.secondaryHeading}>
// 								Set your sex
// 							</Typography>
// 						</ExpansionPanelSummary>
// 						<ExpansionPanelDetails>
// 							<div className="flex flex-center">
// 								<RadioGroup
// 									aria-label="Gender"
// 									name="sex"
// 									value={this.state.sex}
// 									onChange={this.onChangeSettings}>
// 									<FormControlLabel
// 										value="female"
// 										control={<Radio />}
// 										label="Female"
// 									/>
// 									<FormControlLabel
// 										value="male"
// 										control={<Radio />}
// 										label="Male"
// 									/>
// 								</RadioGroup>
// 							</div>
// 						</ExpansionPanelDetails>
// 					</ExpansionPanel>
// 					<ExpansionPanel
// 						expanded={expanded === "panel4"}
// 						onChange={this.handleExpand("panel4")}>
// 						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
// 							<Typography className={classes.heading}>
// 								E-mail
// 							</Typography>
// 							<Typography className={classes.secondaryHeading}>
// 								Please input your e-mail, so we can send for you
// 								different data
// 							</Typography>
// 						</ExpansionPanelSummary>
// 						<ExpansionPanelDetails>
// 							<TextField
// 								type="email"
// 								fullWidth
// 								name="email"
// 								value={this.state.email}
// 								onChange={this.onChangeSettings}
// 								variant="outlined"
// 								label="Your E-mail"
// 								placeholder="example@example.com"
// 							/>
// 						</ExpansionPanelDetails>
// 					</ExpansionPanel>
// 					<ExpansionPanel
// 						expanded={expanded === "panel5"}
// 						onChange={this.handleExpand("panel5")}>
// 						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
// 							<Typography className={classes.heading}>
// 								Marital Status
// 							</Typography>
// 							<Typography className={classes.secondaryHeading}>
// 								Tell us about your maritial status
// 							</Typography>
// 						</ExpansionPanelSummary>
// 						<ExpansionPanelDetails>
// 							<Select
// 								value={this.state.maritalStatus}
// 								name="maritalStatus"
// 								onChange={this.onChangeSettings}
// 								variant="outlined"
// 								className={classes.dateField}>
// 								<MenuItem value="">
// 									<em>None</em>
// 								</MenuItem>
// 								<MenuItem value={"Single"}>Single</MenuItem>
// 								<MenuItem value={"Married"}>Married</MenuItem>
// 								<MenuItem value={"Divorced"}>Divorced</MenuItem>
// 								<MenuItem value={"Widowed"}>Widowed</MenuItem>
// 							</Select>
// 						</ExpansionPanelDetails>
// 					</ExpansionPanel>