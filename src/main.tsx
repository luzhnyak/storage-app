import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
