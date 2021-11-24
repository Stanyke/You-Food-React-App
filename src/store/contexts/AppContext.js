import * as React from "react";
import axios from "axios";
import ACTIONS from "../actions";
// import { useLocation } from "react-router-dom";
const { SET_ALL_QUESTS } = ACTIONS;

const { REACT_APP_SERVER_URL } = process.env;

export const AppContext = React.createContext();

function useApp() {
  const context = React.useContext(AppContext);
  // const location = useLocation();

  const [appState, dispatch] = context;

  axios.defaults.baseURL = REACT_APP_SERVER_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const getQuestsFromDb = async () => {
    const { data } = await axios.get(`/api/v1/quest`);
    dispatch({
      type: SET_ALL_QUESTS,
      payload: data.data.quests,
    });
  };

  return {
    appState,
    dispatch,
    getQuestsFromDb,
  };
}

export default useApp;
