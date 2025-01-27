import { Route, Routes } from "react-router-dom";
import SignUp from "../components/Auth/SignUp";
import Login from "../components/Auth/Login";
import Verify from "../components/Auth/Verify";

const AuthPage = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
