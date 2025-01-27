interface Type {
  companyEmail: string;
  otp: string;
}
const validateOtp = (values: Type) => {
  const errors: Partial<Type> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.companyEmail) {
    errors.companyEmail = "Email is required";
  } else if (!emailRegex.test(values.companyEmail)) {
    errors.companyEmail = "Invalid Email";
  }

  if (!values.otp) {
    errors.otp = "OTP is required";
  }

  return errors;
};

export default validateOtp;
