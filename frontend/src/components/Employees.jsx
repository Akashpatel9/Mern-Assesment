import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import EmployCard from "./EmployCard";
import Model from "./Model";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDown from "./DropDown";
import { useCandidates } from "../context/condidatesContext";

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Employees() {
  const { candidates, loading, error, editCandidate } = useCandidates();

  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFilteredEmployes(
      candidates.filter((e) => {
        return e.status === "Selected" && e.fullName.startsWith(inputValue);
      })
    );
  }, [candidates, inputValue]);

  function fn(val) {
    if (val == "All") {
      setFilteredEmployes(
        candidates.filter((e) => {
          return e.status === "Selected" && e.fullName.startsWith(inputValue);
        })
      );
    } else {
      setFilteredEmployes(
        filteredEmployes?.filter((e) => {
          return (
            (e.status == val || e.department == val) && e.status === "Selected"
          );
        })
      );
    }
  }

  const [showModel, setShowModel] = useState(false);
  const [editableEmployDetail, setEditableEmployDetail] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await editCandidate(editableEmployDetail._id, data);
      toast.success("Employee details updated successfully!");
      reset();
      closeModel();
    } catch (error) {
      toast.error("Error updating employee details.");
      console.log(error);
    }
  };

  function openModel() {
    setShowModel(true);
  }

  function closeModel() {
    setShowModel(false);
  }

  function employDetailsHandler(id, open) {
    if (open) openModel();

    const filteredEmployee = candidates.find((e) => e._id === id);
    if (filteredEmployee) {
      setEditableEmployDetail(filteredEmployee);
    }
  }

  useEffect(() => {
    if (editableEmployDetail) {
      const formattedDetail = {
        ...editableEmployDetail,
        dateOfJoining: formatDateForInput(editableEmployDetail.dateOfJoining),
      };
      reset(formattedDetail);
    }
  }, [editableEmployDetail, reset]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5 w-full">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="my-5 flex items-center justify-between">
        <div className="flex text-xl justify-between w-full">
          <DropDown
            options={candidates.map((e) => {
              return e.department;
            })}
            fn={fn}
          />
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
        </div>
      </div>

      <div className="relative border-2 border-gray-300 rounded-3xl overflow-hidden">
        {showModel && (
          <Model>
            <div className="absolute bg-white z-50 w-full h-full t-0">
              <div className="w-full h-20 bg-[#6C39D6] flex items-center justify-between px-10 text-3xl font-semibold text-white">
                <div></div>
                <div>Edit Candidate</div>
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
                      required
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Full Name"
                      {...register("fullName")}
                      type="text"
                    />
                    <input
                      required
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Email Address"
                      {...register("email")}
                      type="email"
                    />
                    <input
                      required
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Phone Number"
                      {...register("phoneNumber")}
                      type="number"
                      maxLength={10}
                      minLength={10}
                    />
                    <input
                      required
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Department"
                      {...register("department")}
                      type="text"
                    />
                    <select
                      required
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      {...register("position")}
                    >
                      <option value="" disabled selected>
                        Select Position
                      </option>
                      <option value="Intern">Intern</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Team Lead">Team Lead</option>
                    </select>

                    <input
                      required
                      className="h-20 rounded-2xl p-5 outline-none text-2xl border-4 border-[#6C39D6]"
                      placeholder="Date of Joining"
                      {...register("dateOfJoining")}
                      type="date"
                    />
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <input
                      className="bg-zinc-600 text-white w-80 h-16 rounded-full mt-20 font-semibold text-2xl"
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
        <div className="grid grid-cols-[80px_150px_200px_300px_250px_200px_200px_200px_80px] bg-[#6334C4] text-white text-xl font-bold h-20 items-center">
          <div className="p-2 text-left"></div>
          <div className="p-2 text-left">Profile</div>
          <div className="p-2 text-left">Employee Name</div>
          <div className="p-2 text-left">Email Address</div>
          <div className="p-2 text-left">Phone Number</div>
          <div className="p-2 text-left">Position</div>
          <div className="p-2 text-left">Department</div>
          <div className="p-2 text-left">Date of Joining</div>
          <div className="p-2 text-left"></div>
        </div>

        {/* Data Rows */}
        <div className="overflow-auto h-[65vh]">
          {filteredEmployes?.map((item, idx) => {
            return (
              <EmployCard
                employDetailsHendler={employDetailsHandler}
                key={idx}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Employees;
