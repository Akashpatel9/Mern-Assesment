import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { useCandidates } from "../context/condidatesContext"; // Import the CandidatesContext

function CondidateCard({ item, idx }) {
    
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(item?.status);
  const { deleteCandidate, updateCandidateStatus } = useCandidates();

  const statuses = ["New", "Rejected", "Ongoing", "Selected", "Scheduled"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = (status) => {
    if (status !== selectedStatus) {
      setSelectedStatus(status);
      setIsOpen(false);
    }
  };

  const color = {
    New: "black",
    Rejected: "red",
    Ongoing: "green",
    Selected: "purple",
    Scheduled: "#ffc40c",
  }[item.status];

  async function deleteHandler() {
    try {
      await deleteCandidate(item._id);
      console.log(`Deleted candidate with ID: ${item._id}`);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  }

  
  const updateStatusFunction = async () => {
    try {
      await updateCandidateStatus(item._id, selectedStatus);
      console.log(`Updated status for candidate ID ${item._id} to ${selectedStatus}`);
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  useEffect(() => {
    if (selectedStatus !== item.status) {
      updateStatusFunction();
    }
  }, [selectedStatus]);

  return (
    <div
      style={{ color: color }}
      className="grid my-5 grid-cols-[80px_80px_250px_300px_200px_200px_150px_150px_150px_50px] font-semibold text-lg"
    >
      <div className="flex items-center justify-start p-2">
        <div
          style={{ backgroundColor: color === "black" ? "white" : color }}
          className="h-7 w-7 border-2 border-zinc-200 rounded-lg"
        ></div>
      </div>
      <div className="p-2 text-left">{idx + 1}</div>
      <div className="p-2 text-left">{item?.fullName}</div>
      <div className="p-2 text-left truncate">{item?.email}</div>
      <div className="p-2 text-left">{item?.phoneNumber}</div>
      <div className="p-2 text-left">{item?.department}</div>
      <div className="p-2 text-left cursor-pointer" onClick={toggleDropdown}>
        {selectedStatus}
        <div>
          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute text-black z-10 bg-white border border-gray-300 rounded-md shadow-md mt-1">
              {statuses.map((status) => (
                <div
                  key={status}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-2 text-left">{item?.experience}</div>
      <div className="flex items-center justify-start p-2 text-2xl">
        <a href={`${item?.resume}`}>
          <IoMdDownload />
        </a>
      </div>
      <div className="flex items-center justify-start p-2 text-2xl">
        <MdDeleteOutline
          onClick={deleteHandler}
          className="text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CondidateCard;
