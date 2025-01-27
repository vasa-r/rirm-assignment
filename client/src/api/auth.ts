import apiClient from "./axiosConfig";
import { AxiosError } from "axios";

const registerCompany = async (companyName: string, companyEmail: string) => {
  try {
    const response = await apiClient.post("/company/register", {
      companyName,
      companyEmail,
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

const loginCompany = async (companyEmail: string) => {
  try {
    const response = await apiClient.post("/company/login", {
      companyEmail,
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

const verifyCompany = async (companyEmail: string, otp: string) => {
  try {
    const response = await apiClient.patch("/company/verify", {
      companyEmail,
      otp,
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

export { registerCompany, loginCompany, verifyCompany };
