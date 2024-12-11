import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import EventStore from "./store/EventStore";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        event: new EventStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);