import { BrowserRouter } from "react-router-dom";
import routers from "./router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>{routers}</BrowserRouter>
    </div>
  );
}

export default App;
