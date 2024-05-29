import logo from "./logo.svg";
import "./App.css";
import { StyledEngineProvider } from "@mui/material";
import Landingpage from "./pages/landingpage";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Landingpage />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
