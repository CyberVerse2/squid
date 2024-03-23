import { useState } from 'react';
import Overlay from '../general/components/overlay';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function NewIssueModal({ setShowIssueModal }) {
  const [issueDetails, setIssueDetails] = useState({
    name: '',
    repository: '',
    description: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const createIssue = useAction(api.github.createIssue);
  const handleIssueCreated = async (e) => {
    e.preventDefault();

    setIssueDetails({});
    await createIssue({
      title: issueDetails.name,
      body: issueDetails.description,
      repository: issueDetails.repository
    });
    setShowIssueModal();
  };
  return (
    <Overlay closeModal={setShowIssueModal}>
      <form
        className="bg-white px-4 pb-4  w-[85%] lg:w-[40%] h-3/5 rounded-md font-inter fixed"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-4">
          <h4 className="text-lg text-center text-gray-500 font-semibold">New Issue</h4>
          <span
            className="absolute  w-7 p-2 top-3 right-4 rounded-full bg-gray-200 cursor-pointer"
            onClick={setShowIssueModal}
          >
            <img className=" invert brightness-0 w-full block" src="/icons/cancel.svg" alt="" />
          </span>
        </div>
        <div>
          <div className="">
            <label htmlFor="name" className="text-[0.8rem] text-gray-400 mb-1">
              Name
            </label>
            <input
              value={issueDetails.name}
              name="name"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="h-8 focus:outline-none p-1 border block w-full mb-5 rounded-md indent-2 text-sm text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-[0.8rem] text-gray-400 mb-1 block">
              Repository
            </label>
            <input
              type="text"
              name="repository"
              inputMode="text"
              onChange={handleChange}
              value={issueDetails.repository}
              className="indent-1 h-8 border block w-full mb-5 rounded-md focus:outline-none p-1 text-gray-500 text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-[0.8rem] text-gray-400 mb-1 block">
              Description
            </label>
            <textarea
              value={issueDetails.description}
              name="description"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="indent-1 h-18 border block w-full mb-5 rounded-md text-gray-500 text-sm focus:outline-none p-1"
            />
          </div>
        </div>
        <button
          className="w-full text-[0.8] bg-messageColor  text-white py-2 rounded-md cursor-pointer"
          onClick={(e) => handleIssueCreated(e)}
        >
          Create Issue
        </button>
      </form>
    </Overlay>
  );
}
