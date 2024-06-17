const initialState = [];

const tagsNav = (state = initialState, { type, payload }) => {
  switch (type) {
    case "delete": {
      let newTags = [...state];
      newTags.splice(payload, 1);
      return newTags;
    }
    case "addTag": {
      if (state.some((v) => v.path === payload.path)) {
        return state;
      }
      let newTags = [...state];
      newTags.push(payload);
      return newTags;
    }
    default:
      return state;
  }
};
export default tagsNav;
