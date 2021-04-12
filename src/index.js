import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import "./main.css";
import "react-notifications/lib/notifications.css";
import "cleave.js/dist/addons/cleave-phone.in.js";
import { NotificationContainer } from "react-notifications";

const store = createStore(reducers, applyMiddleware(thunk));
// const store = createStore(
//   reducers,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// const store = createStore(reducers,applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
    <NotificationContainer />
  </Provider>,
  document.getElementById("root")
);
