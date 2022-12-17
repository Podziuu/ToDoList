import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Wave from "./components/Wave";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import PrivateRoutes from "./util/PrivateRoutes";
import NotFound from "./pages/NotFound";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route element={<PrivateRoutes loggedIn />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/tasks" element={<Main />} />
        </Route>
        <Route>
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
      <Wave />
    </div>
  );
}

export default App;
