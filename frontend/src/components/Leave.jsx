import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Model from "./Model";
import DropDown from "./DropDown";
import "react-toastify/dist/ReactToastify.css";
import LeaveCard from "./LeaveCard";
import { useLeaves } from "../context/LeaveContext";

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Leave() {
  const { leaves, addLeave } = useLeaves();
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [filterDataByDate, setFilterDataByDate] = useState([]);
  const [dateInput, setDateInput] = useState(formatDate(new Date()));
  console.log(dateInput);

  useEffect(() => {
    setFilterDataByDate(
      leaves.filter((e) => {
        console.log(formatDate(e.leaveStartDate) == dateInput);

        return formatDate(e.leaveStartDate) == dateInput;
      })
    );
  }, [dateInput, leaves]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const filteredLeaves = leaves?.filter((e) => {
      const matchesName = e.fullName
        .toLowerCase()
        .startsWith(inputValue.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" ||
        e.status === selectedStatus ||
        e.department === selectedStatus;
      return matchesName && matchesStatus;
    });
    setFilterData(filteredLeaves);
  }, [leaves, inputValue, selectedStatus]);

  const fn = (val) => {
    setSelectedStatus(val);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("designation", data.designation); // Added missing field
    formData.append("leaveStartDate", data.leaveStartDate);
    formData.append("leaveEndDate", data.leaveEndDate);
    formData.append("reason", data.reason);
    formData.append("file", data.file[0]);

    console.log(data);

    try {
      const res = await addLeave(formData);
      reset();
      toast.success("Candidate added successfully!");
      closeModel();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const [showModel, setShowModel] = useState(false);

  const openModel = () => setShowModel(true);
  const closeModel = () => setShowModel(false);

  return (
    <div className="p-5 w-full">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="my-5 flex items-center justify-between">
        <div className="flex text-xl gap-5">
          {/* Dropdown for Status Filter */}
          <DropDown options={["Pending", "Approved", "Rejected"]} fn={fn} />
        </div>

        <div className="flex text-xl gap-5">
          <div className="border-2 border-[#6C39D6] flex rounded-full items-center justify-center overflow-hidden px-4 py-2">
            <CiSearch />
            <input
              className="w-full outline-none pl-2"
              type="text"
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
          <button
            onClick={openModel}
            className="px-10 py-2 rounded-full bg-[#6C39D6] font-semibold text-white"
          >
            Add New Leave
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl flex gap-4 justify-between">
        {/* Modal */}
        {showModel && (
          <Model>
            <div className="absolute bg-white z-50 w-full h-full t-0 border-2 border-zinc-300">
              <div className="w-full h-20 bg-[#6C39D6] flex items-center justify-between px-10 text-3xl font-semibold text-white">
                <div></div>
                <div>Add New Leave</div>
                <div
                  onClick={closeModel}
                  className="bg-white cursor-pointer h-7 w-7 rounded-full flex items-center justify-center font-bold text-[#6C39D6] text-xl"
                >
                  x
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 gap-10 p-10 mt-10">
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Full Name"
                      {...register("fullName")}
                      type="text"
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Designation"
                      {...register("designation")}
                      type="text"
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Leave Date"
                      {...register("leaveStartDate")}
                      type="date"
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Leave Date"
                      {...register("leaveEndDate")}
                      type="date"
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Reason"
                      {...register("reason")}
                      type="text"
                    />
                    <div className="relative h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6] flex items-center justify-between">
                      <span className="text-zinc-400">Attachement</span>
                      <label
                        htmlFor="Attachement"
                        className="bg-[#6C39D6] text-white px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Choose File
                      </label>
                      <input
                        id="Attachement"
                        required={true}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...register("file")}
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <input
                      className="bg-zinc-600 cursor-pointer text-white w-80 h-16 rounded-full mt-20 font-semibold text-2xl"
                      type="submit"
                      value={"Save"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Model>
        )}

        <div className=" border-2 w-fit h-full border-gray-300 rounded-3xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[80px_200px_100px_300px_150px_80px] bg-[#6334C4] text-white text-xl font-bold h-20 items-center">
            <div className="p-2 text-center"></div>
            <div className="p-2 text-left">Name</div>
            <div className="p-2 text-left">Date</div>
            <div className="p-2 text-left">Reason</div>
            <div className="p-2 text-left">Status</div>
            <div className="p-2 text-left">Docs</div>
          </div>

          <div className="overflow-auto h-[65vh]">
            {/* Data Row */}
            {filterData?.map((item, idx) => {
              return <LeaveCard key={idx} item={item} idx={idx} />;
            })}
          </div>
        </div>

        <div className="w-1/3 rounded-3xl overflow-hidden border-2 border-zinc-300 mx-auto">
          <div className="bg-[#6334C4] w-full h-20 font-bold flex items-center justify-center text-white text-xl">
            Leave Calander
          </div>
          <div className="p-5 px-10 ">
            <div className="flex justify-between items-center gap-2 py-2">
              <div
                onClick={() => setDateInput(formatDate(new Date()))}
                className="px-14 cursor-pointer font-semibold text-xl py-3 border-4 border-[#6334C4] text-black capitalize rounded-full bg-white"
              >
                Today
              </div>
              <input
                className="px-8 font-semibold text-xl py-3 border-4 border-white text-white capitalize rounded-full bg-[#6334C4]"
                type="date"
                onChange={(e) => {
                  setDateInput(e.target.value);
                }}
                value={dateInput}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4 overflow-auto">
              {filterDataByDate?.map((e) => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="rounded-full h-14 w-14 bg-red-200"></div>
                    <div>
                      <div className="font-semibold text-lg">{e?.fullName}</div>
                      <div className="font-semibold text-lg">
                        {e?.designation}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        {formatDate(e?.leaveStartDate)}
                      </div>
                      <div className="font-semibold text-lg">
                        {formatDate(e?.leaveEndDate)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leave;
