import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import Main from "./main";

class App extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
