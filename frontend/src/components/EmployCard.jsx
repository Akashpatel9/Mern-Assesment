import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCandidates } from "../context/condidatesContext";

function EmployCard({ employDetailsHendler, item }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setCandidates } = useCandidates();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    employDetailsHendler(item._id, true);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/condidate/deleteCondidate/" + item._id
      );
      toast.success("Employee details deleted successfully!");
      setCandidates((prev) => prev.filter((e) => e._id !== item._id));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setIsOpen(false);
  };

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
    <div className="grid my-5 grid-cols-[80px_150px_200px_300px_250px_200px_200px_200px_80px] font-semibold text-lg items-center">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="p-2 text-left">
        <div className="bg-zinc-300 h-7 w-7 rounded-lg"></div>
      </div>
      <div className="flex items-center justify-start p-2">
      <div className="h-12 w-12 rounded-full bg-red-300 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1728411666518-cc54a750bf05?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>
      <div className="p-2 text-left">{item?.fullName}</div>
      <div className="p-2 text-left truncate">{item?.email}</div>
      <div className="p-2 text-left">{item?.phoneNumber}</div>
      <div className="p-2 text-left">{item?.position}</div>
      <div className="p-2 text-left">{item?.department}</div>
      <div className="p-2 text-left">
        {item?.dateOfJoining
          ? new Date(item.dateOfJoining).toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "N/A"}
      </div>

      <div className="flex items-center justify-start p-2 gap-3 text-2xl relative">
        <BsThreeDotsVertical onClick={toggleDropdown} />
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 text-black z-10 bg-white border border-gray-300 rounded-md shadow-md mt-1"
          >
            <div
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </div>
            <div
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployCard;
