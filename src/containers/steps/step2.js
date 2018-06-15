import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import styles from "./styles";
import { getAvailableRestaurants } from "./data";
import { OrderActions } from "../../store";

class Step2 extends Component {
  constructor(props) {
    super(props);

    const { meal, restaurant } = props.order;

    this.restaurants = getAvailableRestaurants(meal);
    this.state = {
      restaurant
    };
  }

  componentWillReceiveProps(newProps) {
    const { restaurant } = newProps.order;
    this.setState({
      restaurant
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });

    setTimeout(() => {
      const { restaurant } = this.state;
      this.props.saveRestaurant(restaurant);

      const validated = restaurant !== "";
      this.props.handleValidationChange(validated);
    }, 0);
  };

  render() {
    const { classes, order } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="restaurant-simple">
            Please Select a restaurant
          </InputLabel>
          <Select
            value={this.state.restaurant}
            onChange={this.handleChange("restaurant")}
            inputProps={{
              name: "restaurant",
              id: "restaurant-simple"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.restaurants.map((restaurant, index) => {
              return (
                <MenuItem key={`RestaurantItem_${index}`} value={restaurant}>
                  {restaurant}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
  handleValidationChange: PropTypes.func
};

const mapStateToProps = state => ({
  order: state.order
});

const mapDispatchToProps = {
  saveRestaurant: OrderActions.saveRestaurant
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Step2)
);
