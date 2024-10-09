const initialState = {
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // frontend components will dispatch an action object:
    // { type: "USER-AUTH", payload: { userId: userId, } }
    case "USER_AUTH":
      return {
        ...state,
        userId: action.payload,
      };

    // triggered from front end with this dispatch action object:
    // { type: "LOGOUT"}
    case "LOGOUT":
      return {
        ...state,
        userId: null,
      };

    default:
      return state;
  }
};

export default reducer;
