import Logo from "../../assets/app-logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Loaders/Loader";
import Input from "../Input";
import { registerCompany } from "../../api/auth";
import validateRegister from "../../validation/validateRegister";

interface InitialValues {
  companyName: string;
  companyEmail: string;
}

const SignUp = () => {
  const initialValues: InitialValues = {
    companyName: "",
    companyEmail: "",
  };

  const [credentials, setCredentials] = useState<InitialValues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<InitialValues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateRegister(credentials);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        // await register();
        await register();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const register = async () => {
    try {
      const response = await registerCompany(
        credentials.companyName,
        credentials.companyEmail
      );

      if (response.success || response.status === 201) {
        toast.success(response.data.message);
        setCredentials(initialValues);
        navigate("/verify");
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during Sign Up. Please try again later.");
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

      <h1 className="relative text-4xl font-semibold gradient-txt">Sign Up</h1>

      <form className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
        <Input
          name="companyName"
          label="Company Name"
          value={credentials.companyName}
          placeholder="Enter your company name"
          onChange={handleChange}
        />
        <p className="error">
          {formErrors?.companyName && formErrors.companyName}
        </p>

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
          {isLoading ? <Loader width="24px" height="24px" /> : "Sign Up"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
