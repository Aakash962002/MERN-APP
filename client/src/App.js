import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _ from "lodash";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token)
  console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ posts", token);
  useEffect(() => {
    if (!_.isEmpty(token)) {
      setIsLogin(true);
      navigate("/");
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <Routes>
      {isLogin ? (
        <Route path="/" exact element={<Main />} />
      ) : (
        <>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
