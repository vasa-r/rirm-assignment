import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Modal from "../UtilsUI/Modal";
import Input from "../Input";
import Loader from "../Loaders/Loader";

import toast from "react-hot-toast";

import validateNewJob, { JobType } from "../../validation/validateNewJob";
import { addJob } from "../../api/job";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId?: string;
}

const CreateJob = ({ open, setOpen, jobId }: Prop) => {
  const initialValues = {
    jobTitle: "",
    jobDescription: "",
    jobExperience: "BEGINNER",
    endDate: "",
  };
  const [jobDetails, setJobDetails] = useState<JobType>(initialValues);
  const [jobErrors, setJobErrors] = useState<Partial<JobType>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateNewJob(jobDetails);
    setJobErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await newJob();
      } catch (error) {
        console.log(error);
        toast.error("Couldn't create job, please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please give valid info");
    }
  };

  const newJob = async () => {
    try {
      const response = await addJob(
        jobDetails.jobTitle,
        jobDetails.jobDescription,
        jobDetails.jobExperience,
        jobDetails.endDate
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setJobDetails(initialValues);
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't create job. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during creating job. Please try again later."
      );
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">
          {jobId ? "Update Job" : "Add New Job"}
        </h1>
        <div>
          <Input
            name="jobTitle"
            label="Job Title"
            type="text"
            placeholder="Enter job title"
            value={jobDetails.jobTitle!}
            onChange={handleChange}
          />
          {!jobDetails.jobTitle && (
            <p className="relative xs-error">{jobErrors.jobTitle}</p>
          )}
        </div>

        <div>
          <Input
            name="jobDescription"
            label="Job Description"
            type="text"
            placeholder="Enter job description"
            value={jobDetails.jobDescription!}
            onChange={handleChange}
          />
          {!jobDetails.jobDescription && (
            <p className="relative xs-error">{jobErrors.jobDescription}</p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="experience">What's the expecting experience?</label>
          <select
            id="priority"
            value={jobDetails.jobExperience}
            onChange={handleChange}
            name="priority"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="EXPERT">Expert</option>
          </select>

          {!jobDetails.jobExperience && (
            <p className="relative xs-error">{jobErrors.jobExperience}</p>
          )}
        </div>

        <div>
          <Input
            name="endDate"
            label="End Date"
            type="date"
            placeholder="Pick end date"
            value={jobDetails.endDate!}
            onChange={handleChange}
          />
          {!jobDetails.endDate && (
            <p className="relative xs-error">{jobErrors.endDate}</p>
          )}
        </div>

        <button
          type="submit"
          className="!text-white bg-green-400 btn relative left-1/2 -translate-x-1/2"
        >
          {isLoading ? (
            <Loader height="24px" width="24px" />
          ) : jobId ? (
            "Update Job"
          ) : (
            "Post Job"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default CreateJob;
