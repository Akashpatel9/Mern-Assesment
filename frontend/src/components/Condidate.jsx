import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CondidateCard from "./CondidateCard";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCandidates } from "../context/condidatesContext";
import Model from "./Model";
import DropDown from "./DropDown";

import "react-toastify/dist/ReactToastify.css";

function Condidate() {
  const { candidates, addCandidate } = useCandidates();
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFilterData(
      candidates?.filter((e) => {
        return e.fullName.startsWith(inputValue);
      })
    );
  }, [candidates, inputValue]);

  function fn(val) {
    if (val == "All") {
      setFilterData(
        candidates?.filter((e) => {
          return e.fullName.startsWith(inputValue);
        })
      );
    } else {
      setFilterData(
        filterData?.filter((e) => {
          return e.status == val || e.department == val;
        })
      );
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("department", data.department);
    formData.append("experience", data.experience);

    if (data.resume[0]) {
      formData.append("resume", data.resume[0]);
    }
    try {
      const res = await addCandidate(formData);
      reset();
      toast.success("Candidate added successfully!");
      closeModel();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const [showModel, setShowModel] = useState(false);

  function openModel() {
    setShowModel(true);
  }

  function closeModel() {
    setShowModel(false);
  }

  return (
    <div className="p-5 w-full">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="my-5 flex items-center justify-between">
        <div className="flex text-xl gap-5">
          {/* Dropdown for Status Filter */}
          <DropDown
            options={["New", "Ongoing", "Selected", "Rejected"]}
            fn={fn}
          />

          {/* Dropdown for Department Filter */}
          <DropDown
            options={candidates.map((e) => {
              return e.department;
            })}
            fn={fn}
          />
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
            Add Candidate
          </button>
        </div>
      </div>
      <div className="relative border-2 w-full h-full border-gray-300 rounded-3xl overflow-hidden">
        {/* Modal */}
        {showModel && (
          <Model>
            <div className="absolute bg-white z-50 w-full h-full t-0">
              <div className="w-full h-20 bg-[#6C39D6] flex items-center justify-between px-10 text-3xl font-semibold text-white">
                <div></div>
                <div>Add New Candidate</div>
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
                      placeholder="Email Address"
                      {...register("email")}
                      type="email"
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Phone Number"
                      {...register("phoneNumber")}
                      type="number"
                      maxLength={10}
                      minLength={10}
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Department"
                      {...register("department")}
                      type="text"
                    />
                    <input
                      required={true}
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Experience"
                      {...register("experience")}
                      type="number"
                      max={10}
                      min={0}
                    />
                    <div className="relative h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6] flex items-center justify-between">
                      <span className="text-zinc-400">Upload Resume</span>
                      <label
                        htmlFor="resume"
                        className="bg-[#6C39D6] text-white px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Choose File
                      </label>
                      <input
                        id="resume"
                        required={true}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...register("resume")}
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

        {/* Header Row */}
        <div className="grid grid-cols-[80px_80px_250px_300px_200px_200px_150px_150px_150px_50px] bg-[#6334C4] text-white text-xl font-bold h-20 items-center">
          <div className="p-2 text-center"></div>
          <div className="p-2 text-left">Sr no.</div>
          <div className="p-2 text-left">Candidates Name</div>
          <div className="p-2 text-left">Email Address</div>
          <div className="p-2 text-left">Phone Number</div>
          <div className="p-2 text-left">Position</div>
          <div className="p-2 text-left">Status</div>
          <div className="p-2 text-left">Experience</div>
          <div className="p-2 text-left">Resume</div>
          <div className="p-2 text-center">Delete</div>
        </div>

        <div className="overflow-auto h-[65vh]">
          {/* Data Row */}
          {filterData?.map((item, idx) => {
            return <CondidateCard key={idx} item={item} idx={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Condidate;
