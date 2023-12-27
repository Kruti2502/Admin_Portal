import React from "react";
import "./App.css";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils.ts/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/users-list" element={<UsersList />} />
        </Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
