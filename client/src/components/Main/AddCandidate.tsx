import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import toast from "react-hot-toast";
import Loader from "../Loaders/Loader";
import AddCandidateModal from "../UtilsUI/AddCandidateModal";
import { updateJob } from "../../api/job";

interface AutoCompleteProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId: string;
}

const AddCandidate = ({ open, setOpen, jobId }: AutoCompleteProp) => {
  const [email, setEmail] = useState("");
  const [candidates, setCandidates] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === " " || e.key === "Enter") && email.trim() !== "") {
      e.preventDefault();
      setCandidates((prev) => [...prev, email.trim()]);
      setEmail("");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (candidates.length === 0) {
      return;
    }
    try {
      await addMem();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't add  member. try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const addMem = async () => {
    setIsLoading(true);
    try {
      const response = await updateJob(jobId!, candidates);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        setCandidates([]);
        setEmail("");
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't add members. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during adding members. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AddCandidateModal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full gap-4 mt-10">
        <h1>Add candidates</h1>
        <input
          type="email"
          placeholder="Add candidate email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 p-2 rounded-md mb-2 w-full"
        />
        {candidates.length !== 0 && (
          <div
            className={`w-full rounded-md p-2 flex gap-1 max-h-[344px] ${"bg-main-bg border border-[#1E201E]"} flex-wrap`}
          >
            {candidates?.map((candidate, index) => (
              <p
                key={index}
                className="w-fit !text-black px-2 rounded-xl bg-green-400"
              >
                {candidate}
              </p>
            ))}
          </div>
        )}

        <button className="bg-green-400 btn" onClick={handleSubmit}>
          {isLoading ? <Loader width="24px" height="24px" /> : "Add members"}
        </button>
      </div>
    </AddCandidateModal>
  );
};

export default AddCandidate;
