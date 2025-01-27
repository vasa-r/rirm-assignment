interface Type {
  companyName: string;
  companyEmail: string;
}
const validateRegister = (values: Type) => {
  const errors: Partial<Type> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.companyName) {
    errors.companyName = "Company  name is required";
  }

  if (!values.companyEmail) {
    errors.companyEmail = "Email is required";
  } else if (!emailRegex.test(values.companyEmail)) {
    errors.companyEmail = "Invalid Email";
  }

  return errors;
};

export default validateRegister;
