/*
   Using this for patient and doctor. Will import patient and doctor local
   profile components into this main profileAction component
*/
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";

import getAvatarInitials from "../../helpers/getAvatarInitials";
// Components
import LocalPatientProfile from "../../pages/PatientProf/LocalPatientProfile";
import LocalDoctorProfile from "../../pages/DoctorProf/LocalDoctorProfile";
// Actions
import { logout } from "../../actions/authorizationAction";
import { setToken, getUserData } from "../../actions/utilsAction";

const TokenGenerator = require("uuid-token-generator");

const token = new TokenGenerator().generate();

const styles = theme => ({
	root: {
    width: "100%",
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
    marginRight: 20,
  },
	title: {
		// display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block"
		}
	},
	inputRoot: {
		color: "inherit",
		width: "100%"
	},
	avatar: {
		color: "#fff",
    backgroundColor: "#f15e09",
    padding:30,
    marginRight:10
  },
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 200
    },
    
	},
	sectionDesktop: {
		// display: "none",
		// [theme.breakpoints.up("md")]: {
      display: "flex",
		// }
	},
  arrow: {
    color: "#66FF99"
  }
});

class ProfileActions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			mobileMoreAnchorEl: null,
			open: false,
			snackOpen: false,
			openProfile: false
		};
		this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
		this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
		this.dialogOpen = this.dialogOpen.bind(this);
		this.dialogClose = this.dialogClose.bind(this);
		this.copyAndSubmit = this.copyAndSubmit.bind(this);
		this.snackClose = this.snackClose.bind(this);
		this.closeProfile = this.closeProfile.bind(this);
		this.Transition = this.Transition.bind(this);
	}

	componentDidMount() {
    this.props.getUserData(this.props.auth.user.id);
  }

	Transition(props) {
		return <Slide direction="up" {...props} />;
	}

	closeProfile = () => {
		this.setState({ openProfile: false });
	};

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	dialogOpen = () => {
		this.setState({ open: true });
	};

	dialogClose = () => {
		this.setState({ open: false });
	};

	copyAndSubmit = () => {
    this.setState({ snackOpen: true });
    let id = this.props.auth.user.id;
		this.props.setToken(token, id);
	};

	snackClose = () => {
    console.log("snack closed");
		this.setState({ snackOpen: false });
	};

	render() {
  
    console.log(this.props.userRole);
		const { anchorEl } = this.state;
		const { classes } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		let initials = getAvatarInitials(
			this.props.auth.user.firstName,
			this.props.auth.user.lastName
		).join("");
		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}>
				<MenuItem
					onClick={() => {
						this.setState({ openProfile: true });
					}}>
					My Profile
				</MenuItem>
				{this.props.userRole === "Doctor" ? (
					<div>
						<MenuItem onClick={this.dialogOpen}>
							Generate token
						</MenuItem>
						<Link to="/doctor/home/settings">
							<MenuItem>Settings</MenuItem>
						</Link>
					</div>
				) : (
					""
				)}
				{this.props.userRole === "Patient" ? (
					<Link to="/patient/home/settings">
						<MenuItem onClick={this.onSettings}>Settings</MenuItem>
					</Link>
				) : (
					""
				)}
				<MenuItem onClick={this.props.logout}>Logout</MenuItem>
			</Menu>
		);

		return (
			<div className={classes.root}>
				<Dialog
					open={this.state.open}
					onClose={this.dialogClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Generate Token
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
						Copy this jumbled token and send it to your patients to verify that they are your clients and can see your information
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Token"
							type="text"
							value={token}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<CopyToClipboard text={token}>
							<Button onClick={this.copyAndSubmit} color="primary">
								Copy and Submit
							</Button>
						</CopyToClipboard>
            <Button onClick={this.dialogClose} color="primary">
							Exit Profile
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.snackOpen}
					autoHideDuration={2000}
					onClose={this.snackClose}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={<span id="message-id">Copied!</span>}
				/>
				<AppBar className="bar" position="static">
					<Toolbar>
          {this.props.userRole === "Doctor" && this.props.back ? (
						<Link to="/doctor/home">
                <IconButton>
								<ArrowBack className={classes.arrow} />
                </IconButton>
							</Link>
						) : (
							""
						)}
             {this.props.userRole === "Patient" && this.props.back ? (
						<Link to="/patient/home">
                <IconButton>
								<ArrowBack className={classes.arrow} />
                </IconButton>
							</Link>
						) : (
							""
						)}
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap>
						Healthcare Pro
						</Typography>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
           
							<IconButton
								aria-owns={
									isMenuOpen ? "material-appbar" : undefined
								}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit">
                  <Avatar className={classes.avatar}>
									{initials}
								</Avatar>
                <MenuIcon />
							</IconButton>
             
               
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
				<Dialog className={classes.profile}
					fullScreen
					open={this.state.openProfile}
					onClose={this.closeProfile}
					TransitionComponent={this.Transition}>
					<AppBar className= "profile-bar">
						<Toolbar>
							<IconButton
								color="secondary"
								onClick={this.closeProfile}
								aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography
								variant="h6"
								color="inherit"
								className={classes.flex}>
							Exit Profile
							</Typography>
						</Toolbar>
					</AppBar>
					{this.props.userRole === "Patient" ? (
						<LocalPatientProfile user={this.props.auth.localUser} />
					) : (
						<LocalDoctorProfile user={this.props.auth.localUser} />
					)}
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => ({ auth: state.auth });

ProfileActions.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	userRole: PropTypes.string.isRequired
};

export default connect(
	mapStateToProps,
	{ logout, setToken, getUserData }
)(withStyles(styles)(ProfileActions));
