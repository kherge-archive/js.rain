import App from "components/pages/App";
import ReactDOM from "react-dom";
import { StrictMode } from "react";

import "styles/global.scss";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
