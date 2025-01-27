interface Type {
  companyEmail: string;
}
const validateLogin = (values: Type) => {
  const errors: Partial<Type> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.companyEmail) {
    errors.companyEmail = "Email is required";
  } else if (!emailRegex.test(values.companyEmail)) {
    errors.companyEmail = "Invalid Email";
  }

  return errors;
};

export default validateLogin;
