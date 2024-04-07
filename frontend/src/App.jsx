import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./dashboard.jsx";
import LoginPage from "./Loginpage.jsx";
import Dash from "./Dash.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Dash/>
      <LoginPage/>      
    </>
  );
}

export default App;
