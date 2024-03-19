import { useState } from "react";
import Overlay from "../general/components/overlay";

export function NewIssueModal({ setShowIssueModal }) {
  const [issueDetails, setIssueDetails] = useState({
    name: '',
    description: ''
  });
  const [repos, setRepos] = useState(['Repo1', 'Repo32']);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleCloseModal = () => {
    setShowIssueModal(false);
  };
  return (
    <Overlay>
      <form className="bg-white px-4 pb-4  w-[35%] rounded-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 fixed z-20">
        <div className="py-4">
          <h1 className="text-lg text-center text-gray-500 font-semibold">New Issue</h1>
          <span
            className="absolute  w-7 p-2 top-3 right-4 rounded-full bg-gray-400 cursor-pointer"
            onClick={handleCloseModal}
          >
            <img className=" invert brightness-0 w-full block" src="/icons/cancel.svg" alt="" />
          </span>
        </div>
        <div>
          <div className="">
            <label htmlFor="name" className="text-sm text-gray-400 mb-1 block">
              Name
            </label>
            <input
              value={issueDetails.name}
              name="name"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="h-10 border block w-full mb-5 rounded-md indent-2 text-sm text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm text-gray-400 mb-1 block">
              Repository
            </label>
            <select
              name="repo"
              onChange={handleChange}
              className="h-10 border block w-full mb-5 rounded-md text-sm text-gray-600 "
            >
              {repos.map((repo, index) => (
                <option className="indent-1 text-gray-300 text-sm" key={index}>
                  {repo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="text-sm text-gray-400 mb-1 block">
              Description
            </label>
            <input
              value={issueDetails.description}
              name="description"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="indent-1 h-10 border block w-full mb-5 rounded-md text-gray-500 text-sm"
            />
          </div>
        </div>
        <button className="w-full bg-blue-500 font-bold text-white py-2 rounded-md cursor-pointer hover:bg-blue-400">
          Create Issue
        </button>
      </form>
    </Overlay>
  );
}

