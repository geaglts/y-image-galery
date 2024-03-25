import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./hooks/useGlobalContext.js";

import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";

import "./style.css";

export function App() {
  return (
    <GlobalProvider>
      <LocationProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
        <Toaster />
      </LocationProvider>
    </GlobalProvider>
  );
}

render(<App />, document.getElementById("app"));
