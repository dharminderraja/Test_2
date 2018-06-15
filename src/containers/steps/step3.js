import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import styles from "./styles";
import { getAvailableDishes } from "./data";
import { OrderActions } from "../../store";

class Step3 extends Component {
  constructor(props) {
    super(props);

    const { servings, meal, restaurant } = props.order;
    this.dishes = getAvailableDishes(meal, restaurant);

    this.state = {
      servings
    };
  }

  componentWillReceiveProps(newProps) {
    const { servings } = newProps.order;
    this.setState({
      servings
    });

    setTimeout(() => {
      this.handleValidationChange();
    }, 0);
  }

  handleChange = (name, index) => event => {
    const { servings } = this.state;

    servings[index] = {
      ...servings[index],
      [name]: event.target.value
    };

    this.setState(servings);

    setTimeout(() => {
      const { servings } = this.state;
      this.props.saveServings(servings);

      this.handleValidationChange();
    }, 0);
  };

  handleValidationChange = () => {
    const { servings } = this.state;

    let validated = servings.length > 0;
    servings.forEach(serving => {
      validated =
        validated && serving.dish !== "" && serving.numberOfServings !== "" && serving.numberOfServings > "0";
    });
    this.props.handleValidationChange(validated);
  };

  onClickAdd = () => {
    this.props.addServing({ dish: "", numberOfServings: "" });
  };

  onClickDelete = index => () => {
    this.props.removeServingAt(index);
  };

  renderServingItem = (serving, index) => {
    const { classes } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="dish-simple">Please Select a Dish</InputLabel>
          <Select
            value={serving.dish}
            onChange={this.handleChange("dish", index)}
            inputProps={{
              name: "dish",
              id: "dish-simple"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.dishes.map((dish, index) => {
              return (
                <MenuItem key={`DishItem_${index}`} value={dish}>
                  {dish}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="number"
            label="Please enter no. of servings"
            value={serving.numberOfServings}
            onChange={this.handleChange("numberOfServings", index)}
            type="number"
            className={classes.textField}
            margin="normal"
          />
        </FormControl>

        <IconButton
          className={classes.button}
          aria-label="Delete"
          onClick={this.onClickDelete(index)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { servings } = this.state;

    return (
      <div>
        {servings.map((serving, index) => {
          return this.renderServingItem(serving, index);
        })}

        <Button
          mini
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.button}
          onClick={this.onClickAdd}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
  handleValidationChange: PropTypes.func
};

const mapStateToProps = state => ({
  order: state.order
});

const mapDispatchToProps = {
  saveServings: OrderActions.saveServings,
  addServing: OrderActions.addServing,
  removeServingAt: OrderActions.removeServingAt
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Step3)
);
