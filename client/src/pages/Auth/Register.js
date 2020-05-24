/*
	Register component
	@imported in App
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// Helpers
import getRandomMaterialColor from "../../helpers/getRandomMaterialColor";
// Components
import Header from "../../components/app-bar/Header";
// Actions
import {
	registerDoctor,
	registerPatient
} from "../../actions/authorizationAction";

const styles = theme => ({
	paper: {
		width: "50vw",
		margin: "3vh auto",
		paddingTop: "5vh"
	},
	layout: {
		width: "60%",
		height: "100%",
		margin: "3vh auto",
		display: "flex",
		flexDirection: "column"
	},
	row: {
		flexDirection: "row",
		marginBottom: "5vh"
	},
	buttonLayout: {
		width: "48%",
		margin: "auto"
	},
	typographyPadding: {
		paddingTop: "3vh"
	},
	marginTop: {
		marginTop: "5vh"
	}
});

class Register extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			password2: "",
      typeOfUser: "",
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.registerErr = this.registerErr.bind(this);
	}

	onChange(ev) {
		this.setState({
			[ev.target.name]: ev.target.value,
			errors: {}
		});
	}

	registerErr(errMsg) {
		if (errMsg) {
			return <div className="register-err">{errMsg}</div>;
		}
	}

	onSubmit(ev) {
		ev.preventDefault();
		const userData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
      typeOfUser: this.state.typeOfUser,
			color: getRandomMaterialColor()
		};

		if (this.state.typeOfUser === "Doctor") {
			this.props.registerDoctor(userData, this.props.history);
		}
		if (this.state.typeOfUser === "Patient") {
			this.props.registerPatient(userData, this.props.history);
		}
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		return (
			<div>
				<Header headerLabel="Register" back={true} toLocation="/" />
				<Paper elevation={3} className={classes.paper}>
					<Typography
						className={classes.typographyPadding}
						variant="h4"
						align="center">
						Register
					</Typography>
					<form onSubmit={this.onSubmit}>
						<div className={classes.layout}>
							<FormControl error={errors.firstName}>
								<InputLabel>First name</InputLabel>
								<Input
									name="firstName"
									type="text"
									placeholder="First name"
									required={true}
									onChange={this.onChange}
								/>
								{this.registerErr(
									`${
										errors.firstName ? errors.firstName : ""
									}`
								)}
							</FormControl>

							<FormControl
								className={classes.marginTop}
								error={errors.lastName}>
								<InputLabel>Last name</InputLabel>
								<Input
									name="lastName"
									type="text"
									placeholder="Last name"
									required={true}
									onChange={this.onChange}
								/>
								{this.registerErr(
									`${errors.lastName ? errors.lastName : ""}`
								)}
							</FormControl>

							<FormControl
								className={classes.marginTop}
								error={errors.email}>
								<InputLabel>E-mail</InputLabel>
								<Input
									name="email"
									type="email"
									placeholder="Enter your E-mail"
									required={true}
									onChange={this.onChange}
								/>
								{this.registerErr(
									`${errors.email ? errors.email : ""}`
								)}
							</FormControl>

							<FormControl
								className={classes.marginTop}
								error={errors.password}>
								<InputLabel>Password</InputLabel>
								<Input
									name="password"
									type="password"
									placeholder="Enter your password"
									required={true}
									onChange={this.onChange}
								/>
								{this.registerErr(
									`${errors.password ? errors.password : ""}`
								)}
							</FormControl>

							<FormControl
								className={classes.marginTop}
								error={errors.password2}>
								<InputLabel>Password confirm</InputLabel>
								<Input
									name="password2"
									type="password"
									placeholder="Confirm your password"
									required={true}
									onChange={this.onChange}
								/>
								{this.registerErr(
									`${
										errors.password2 ? errors.password2 : ""
									}`
								)}
							</FormControl>

							<FormControl
								className={classes.marginTop}
								required
								error={errors.typeOfUser}
								component="fieldset">
								<FormLabel component="legend">
									Choose your role
								</FormLabel>
								<RadioGroup
									name="typeOfUser"
									required
									value={this.state.typeOfValue}
									onChange={this.onChange}>
									<FormControlLabel
										value="Doctor"
										control={<Radio color="secondary" />}
										label="Doctor"
										labelPlacement="end"
									/>
									<FormControlLabel
										value="Patient"
										control={<Radio color="secondary" />}
										label="Patient"
										labelPlacement="end"
									/>
								</RadioGroup>
								<FormHelperText>
									You can`t change this in future
								</FormHelperText>
								{this.registerErr(
									`${
										errors.typeOfUser
											? errors.typeOfUser
											: ""
									}`
								)}
							</FormControl>
							<FormControl
								className={`${classes.marginTop} ${
									classes.row
								}`}>
								<Button
									className={classes.buttonLayout}
									variant="contained"
									type="submit">
									Register
								</Button>
								<Button
									className={classes.buttonLayout}
									variant="outlined"
									
									onClick={this.onSubmit}
									href="/">
									Cancel
								</Button>
							</FormControl>
						</div>
					</form>
				</Paper>
			</div>
		);
	}
}

Register.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	general: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	general: state.general
});

export default connect(
	mapStateToProps,
	{ registerDoctor, registerPatient }
)(withStyles(styles)(withRouter(Register)));
