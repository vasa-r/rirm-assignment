/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loaders/Loader";
import { getJob, notifyCandidates } from "../../api/job";
import { JobApplication } from "../../lib/types";
import AddCandidate from "./AddCandidate";
import toast from "react-hot-toast";

const Job = () => {
  const [jobDetails, setJobDetails] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCandidates, setShowAddCandidates] = useState(false);

  const { jobId } = useParams();

  useEffect(() => {
    if (!showAddCandidates) {
      getJobDetail();
    }
  }, [showAddCandidates]);

  const getJobDetail = async () => {
    try {
      const items = await getJob(jobId!);
      const { data } = items.data;
      setJobDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const notify = async () => {
    setIsLoading(true);
    try {
      const response = await notifyCandidates(jobId!);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't able to notify. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during notifying. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotification = async () => {
    await notify();
  };

  if (!jobDetails) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader height="30px" width="30px" />
      </div>
    );
  }

  const {
    jobTitle,
    jobDescription,
    jobExperience,
    endDate,
    createdBy,
    appliedCandidates,
  } = jobDetails;

  return (
    <>
      {showAddCandidates && (
        <AddCandidate
          open={showAddCandidates}
          setOpen={setShowAddCandidates}
          jobId={jobId!}
        />
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:gap-6 w-full">
        <div className="flex items-center w-full gap-96">
          <h1 className="text-3xl font-semibold mb-4">{jobTitle}</h1>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="!text-white bg-green-400 btn relative left-1/2 -translate-x-1/2 cursor-pointer"
              onClick={handleNotification}
            >
              {isLoading ? (
                <Loader height="24px" width="24px" />
              ) : (
                "Notify Applicants"
              )}
            </button>
            <button
              type="submit"
              className="!text-white bg-green-400 btn relative left-1/2 -translate-x-1/2 cursor-pointer"
              onClick={() => setShowAddCandidates(true)}
            >
              Add Candidates
            </button>
          </div>
        </div>

        <p className="text-lg mb-2">
          <strong>Description:</strong> {jobDescription}
        </p>
        <p className="text-lg mb-2">
          <strong>Experience Level:</strong> {jobExperience}
        </p>
        <p className="text-lg mb-2">
          <strong>End Date:</strong> {endDate}
        </p>
        <p className="text-lg  mb-4">
          <strong>Created By:</strong> {createdBy}
        </p>

        <div>
          <div className="flex items-center">
            <strong className="text-lg">Applied Candidates:</strong>
          </div>

          {appliedCandidates.length > 0 ? (
            <ul className="list-disc pl-6 mt-2">
              {appliedCandidates.map((candidate, index) => (
                <li key={index} className="text-md">
                  {candidate}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-white">No candidates applied yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Job;
