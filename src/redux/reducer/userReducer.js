const initialState = {
  isLogin: false,
  userId: "",
  userName: "",
  role: "a",
  avatarUrl: "",
};

const UserReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "Login":
      newState.isLogin = true;
      newState.userName = action.userName;
      newState.userId = action.id;
      newState.avatarUrl = action.avatarUrl;
      newState.role = action.role;
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
