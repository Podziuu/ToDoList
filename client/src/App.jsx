import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Wave from "./components/Wave";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Main />} />
      </Routes>
      <Wave />
    </div>
  );
}

export default App;
