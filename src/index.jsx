import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./hooks/useGlobalContext.jsx";

import { Home } from "./pages/Home/index.jsx";
import { Mansory } from "./proves/mansory/app.jsx";
import { NotFound } from "./pages/_404.jsx";

import "./style.css";

export function App() {
  return (
    <GlobalProvider>
      <LocationProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/prove" component={Mansory} />
          <Route default component={NotFound} />
        </Router>
        <Toaster />
      </LocationProvider>
    </GlobalProvider>
  );
}

render(<App />, document.getElementById("app"));
