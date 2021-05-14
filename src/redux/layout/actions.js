import { SET_SIDER_MENU } from "./constants";

export const setSiderMenu = (key) => {
  const action = {
    type: SET_SIDER_MENU,
    payload: key,
  };

  return action;
};
