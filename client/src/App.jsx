import { Route, Routes } from "react-router-dom";

import NavBar from "./components/UI/NavBar";
import Wave from "./components/UI/Wave";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Wave />
    </div>
  );
}

export default App;
