const initialState = {
  currentComponent: 1,
};
function AdminReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case 1:
      console.log("1");
      newState.currentComponent = 1;
      return newState;
    case 2:
      newState.currentComponent = 2;
      return newState;
    case 3:
      newState.currentComponent = 3;
      return newState;
    case 4:
      newState.currentComponent = 4;
      return newState;
    // case 5:
    //   newState.currentComponent = 5;
    //   return newState;
    default:
      return newState;
  }
}

export default AdminReducer;
