import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";

class Step4 extends Component {
  render() {
    const { classes, order } = this.props;
    const { meal, numberOfPeople, restaurant, servings } = order;

    return (
      <div>
        <div className={classes.orderDetailRow}>
          <Typography className={classes.heading}>Meal</Typography>
          <Typography className={classes.secondaryHeading}>{meal}</Typography>
        </div>
        <div className={classes.orderDetailRow}>
          <Typography className={classes.heading}>No. of People</Typography>
          <Typography className={classes.secondaryHeading}>
            {numberOfPeople}
          </Typography>
        </div>
        <div className={classes.orderDetailRow}>
          <Typography className={classes.heading}>Restaurant</Typography>
          <Typography className={classes.secondaryHeading}>
            {restaurant}
          </Typography>
        </div>
        <div className={classes.orderDetailRow}>
          <Typography className={classes.heading}>Dishes</Typography>
          <div className={classes.flex1}>
            {servings.map((serving, index) => {
              return (
                <Typography
                  key={`ServingItem_${index}`}
                  className={classes.servingItem}
                >
                  {serving.dish} - {serving.numberOfServings}
                </Typography>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

const mapDispatchToProps = {};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Step4)
);
