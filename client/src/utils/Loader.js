import React from "react";
import { withStyles } from "@material-ui/core/styles"; 
import CircularProgress from "@material-ui/core/CircularProgress"; 

const styles = theme => ({
  progress: {
    display: "block",
    margin: "20% auto"
  }
});

function Loader(props) {
  const { classes } = props;
  return (
    <div><CircularProgress className={classes.progress} /></div>
  )
}

export default withStyles(styles)(Loader);