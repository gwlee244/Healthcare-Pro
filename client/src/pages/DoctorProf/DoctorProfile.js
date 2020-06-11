/*
	Component that shows when you click on profile in My patients tab, as doctor
	@imported in ThinProfile
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import getAvatarInitials from "../../helpers/getAvatarInitials";
import { colors } from "../../helpers/palette";
import { setRating } from "../../actions/utilsAction";
import StarRatingComponent from "react-star-rating-component";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Components
import DoctorProfileTabs from "./DoctorProfileTabs";

const styles = theme => ({
	root: {
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: "80%",
    margin: "auto",
    backgroundColor: "#00416A",
    justifyContent: 'center',
    textAlign: "center",
    // border: "5px solid #00416A"
	},
	avatar: {
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		width: "80px",
		fontSize: "24px",
		height: "80px",
    // backgroundColor: deepPurple[500],
    position: "absolute",
    marginTop: "1.7%",
    marginBottom: "1.7%",
    left:"10",
    fontFamily: `'Ultra', serif`,
	},
	secondPaper: {
		width: "80%",
		margin: "auto"
	},
	showBtn: {
		marginLeft: "auto",
    marginRight: "1em",
    color: "orange",
    border: "1px solid orange",
    "&:hover": { 
      color: "black",
      backgroundColor: "orange"
    }
	},
	star: {
		display: "flex",
		justifyContent: "center"
  },
  name: {
    margin: "0 auto",
    paddingTop: "3%",
    paddingBottom: "3%",
    fontWeight: "bolder",
    color: "white",
    marginRight: -40
  },
	rating: {
		marginTop: "1em",
    transform: "scale(2.5)",
    color: "orange"
	}
});

class DoctorProfile extends Component {
	constructor() {
		super();
		this.state = {
			rating: 0,
			open: false
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.getRating = this.getRating.bind(this);
		this.setRate = this.setRate.bind(this);
	}

	onStarClick(nextValue, prevValue, name) {
		this.setState({ rating: nextValue });
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	setRate = () => {
		setRating(this.state.rating, this.props.user._id);
		this.handleClose();
	};

	getRating = star => {
		switch (star) {
			case 1:
				return "Very unsatisfied";
			case 2:
				return "Unsatisfied";
			case 3:
				return "Neutral";
			case 4:
				return "Satisfied";
			case 5:
				return "Very satisfied";
			default:
				return "";
		}
	};

	render() {
		const { classes, user } = this.props;
		let initials = getAvatarInitials(user.firstName, user.lastName).join(
			""
		);
		return (
			<div className = "whole-profile">
				<Paper className="profile-root" elevation={1}>
					<div className="">
						<Avatar
							style={{
								backgroundColor: `${colors[user.color].bgc}`
							}}
							className="profile-avatar">
							{initials}
						</Avatar>
						<Typography className="profile-name" variant="h3">{`Dr. ${user.firstName} ${
							user.lastName
						}`}</Typography>
            
						<Button
							className={classes.showBtn}
							variant="outlined"
							
							onClick={this.handleClickOpen}>
							Rate this doctor
						</Button>
					</div>
				</Paper>
				<div>
					<Dialog
						className={classes.dialog}
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description">
						<DialogTitle id="alert-dialog-title">
							{"Rate this doctor from 1 to 5"}
						</DialogTitle>
						<DialogContent>
							<Typography>
								Let us know what you think about this person, it
								will help us improve the quality of our work
							</Typography>
							<div className={classes.star}>
								<StarRatingComponent
									name="rate1"
									className={classes.rating}
									starCount={5}
									value={this.state.rating}
									onStarClick={this.onStarClick.bind(this)}
								/>
							</div>
							<Typography variant="body1">
								{this.getRating(this.state.rating)}
							</Typography>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button
								onClick={this.setRate}
								color="primary"
								autoFocus>
								Rate
							</Button>
						</DialogActions>
					</Dialog>
				</div>
				<Paper className="profile-info" elevation={2}>
					
					<DoctorProfileTabs user={user} />
				</Paper>
			</div>
		);
	}
}

DoctorProfile.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoctorProfile);
