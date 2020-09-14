import React from "react";
import { Field, ErrorMessage } from "formik";

function Input(props) {
  const {
    clNameContainerDiv,
    htmlFor,
    ipNameLabel,
    ipType,
    ipName,
    ipId,
    valueIp,
    errName,
    errorComponent,
    errorClName,
  } = props;
  return (
    <div className={clNameContainerDiv}>
      <label className="span-form" htmlFor={htmlFor}>
        {ipNameLabel}
      </label>
      <Field type={ipType} name={ipName} id={ipId} value={valueIp} />
      <ErrorMessage
        name={errName}
        component={errorComponent}
        className={errorClName}
      />
    </div>
  );
}

export default Input;
