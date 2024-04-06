import { useState } from "react";
import "./App.css";
import Dash from "./Dash.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Dash />
    </>
  );
}

export default App;
