import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Input";
import { toast } from "react-hot-toast";

const Settings = () => {
  const initialValues = {
    userName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  };
  const [credentials, setCredentials] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error("credentilas update - under development");
  };
  return (
    <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
      <div>
        <h1 className="text-xl font-semibold md:text-3xl md:font-bold md:block">
          Settings
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <Input
              name="userName"
              label="Update User Name"
              type="text"
              value={credentials.userName}
              onChange={handleChange}
              placeholder="Enter new user name"
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="email"
              label="Update Email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter new email"
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="oldPassword"
              label="Old password"
              type="password"
              value={credentials.oldPassword}
              onChange={handleChange}
              placeholder="Enter old password"
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              name="newPassword"
              label="New Password"
              type="password"
              value={credentials.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
