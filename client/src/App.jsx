import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Wave from "./components/Wave";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import PrivateRoutes from "./util/PrivateRoutes";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { login, logout } from "./store/auth-slice";

let logoutTimer;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        dispatch(logout());
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        login({
          userId: storedData.userId,
          token: storedData.token,
          expirationDate: new Date(storedData.expiration),
        })
      );
    }
  }, [login]);

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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Wave />
    </div>
  );
}

export default App;
