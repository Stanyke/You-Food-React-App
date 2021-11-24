import ACTIONS from "../actions";
const { SET_ALL_QUESTS } = ACTIONS;

export default function appReducer(state, action) {
  switch (action.type) {
    case SET_ALL_QUESTS:
      let obj = {};
      action.payload.forEach((data) => {
        obj[data._id] = data;
      });
      const updatedQuests = {
        ...obj,
      };
      return { ...state, quests: updatedQuests };
    default:
      return state;
  }
}
