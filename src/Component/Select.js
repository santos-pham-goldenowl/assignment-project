import React from "react";

import "../Style/Select.css";

class Select extends React.Component {
  render() {
    const { optionNameList, inputValue } = this.props;
    console.log(inputValue);
    return (
      <form action="" className="filter-form">
        <select name="" id="">
          {optionNameList.map((optionName) => (
            <option value="">{optionName}</option>
          ))}
        </select>
        <br></br>
        <input type="submit" value={inputValue}></input>
      </form>
    );
  }
}

export default Select;
