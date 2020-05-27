import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icon/Close";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import getAvatarInitials from "../../helpers/getAvatarInitials";
import DoctorProfile from "../DoctorProf";  // need to write this 
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
    render() {
        const { classes, user } = this.props;
        return (
            <div>
                <Card className="classes.card">
                    <CardActions>
                        <Button onClick={() => this.setState({ confirmUnsubscribe: true })}>Unsubscribe</Button>
                        <Button onClick={() => this.setState({ profileOpen: true })}>Show Profile</Button>
                    </CardActions>
                    
                </Card>
            </div>
        )
    }
}
export default CardProfile


