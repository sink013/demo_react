const initialState = {
  token: "",
  menus: [],
  user_info: {},
};
const userData = (state = initialState, { type, payload }) => {
  switch (type) {
    case "set_userData": {
      return payload;
    }
    default: {
      return state;
    }
  }
};
export default userData;
