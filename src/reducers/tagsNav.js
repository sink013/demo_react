const initialState = [];

const tagsNav = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'clear_tags': return initialState
    case "del_tag": {
      let newTags = [...state];
      newTags.splice(payload, 1);
      return newTags;
    }
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
