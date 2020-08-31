import React from "react";

import "./style.css";

class Select extends React.Component {
  render() {
    const { optionNameList, handleOnChange } = this.props;
    return (
      <>
        <select name="" id="" onChange={handleOnChange}>
          {optionNameList.map((optionName) => (
            <option value={optionName.id} key={optionName.id}>
              {optionName.name}
            </option>
          ))}
        </select>
      </>
    );
  }
}

export default Select;
