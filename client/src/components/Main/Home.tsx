import StatContainer from "./StatContainer";
import Search from "../../assets/search.png";
import Delete from "../../assets/delete.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateJob from "./CreateJob";
import { deleteJob, getJobs } from "../../api/job";
import { JobApplication } from "../../lib/types";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";

const Home = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [jobs, setJobs] = useState<JobApplication[] | []>([]);
  const [mutableId, setMutableId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!showCreateModal) getAllJobs();
  }, [showCreateModal]);

  useEffect(() => {
    if (!showDeleteModal) getAllJobs();
  }, [showDeleteModal]);

  const getAllJobs = async () => {
    try {
      const items = await getJobs();
      const { data } = items.data;
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJobData = async () => {
    setIsLoading(true);
    try {
      const response = await deleteJob(mutableId!);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        setMutableId("");
        setShowDeleteModal(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't delete Board data. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during deleting board. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setMutableId(id);
    setShowDeleteModal(true);
  };

  const activeJobs = jobs?.filter(
    (job) => new Date(job.endDate) > new Date(new Date().toISOString())
  );

  const filteredJobs = jobs?.filter((job) =>
    Object.values(job).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {showCreateModal && (
        <CreateJob setOpen={setShowCreateModal} open={showCreateModal} />
      )}
      {showDeleteModal && (
        <ConfirmDelete
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          isLoading={isLoading}
          onPress={() => deleteJobData()}
        />
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold md:text-3xl md:font-bold">
            Seamless Hiring, Smarter Results
          </h1>
        </div>
        <StatContainer
          first={jobs?.length || 0}
          second={activeJobs.length || 0}
        />
        <div className="flex items-center gap-3 px-4 py-4 rounded-md md:px-8 shadow-card">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Post Job
          </button>
          <div className="flex items-center flex-1 border-b-2 border-stone-800">
            <input
              type="text"
              placeholder="Search for jobs created"
              className="w-full text-lg border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="cursor-pointer w-11">
              <img src={Search} alt="search" className="size-7 md:size-8" />
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Job Title</th>
                <th className="px-4 text-left">Experience</th>
                <th className="px-4 text-left">End Date</th>
                <th className="px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs?.map(
                ({ jobTitle, jobExperience, endDate, _id }, index) => (
                  <tr key={_id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{jobTitle}</td>
                    <td className="px-4 py-2">{jobExperience}</td>
                    <td className="px-4 py-2">{endDate}</td>
                    <td
                      className="px-4 py-2"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={Delete}
                        alt="Delete invoice"
                        onClick={() => handleDelete(_id)}
                        className="size-5 cursor-pointer"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/main/jobs/${_id}`}
                        className="underline hover:text-lightPur underline-offset-2"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
