const initialState = {
  isLogin: false,
  userName: "",
};

const UserReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "Login":
      newState.isLogin = true;
      newState.userName = action.userName;
      return newState;
    case "LogOut":
      newState.isLogin = false;
      newState.userName = null;
      return newState;
    default:
      return state;
  }
};

export default UserReducer;
