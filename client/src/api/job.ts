import apiClient from "./axiosConfig";
import { AxiosError } from "axios";

const addJob = async (
  jobTitle: string,
  jobDescription: string,
  jobExperience: string,
  endDate: string
) => {
  try {
    const response = await apiClient.post("/job/create", {
      jobTitle,
      jobDescription,
      jobExperience,
      endDate,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const getJobs = async () => {
  try {
    const response = await apiClient.get("/job");

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const getJob = async (jobId: string) => {
  try {
    const response = await apiClient.get(`/job/${jobId}`);

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const deleteJob = async (jobId: string) => {
  try {
    const response = await apiClient.delete(`/job/delete/${jobId}`);

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const updateJob = async (jobId: string, appliedCandidates: string[]) => {
  try {
    const response = await apiClient.patch(`/job/update/${jobId}`, {
      appliedCandidates: appliedCandidates,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const notifyCandidates = async (jobId: string) => {
  try {
    const response = await apiClient.post(`/job/notify/${jobId}`);

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export { addJob, getJobs, deleteJob, getJob, updateJob, notifyCandidates };
