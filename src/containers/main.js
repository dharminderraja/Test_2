import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";

class Main extends Component {
  state = {
    activeStep: 0,
    validations: [false, false, false, true]
  };

  getSteps = () => {
    return ["Step1", "Step 2", "Step 3", "Review"];
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Step1 handleValidationChange={this.handleValidationChange(0)} />
        );
      case 1:
        return (
          <Step2 handleValidationChange={this.handleValidationChange(1)} />
        );
      case 2:
        return (
          <Step3 handleValidationChange={this.handleValidationChange(2)} />
        );
      case 3:
        return <Step4 />;
      default:
        return "Unknown step";
    }
  };

  handleValidationChange = step => validated => {
    const { validations } = this.state;
    validations[step] = validated;

    this.setState(validations);
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  render() {
    const steps = this.getSteps();

    const { activeStep, validations } = this.state;
    const validated = validations[activeStep];

    return (
      <div className="App">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          <div className="step-container">
            {this.getStepContent(activeStep)}
          </div>

          <div className="footer-buttons">
            <Button disabled={activeStep === 0} onClick={this.handleBack}>
              Previous
            </Button>
            <Button
              disabled={!validated}
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
