import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paperStats: { margin: "1%" },
  headerMargin: { marginTop: "1vh" }
})

export class Stats extends Component {

  render() {
    const { classes } = this.props;
    const { quantity, sexesPie, satisfaction, monthlyVisitors, sexesBar } = this.props.stats;
   
    return (
    
      <div className="grid-stats">
        <div className="stats-quantity">
          <Paper elevation={3}>
            <Typography className={classes.headerMargin} variant="h5" align="center">
              Quantity
        </Typography>
            <Typography variant="subtitle1" align="center">
              You have
          </Typography>
            <Chart
              height="300px"
              width="100%"
              type="radialBar"
              options={quantity.options}
              series={quantity.series}
            />
            <Typography variant="subtitle1" align="center">
              Patients
          </Typography>
          </ Paper>
        </div>

        <div className="stats-sex">
          <Paper elevation={3}>
            <Typography className={classes.headerMargin} variant="h5" align="center">
              Gender
        </Typography>
            <Chart
              height="300px"
              width="100%"
              type="pie"
              options={sexesPie.options}
              series={sexesPie.series}
            />
          </ Paper>
        </div>

        <div className="stats-age">
          <Paper elevation={3}>
            <Typography className={classes.headerMargin} variant="h5" align="center">
              Ages
        </Typography>
            <Chart
              height="300px"
              width="100%"
              type="bar"
              options={sexesBar.options}
              series={sexesBar.series}
            />
          </ Paper>
        </div>

        {/* <div className="stats-visits">
          <Paper elevation={3}>
            <Typography className={classes.headerMargin} variant="h5" align="center">
              Visits
        </Typography>
            <Chart
              height="300px"
              width="100%"
              type="line"
              options={business.options}
              series={business.series}
            />
          </ Paper>
        </div> */}

        <div className="stats-satisfaction">
          <Paper elevation={3}>
            <Typography className={classes.headerMargin} variant="h5" align="center">
              Patient satisfaction
        </Typography>
            <Chart
              height="300px"
              width="100%"
              type="donut"
              options={satisfaction.options}
              series={satisfaction.series}
            />
          </ Paper>
        </div>

         <div className="stats-month">
          <Paper elevation={3}>
            <Typography className={classes.headerMargin} variant="h5" align="center">
              Monthly Stats
        </Typography>
        <Typography variant="subtitle1" align="center">
              You have
          </Typography>
            <Chart
              height="400px"
              width="100%"
              type="radialBar"
              options={monthlyVisitors.options}
              series={monthlyVisitors.series}
            />
             <Typography variant="subtitle1" align="center">
              Visits This Month
          </Typography>
          </ Paper>
        </div> 
      </div>
    );
  }
}
Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
}

export default withStyles(styles)(Stats);
