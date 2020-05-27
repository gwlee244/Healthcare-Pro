import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import StarIcon from "@material-ui/icons/Star";
import StarsIcon from '@material-ui/icons/Stars';
import PhoneIcon from "@material-ui/icons/Phone";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icon/Close";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import getAvatarInitials from "../../helpers/getAvatarInitials";
import BusinessIcon from '@material-ui/icons/Business';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DoctorProfile from "../DoctorProf";  // need to write this 
import { CardContent, CardActionArea, Dialog } from '@material-ui/core';
const styles = {
    card: {
        width: "23vw"
    },
    media: {
        height: 100
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: "0 10px 10px 0"
    },
    typoMargin: {
        marginBottom: "-6px",
        marginLeft: "1em"
    },
    appBar: {
        position: "relative"
    }
};
export class CardProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            profileOpen: false,
            confirmUnsubscribe: false
        };
        this.closeProfile = this.closeProfile.bind(this);
        this.Transition = this.Transition.bind(this);
        this.unSubscribe = this.unSubscribe.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
    }
    Transition(props) {
        return <Slide direction = "up" {...props} />
    }
    closeProfile = () => {
        this.setState({ profileOpen: false });
    }
    unSubscribe = () => {
        unSubscribeFromDoctor(this.props.parent, this.props.user._id)
    }

    renderSwitch = (stars) => {
        switch(stars) {
            case ["0", "0", "0", "0", "0"]:
                return 
                    <div>
                        <StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon />
                    </div>
                
            case ["1", "0", "0", "0", "0"]:
                return 
                    <div>
                        <StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon />
                    </div>    
            case ["1", "1", "0", "0", "0"]:
                return 
                    <div>
                        <StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon />
                    </div>
            case ["1", "1", "1", "0", "0"]:
                return 
                    <div>
                        <StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon />
                    </div>
            case ["1", "1", "1", "1", "0"]:
                return 
                    <div>
                        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon />
                    </div>
            case ["1", "1", "1", "1", "1"]:
                return 
                    <div>
                        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                    </div>
                
        }
    }
    render() {
        const { classes, user } = this.props;
        return (
            <div>
                <Card className="classes.card">
                    <CardActionArea>
                        <CardContent>
                            <Typography className={classes.typoMargin} variant="h2" component="h3">
                                {`Dr. ${user.firstName} ${user.lastName}`}
                            </Typography>
                            <LocalHospitalIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                {`${user.settings.hospitalName ? user.settings.hospitalName : 'N/A'}`}
                            </Typography>
                            <BusinessIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                {`${user.settings.hospitalAddress ? user.settings.hospitalAddress : 'N/A'}`}
                            </Typography>
                            <MeetingRoomIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                {`${user.settings.roomNumber ? user.settings.roomNumber : 'N/A'}`}
                            </Typography>
                            <DateRangeIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                {`${user.settings.dob ? user.settings.dob : 'N/A'}`}
                            </Typography>
                            <DateRangeIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                {`${user.settings.dob ? user.settings.dob : 'N/A'}`}
                            </Typography>
                            <PhoneIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                {`${user.settings.phoneNumber ? user.settings.phoneNumber : 'N/A'}`}
                            </Typography>
                            <StarsIcon />
                            <Typography className={classes.typoMargin} variant="h3" component="h4">
                                <Button onClick = {() => this.renderSwitch(user.stars)}> Show Rating </Button>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {this.Transition(props)}
                        <Button onClick={() => this.setState({ confirmUnsubscribe: true })}>Unsubscribe</Button>
                        <Button onClick={() => this.setState({ profileOpen: true })}>Show Profile</Button>
                        <Button onClick={() => this.closeProfile()}>
                            <CloseIcon />                            
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
CardProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  
  export default WithStyles(styles)(CardProfile);
  


