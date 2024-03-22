import { useState } from 'react';
import Overlay from '../general/components/overlay';

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
  const handleCloseModal = () => {
    setShowIssueModal(false);
  };
  return (
    <Overlay closeModal={handleCloseModal}>
      <form className="bg-white px-4 pb-4  w-[85%] lg:w-[40%] h-3/5 rounded-md font-inter fixed">
        <div className="py-4">
          <h4 className="text-lg text-center text-gray-500 font-semibold">New Issue</h4>
          <span
            className="absolute  w-7 p-2 top-3 right-4 rounded-full bg-gray-200 cursor-pointer"
            onClick={handleCloseModal}
          >
            <img className=" invert brightness-0 w-full block" src="/icons/cancel.svg" alt="" />
          </span>
        </div>
        <div>
          <div className="">
            <label htmlFor="name" className="text-sm text-gray-400 mb-1">
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
            <input type="text" name="" id="" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description" className="text-sm text-gray-400 mb-1 block">
              Description
            </label>
            <textarea
              value={issueDetails.description}
              name="description"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="indent-1 h-10 border block w-full mb-5 rounded-md text-gray-500 text-sm"
            />
          </div>
        </div>
        <button className="w-full bg-messageColor  text-white py-2 rounded-md cursor-pointer">
          Create Issue
        </button>
      </form>
    </Overlay>
  );
}
