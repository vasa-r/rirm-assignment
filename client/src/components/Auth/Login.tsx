import Logo from "../../assets/app-logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Loaders/Loader";
import Input from "../Input";
import { loginCompany } from "../../api/auth";
import validateLogin from "../../validation/validateLogin";
import { useApp } from "../../context/AppContext";

interface Initialvalues {
  companyEmail: string;
}

const Login = () => {
  const initialValues: Initialvalues = {
    companyEmail: "",
  };

  const [credentials, setCredentials] = useState<Initialvalues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Initialvalues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginContext } = useApp();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLogin(credentials);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await login();
      } catch (error) {
        console.log(error);
        toast.error("Login failed, please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const login = async () => {
    try {
      const response = await loginCompany(credentials.companyEmail);
      if (response.success || response.status === 202) {
        toast.success(response?.data?.message);
        loginContext(response?.data?.token);
        setCredentials(initialValues);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 overflow-auto">
      <Link
        to={"/"}
        className="absolute top-0 left-0 flex items-center gap-3 p-4"
      >
        <img src={Logo} alt="app-logo" className="size-8 animate-spin" />
        <h1 className="text-xl font-semibold gradient-txt">HireNow</h1>
      </Link>

      <h1 className="relative text-4xl font-semibold gradient-txt">Login</h1>

      <form className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
        <Input
          name="companyEmail"
          label="Email Address"
          value={credentials.companyEmail}
          placeholder="Enter your company email"
          onChange={handleChange}
        />
        <p className="error">
          {formErrors?.companyEmail && formErrors.companyEmail}
        </p>

        <button
          disabled={isLoading}
          className="btn btn-primary cursor-pointer"
          type="submit"
        >
          {isLoading ? <Loader width="24px" height="24px" /> : "Login"}
        </button>
        <p className="text-sm text-center">
          New to HireNow?{" "}
          <Link to="/" className="underline cursor-pointer">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
