import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// Helpers
import getAvatarInitials from "../../helpers/getAvatarInitials";
// Actions
import { merge } from "../../actions/utilsAction";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    width: "80%",
    margin: "auto",
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
});

class SearchCard extends Component {
  handleAdd = () => {
    this.props.merge(this.props.doctor, this.props.auth.user);
    this.props.close();
    window.location.reload();
  };
  render() {
    const { classes, doctor } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={3} >
          <div className="flex searchCard">
            <Avatar className={classes.purpleAvatar}>
              {getAvatarInitials(
                doctor.firstName, doctor.lastName
              )}
            </Avatar>
            <Typography variant="h5" component="h3">
              { `Dr ${doctor.firstName} ${doctor.lastName}`}
            </Typography>
            <Button color="secondary" onClick={this.handleAdd}>
              Add
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

SearchCard.propTypes= {
  auth: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
})

export default connect(mapStateToProps, { merge })
(withStyles(styles)
(SearchCard));