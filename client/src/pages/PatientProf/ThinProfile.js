/*
  Component, that show in My patients tab for doctor, thin and long, opens Patient profile component
  @imported in PatientsList
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
//Components
import PatientProfile from "./PatientProfile";
const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 1.5,
		paddingBottom: theme.spacing.unit * 1.5,
		margin: "auto",
		width: "85%",
		display: "flex",
		flexWrap: "wrap",
		marginBottom: ".5em"
	},
	showBtn: {
		marginLeft: "auto"
	},
	appBar: {
		position: "relative"
  },
  infoItems: {
    color: "black"
  }
});
class ThinProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		this.infoItem = this.infoItem.bind(this);
		this.closeProfile = this.closeProfile.bind(this);
		this.calculateAge = this.calculateAge.bind(this);
		this.Transition = this.Transition.bind(this);
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
	closeProfile = () => {
		this.setState({ open: false });
	};
	Transition(props) {
		return <Slide direction="up" {...props} />;
	}
	calculateAge(birthday) {
		// birthday is a date
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
	render() {
		const { classes, user } = this.props;
		if (!user.settings) {
      return null;
    }
		// 	user.settings = {
		// 		birthday: "N/A",
		// 		address: {
		// 			city: "N/A",
		// 			street: "N/A",
		// 			number: "N/A"
		// 		},
		// 		phone: "N/A",
		// 		work: "N/A",
		// 		blood: {
		// 			type: "N/A",
		// 			rhesus: "N/A"
		// 		}
		// 	};
		// }
		let pickedDate = user.settings ? user.settings.birthday.split("-") : "";
		let recievedDate = new Date(...pickedDate);
		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<div className="flex flex-center infoItemMargin">
						<AccountCircleIcon
							className="iconMargin"
							fontSize="large"
						/>
						<Typography variant="h6">
							{`${user.firstName} ${user.lastName}`}
						</Typography>
					</div>
					{this.infoItem(
						<HomeIcon className="iconMargin" />,
						(user.settings.address.street ? `Address: ${user.settings.address.number} ${
							user.settings.address.street
						}, ${user.settings.address.city}` : "Address: N/A")
					)}
					{this.infoItem(
						<EventIcon className="iconMargin" />,
						(user.settings.birthday ? `Date of Birth: ${recievedDate.getDate()}.${recievedDate.getMonth() +
							1}.${recievedDate.getFullYear()} (${this.calculateAge(
							recievedDate
						)} years of age)` : "Date of Birth: N/A")
					)}
					{this.infoItem(
						<PhoneIcon className="iconMargin" />,
            
            <a className={classes.infoItems} href = {`tel:${user.settings.phone}`}>Phone: {user.settings.phone || "N/A"}</a>
					)}
					{this.infoItem(
						<MailIcon className="iconMargin" />,
					  <a className={classes.infoItems} href = {`mailto:${user.settings.email}`}>Email: {user.settings.email || "N/A"}</a>
					)}
					{this.infoItem(
						<WorkIcon className="iconMargin" />,
						`Occupation: ${user.settings.work || "N/A"}`
					)}
					<Button
						className={classes.showBtn}
						variant="outlined"
						color="secondary"
						onClick={() => this.setState({ open: true })}>
						Show
					</Button>
				</Paper>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.closeProfile}
					TransitionComponent={this.Transition}>
					<AppBar className={classes.appBar}>
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
								{`${this.props.user.firstName} ${
									this.props.user.lastName
								}`}
							</Typography>
						</Toolbar>
					</AppBar>
					<PatientProfile user={this.props.user} />
				</Dialog>
			</div>
		);
	}
}
ThinProfile.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};
export default withStyles(styles)(ThinProfile);