import React from "react";
import { Field, ErrorMessage } from "formik";

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

export default Input;
