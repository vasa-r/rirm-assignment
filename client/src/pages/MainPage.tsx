import AppBar from "../components/Main/AppBar";
import Sidebar from "../components/Main/SideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/Main/Home";
import Jobs from "../components/Main/Jobs";
import Job from "../components/Main/Job";
import Settings from "../components/Main/Settings";

const MainPage = () => {
  return (
    <div className="h-screen w-screen">
      <AppBar />
      <div className="flex w-full h-btm-height">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId" element={<Job />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
