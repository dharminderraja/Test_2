import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import styles from "./styles";
import { meals } from "./data";
import { OrderActions } from "../../store";

class Step1 extends Component {
  constructor(props) {
    super(props);

    const { meal, numberOfPeople } = props.order;
    this.state = {
      meal,
      numberOfPeople
    };
  }

  componentWillReceiveProps(newProps) {
    const { meal, numberOfPeople } = newProps.order;
    this.setState({
      meal,
      numberOfPeople
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });

    setTimeout(() => {
      const { meal, numberOfPeople } = this.state;
      this.props.saveMeal(meal, numberOfPeople);

      const validated = meal !== "" && numberOfPeople !== "" && numberOfPeople > "0";
      this.props.handleValidationChange(validated);
    }, 0);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.flexColumn}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="meal-simple">Please Select a meal</InputLabel>
          <Select
            value={this.state.meal}
            onChange={this.handleChange("meal")}
            inputProps={{
              name: "meal",
              id: "meal-simple"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {meals.map((meal, index) => {
              return (
                <MenuItem key={`MealItem_${index}`} value={meal}>
                  {meal}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="number"
            label="Please Enter Number of people"
            value={this.state.numberOfPeople}
            onChange={this.handleChange("numberOfPeople")}
            type="number"
            className={classes.textField}
            // InputLabelProps={{
            //   shrink: true
            // }}
            margin="normal"
          />
        </FormControl>
      </div>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object.isRequired,
  handleValidationChange: PropTypes.func
};

const mapStateToProps = state => ({
  order: state.order
});

const mapDispatchToProps = {
  saveMeal: OrderActions.saveMeal
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Step1)
);
