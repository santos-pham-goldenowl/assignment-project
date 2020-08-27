import React from "react";

import "./style.css";

class Select extends React.Component {
  render() {
    const { optionNameList, inputValue, handleOnChange } = this.props;
    return (
      <form
        action=""
        className="filter-form"
        onChange={(e) => handleOnChange(e)}
      >
        <select name="" id="">
          {optionNameList.map((optionName) => (
            <option value={optionName.name} key={optionName.id}>
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
