import React from "react";
import { Field, ErrorMessage } from "formik";

function TitleForm(props) {
  return (
    <div className="title">
      <p>{props.titleForm}</p>
    </div>
  );
}

function Input(props) {
  const {
    clNameContainerDiv,
    lbName,
    typeIp,
    nameIp,
    idIp,
    valueIp,
    nameErr,
    componentErr,
    clNameErr,
  } = props;
  return (
    <div className={clNameContainerDiv}>
      <label className="span-form" for="pw">
        {lbName}
      </label>
      <Field type={typeIp} name={nameIp} id={idIp} value={valueIp} />
      <ErrorMessage
        name={nameErr}
        component={componentErr}
        className={clNameErr}
      />
    </div>
  );
}

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

export { TitleForm, Input, Button };
