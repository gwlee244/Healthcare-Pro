/*
  Login page
  @imported in App
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import '../../style/base.scss';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
// Components
import Header from "../../components/app-bar/Header";
// Actions
import { loginUser } from "../../actions/authorizationAction";

const styles = theme => ({
	width: {
		width: "350px"
	},
	margin: {
		margin: "2vh auto"
	},
	paperWidth: {
		width: "400px",
		height: "350px",
		margin: "10vh auto"
	},
	typographyPadding: {
		paddingTop: "3vh"
	}
});

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.loginErr = this.loginErr.bind(this);
	}

	componentDidMount() {
    console.log(this.props.auth.user);
		if (this.props.auth.user.typeOfUser === "Doctor") {
			if (this.props.auth.isAuthenticated) {
				this.props.history.push("/doctor/home");
			}
		}
		if (this.props.auth.user.typeOfUser === "Patient") {
			if (this.props.auth.isAuthenticated) {
				this.props.history.push("/patient/home");
			}
		}
	}

	onSubmit(ev) {
		ev.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData);
	}

	onChange(ev) {
		this.setState({
			[ev.target.name]: ev.target.value,
			errors: {}
		});
	}

	loginErr(errMsg) {
		if (errMsg) {
			return <div className="login-err">{errMsg}</div>;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		if (nextProps.auth.user.typeOfUser === "Patient") {
			if (nextProps.auth.isPatientAuthenticated) {
				this.props.history.push("/patient/home");
			}
		}
		if (nextProps.auth.user.typeOfUser === "Doctor") {
			if (nextProps.auth.isDoctorAuthenticated) {
				this.props.history.push("/doctor/home");
			}
		}
	}

	render() {
		const { classes } = this.props;
		const { errors } = this.state;
		return (
			<div className="login-background">
				<Header headerLabel={"Login"} back={true} toLocation="/" />

				<Paper elevation={3} className={classes.paperWidth}>
					<Typography
						className={classes.typographyPadding}
						variant="h4"
						align="center">
						Log In
					</Typography>

					<form onSubmit={this.onSubmit}>
						<div className="login-container">
							{this.loginErr(
								`${
									errors
										? errors.email
											? errors.email
											: errors.password
											? errors.password
											: ""
										: ""
								}`
							)}
							<FormControl error={errors.email}>
								<InputLabel>Email</InputLabel>
								<Input
									name="email"
									type="email"
									placeholder="E-Mail"
									className={`${classes.width} ${
										classes.margin
									}`}
									required={true}
									onChange={this.onChange}
								/>
							</FormControl>
							<FormControl error={errors.password}>
								<InputLabel>Password</InputLabel>
								<Input
									name="password"
									type="password"
									placeholder="Password"
									className={`${classes.width} ${
										classes.margin
									}`}
									required={true}
									onChange={this.onChange}
								/>
							</FormControl>
							<Button
								variant="contained"
								className={`${classes.width} ${classes.margin}`}
								onClick={this.onSubmit}>
								Submit
							</Button>
						</div>
					</form>
				</Paper>
			</div>
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withStyles(styles)(Login));
