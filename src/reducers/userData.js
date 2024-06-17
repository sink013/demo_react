const initialState = {};

const userData = (state = initialState, { type, payload }) => {
  switch (type) {
    case "setUserData":
      return payload;

    default:
      return state;
  }
};
export default userData;
