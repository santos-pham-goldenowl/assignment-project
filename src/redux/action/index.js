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

// - Filter items
const Filter = (value) => {
  let valueAction;
  switch (value) {
    case "1":
      valueAction = {
        type: 1,
        payload: value,
      };
      break;
    case "2":
      valueAction = {
        type: 2,
        payload: value,
      };
      break;
    case "3":
      valueAction = {
        type: 3,
        payload: value,
      };
      break;
    case "4":
      valueAction = {
        type: 4,
        payload: value,
      };
      break;
    default:
      return null;
  }
  return valueAction;
};

// - handle PopUp
const HandlePopUp = () => {
  return {
    type: "PopUp",
  };
};

const LoginAct = () => {
  console.log("action");
  return {
    type: "Login",
  };
};

export { AddItem, RemoveItem, Filter, HandlePopUp, LoginAct };
