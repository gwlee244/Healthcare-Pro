/*
    Component that renders app header on login and register screens
    @imported in Login, Register
*/
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

const styles = {
  root: {
    flexGrow: 1
  },
  center: {
    textAlign: "center"
  },
  end: {
    justifyContent: "flex-end"
  },
  arrow: {
    color: "#66FF99"
  },
  headerLabel: {
    fontFamily: `'Ultra', serif`
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className="bar" position="static">
        <ToolBar>
          {props.back ? (
            <IconButton href={props.toLocation}>
              <ArrowBack className={classes.arrow} />
            </IconButton>
          ) : (
              ""
            )}
          <Typography variant="h6" 
          color="inherit">
            {`${props.headerLabel}\u00A0\u00A0\u00A0|`}
          </Typography>
          <Typography variant="h6"
          className={classes.headerLabel} 
          color="inherit">
         {`\u00A0\u00A0 Healthcare Pro`}
          </Typography>

        </ToolBar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
