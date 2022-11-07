import { Route, Routes } from "react-router-dom";

import NavBar from "./components/UI/NavBar";
import Wave from "./components/UI/Wave";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Wave />
    </div>
  );
}

export default App;
