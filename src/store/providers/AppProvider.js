import * as React from 'react';
import appReducer from '../reducers/AppReducer.js';
import { AppContext } from '../contexts/AppContext.js';

function AppProvider({children}) {

  const [state, dispatch] = React.useReducer(appReducer, { 
    quests: {},
  });
  
  const value = [state, dispatch];

  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;