import React from "react";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import { useSession } from './context/auth'


const App = () => {
  const { user } = useSession()
  const routing = useRoutes(routes(user));
  return routing;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
