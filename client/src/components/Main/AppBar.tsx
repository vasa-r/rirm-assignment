import { Link } from "react-router-dom";
import Logo from "../../assets/app-logo.svg";

const AppBar = () => {
  return (
    <div
      className={`relative flex items-center justify-between w-full px-6 py-4 bg-transparent border-b md:px-10 md:py-4 backdrop-saturate-custom backdrop-blur-custom 
         border-b-border  shadow-btm-shd
       `}
    >
      <div className="flex items-center">
        <Link to="/" className="flex items-center self-start gap-2">
          <img src={Logo} alt="app logo" className="size-8 animate-spin" />{" "}
          <p className="!text-xl !font-semibold !p-0 heading gradient-txt">
            HireNow
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AppBar;
