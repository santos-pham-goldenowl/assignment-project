const initialState = {
  isLogin: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      const newState = { ...state };
      newState.isLogin = true;
      return newState;
    default:
      return state;
  }
};

export default UserReducer;
