import React from "react";

class Error extends React.Component {
  render() {
    return <p className="error-message">{this.props.error}</p>;
  }
}

export default Error;
