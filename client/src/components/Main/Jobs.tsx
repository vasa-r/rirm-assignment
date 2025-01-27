import { useEffect, useState } from "react";
import Delete from "../../assets/delete.png";
import { deleteJob, getJobs } from "../../api/job";
import { Link } from "react-router-dom";
import { JobApplication } from "../../lib/types";
import toast from "react-hot-toast";
import ConfirmDelete from "./ConfirmDelete";

const AdminUsers = () => {
  const [jobs, setJobs] = useState<JobApplication[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");

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

  const handleDelete = (id: string) => {
    setId(id);
    setShowDeleteModal(true);
  };

  const deleteJobData = async () => {
    setIsLoading(true);
    try {
      const response = await deleteJob(id!);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        setId("");
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

  return (
    <>
      {showDeleteModal && (
        <ConfirmDelete
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          isLoading={isLoading}
          onPress={() => deleteJobData()}
        />
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold md:text-3xl md:font-bold md:block">
            Posted Jobs
          </h1>
        </div>
        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead className="text-xl">
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Job Title</th>
                <th className="px-4 text-left">Experience</th>
                <th className="px-4 text-left">End Date</th>
                <th className="px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {jobs?.map(({ jobTitle, jobExperience, endDate, _id }, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
