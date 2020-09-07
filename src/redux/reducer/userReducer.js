const initialState = {
  isLogin: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 1:
      return state;
    default:
      return state;
  }
};

export default UserReducer;
