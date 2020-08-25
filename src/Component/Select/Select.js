import React from "react";

import "./Select.css";

class Select extends React.Component {
  render() {
    const { optionNameList, inputValue } = this.props;
    return (
      <form action="" className="filter-form">
        <select name="" id="">
          {optionNameList.map((optionName) => (
            <option value="" key={optionName.id}>
              {optionName.name}
            </option>
          ))}
        </select>
        <br></br>
        <input type="submit" value={inputValue}></input>
      </form>
    );
  }
}

export default Select;
