const initialState = {
  userId: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // frontend components will dispatch an action object:
    // { type: "USER-AUTH", payload: { userId: userId, } }
    case "USER_AUTH":
      return {
        ...state,
        userId: action.payload,
        loading: false,
      };

    // triggered from front end with this dispatch action object:
    // { type: "LOGOUT"}
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        loading: false,
      };

    case "LOADING":
      return {
        ...state,
        userId: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
