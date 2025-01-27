import { Router } from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJobById,
  notifyCandidates,
} from "../controllers/jobController";

const jobRouter = Router();

jobRouter.post("/create", createJob);

jobRouter.patch("/update/:jobId", updateJob);

jobRouter.delete("/delete/:jobId", deleteJob);

jobRouter.get("/", getJobs);

jobRouter.get("/:jobId", getJobById);

jobRouter.post("/notify/:jobId", notifyCandidates);

export default jobRouter;
