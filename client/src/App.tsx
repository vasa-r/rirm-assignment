import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import MainPage from "./pages/MainPage";
import { useApp } from "./context/AppContext";

const App = () => {
  const { token } = useApp();
  return (
    <div className="h-screen w-screen">
      <Toaster />
      <Routes>
        <Route path="/*" element={token ? <MainPage /> : <AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/main/*" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
