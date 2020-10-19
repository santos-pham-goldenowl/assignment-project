// - Add item
const AddItem = (properties) => {
  return {
    type: "Add",
    payload: properties,
  };
};

// const Middleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(next);
//   }
//   next(action);
// };

// - Remove item
const RemoveItem = (id) => {
  return {
    type: "Remove",
    payload: id,
  };
};

// - handle PopUp
const HandlePopUp = () => {
  return {
    type: "PopUp",
  };
};

const authUser = (userName, id, avatarUrl, role) => {
  return {
    type: "Login",
    userName,
    id,
    avatarUrl,
    role,
  };
};

const LogOut = () => {
  return {
    type: "LogOut",
  };
};

const updateState = (list) => {
  return {
    type: "UpdateState",
    list: list,
  };
};

const changeQuantity = (status, idProduct) => {
  let changeStatus = "Increase";
  if (status === 1) {
    changeStatus = "Decrease";
  }
  return {
    type: changeStatus,
    idProduct,
  };
};

const changeAction = (params) => {
  return {
    type: params,
  };
};

export {
  AddItem,
  RemoveItem,
  HandlePopUp,
  LogOut,
  authUser,
  updateState,
  changeQuantity,
  changeAction,
};
