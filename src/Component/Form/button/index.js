import React from "react";

function Button(props) {
  const { disabled } = props;
  return (
    <div className="btn-submit">
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </div>
  );
}

export default Button;
