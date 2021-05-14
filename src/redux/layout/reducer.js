import { SET_SIDER_MENU } from "./constants";

const initState = {
  siderMenuKey: "",
};

const LayoutReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SIDER_MENU:
      return {
        ...state,
        siderMenuKey: action.payload,
      };
    default:
      return state;
  }
};

export default LayoutReducer;
