import React from "react";
import { Field, ErrorMessage } from "formik";

function Input(props) {
  const {
    clNameContainerDiv,
    ipNameLabel,
    typeIp,
    nameIp,
    ipId,
    valueIp,
    nameErr,
    errorComponent,
    errorClName,
  } = props;
  return (
    <div className={clNameContainerDiv}>
      <label className="span-form" htmlFor="pw">
        {ipNameLabel}
      </label>
      <Field type={typeIp} name={nameIp} id={ipId} value={valueIp} />
      <ErrorMessage
        name={nameErr}
        component={errorComponent}
        className={errorClName}
      />
    </div>
  );
}

export default Input;
