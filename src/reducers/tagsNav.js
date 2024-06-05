const initialState = [];

const tagsNav = (state = initialState, { type, payload }) => {
  switch (type) {
    case "add_tag": {
      if (state.some((v) => v.path === payload.path)) {
        return state;
      }
      let newTags = [...state];
      newTags.push(payload);
      console.log(newTags);
      return newTags;
    }
    default:
      return state;
  }
};

export default tagsNav;
