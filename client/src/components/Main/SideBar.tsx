import { Link } from "react-router-dom";
import Home from "../../assets/home.svg";
import Jobs from "../../assets/jobs.png";
import Setting from "../../assets/settings.png";
import Logout from "../../assets/logout.png";
import { useApp } from "../../context/AppContext";

const Sidebar = () => {
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const { logoutContext } = useApp();

  return (
    <div
      className={`hidden border-r-[1px] md:py-6 md:pl-4 h-full  md:flex flex-col justify-between
        isDarkMode  shadow-btm-shd  border-border`}
    >
      <div className="flex flex-col gap-4">
        <Link
          to={"/main/"}
          className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
            isActive("/main/") ? "bg-btnClr text-white" : ""
          }`}
        >
          <img src={Home} alt={"Home"} className="size-5" />
          <p className="text-base font-medium">Home</p>
        </Link>
        <Link
          to={"/main/jobs"}
          className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
            isActive("/main/jobs") ? "bg-btnClr text-white" : ""
          }`}
        >
          <img src={Jobs} alt={"jobs"} className="size-5" />
          <p className="text-base font-medium">Jobs</p>
        </Link>
      </div>
      <div>
        <hr className="w-full pb-4 border-t-2 border-border" />
        <div className="flex flex-col gap-4">
          <Link
            to={"/main/settings"}
            className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
              isActive("/main/settings") ? "bg-btnClr text-white" : ""
            }`}
          >
            <img src={Setting} alt={"setting"} className="size-5" />
            <p className="text-base font-medium">Settings</p>
          </Link>

          <div
            onClick={() => logoutContext()}
            className="flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]"
          >
            <img src={Logout} alt={"Logout"} className="size-5" />
            <p className="text-base font-medium">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
