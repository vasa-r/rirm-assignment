export interface JobType {
  jobTitle: string;
  jobDescription: string;
  jobExperience: "BEGINNER" | "INTERMEDIATE" | "EXPERT" | string;
  endDate: string;
}

const validateNewJob = (values: JobType) => {
  const errors: Partial<JobType> = {};

  if (!values.jobTitle) {
    errors.jobTitle = "Job title is required";
  }

  if (!values.jobDescription) {
    errors.jobDescription = "Job description is required";
  }

  if (!values.jobExperience) {
    errors.jobExperience = "Job experience level is required";
  } else if (
    !["BEGINNER", "INTERMEDIATE", "EXPERT"].includes(values.jobExperience)
  ) {
    errors.jobExperience = "Invalid job experience level";
  }

  if (!values.endDate) {
    errors.endDate = "End date is required";
  }

  return errors;
};

export default validateNewJob;
