import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Feed from "./components/NPOs/Feed";
import History from "./components/Restaurants/History";
import CreateOrder from "./components/Restaurants/CreateOrder";
import CreatePickup from "./components/Restaurants/CreatePickup";

const App: FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/history" element={<History />} />
          <Route path="/create-order" element={<CreateOrder/>} />
          <Route path="/create-pickup" element={<CreatePickup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
