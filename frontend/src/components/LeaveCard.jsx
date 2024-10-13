import { useEffect, useState } from "react";
import { useLeaves } from "../context/LeaveContext";
import { IoDocumentTextOutline } from "react-icons/io5";

function LeaveCard({ item }) {
  const [selectedStatus, setSelectedStatus] = useState(item?.status);
  const [isOpen, setIsOpen] = useState(false);
  const { editLeaveStatus } = useLeaves();

  const color = {
    Pending: "black",
    Approved: "green",
    Rejected: "red",
  }[item.status];

  // Status options
  const statusOptions = ["Pending", "Approved", "Rejected"];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  // Update attendance status when selectedStatus changes
  useEffect(() => {
    if (selectedStatus !== item.attendenceStatus) {
      editLeaveStatus(item._id, selectedStatus);
      setIsOpen(false);
    }
  }, [selectedStatus]);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid my-5 grid-cols-[80px_200px_100px_300px_150px_80px] font-semibold text-lg items-center">
      <div className="flex items-center justify-start p-2">
        <div
          style={{ backgroundColor: color === "black" ? "white" : color }}
          className="h-10 w-10 border-2 border-zinc-200 rounded-full"
        ></div>
      </div>
      <div className="p-2 text-left">{item?.fullName}</div>
      <div className="text-sm leading-3 font-bold">
        <div className="p-2 text-left">
          {new Date(item?.leaveStartDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
        {item.leaveStartDate != item.leaveEndDate && (
          <div className="p-2 text-left">
            {new Date(item?.leaveEndDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
        )}
      </div>
      <div className="p-2 text-left truncate">{item?.reason}</div>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ color: color }}
        className="p-2 text-left cursor-pointer"
      >
        {item?.status}
        {isOpen && (
          <div className="absolute bg-white border border-gray-300 rounded shadow-lg z-10">
            {statusOptions.map((status) => (
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
      <a href={`${item?.attachement}`} className="p-2 text-left cursor-pointer"><IoDocumentTextOutline/></a>
    </div>
  );
}

export default LeaveCard;
