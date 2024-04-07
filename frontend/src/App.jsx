import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./dashboard.jsx";
import LoginPage from "./Loginpage.jsx";
import Dash from "./Dash.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Dash" element={<Dash/>}></Route>
        </Routes>
      </Router>
           
    </>
  );
}

export default App;
