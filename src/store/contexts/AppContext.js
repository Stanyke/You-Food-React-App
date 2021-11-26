import * as React from "react";
import axios from "axios";
import ACTIONS from "../actions";
import testData from "../../assets/tests/data.json";
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

  const emptyQuests = () => {
    dispatch({
      type: SET_ALL_QUESTS,
      payload: {},
    });
  };

  const getQuestsFromDb = async () => {
    emptyQuests();
    const { data } = await axios.get(`/api/v1/quest`);
    dispatch({
      type: SET_ALL_QUESTS,
      payload: data.data.quests,
    });
  };

  const getQuestsFromTestData = async () => {
    emptyQuests();
    const data = await testData;
    dispatch({
      type: SET_ALL_QUESTS,
      payload: data.quests,
    });
  };

  return {
    appState,
    dispatch,
    getQuestsFromDb,
    getQuestsFromTestData,
  };
}

export default useApp;
