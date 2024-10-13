import React, { useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/usercontext";

function SideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [conformBox, setConformBox] = useState(false);

  return (
    <div className=" w-1/5 h-screen border-r-4 border-zinc-300 flex flex-col items-center py-10 gap-10 px-5">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 border-4 border-[#733CE4]"></div>{" "}
        <div className="text-3xl text-[#733CE4] font-bold">LOGO</div>
      </div>

      <div className="w-full border-2 mb-10 border-zinc-200"></div>

      <div className="flex flex-col gap-5">
        <div className="text-xl text-zinc-400">
          Recruitement
          <div>
            <NavLink
              to={"/"}

              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-2xl font-semibold w-full h-20":"flex items-center text-black gap-2 text-2xl font-semibold w-full h-20"
              }}
            >
              <TiUserAdd />
              Candidates
            </NavLink >
          </div>
        </div>

        <div className="text-xl text-zinc-400">
          Organization
          <div className="">
            <NavLink
              to={"/employees"}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-2xl font-semibold w-full h-20":"flex items-center text-black gap-2 text-2xl font-semibold w-full h-20"
              }}
            >
              <IoPeopleSharp /> Employees
            </NavLink >
            <NavLink 
              to={"/attendence"}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-2xl font-semibold w-full h-20":"flex items-center text-black gap-2 text-2xl font-semibold w-full h-20"
              }}
            >
              <MdOutlineSignalCellularAlt />
              Attendance
            </NavLink>
            <NavLink 
              to={"/leave"}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-2xl font-semibold w-full h-20":"flex items-center text-black gap-2 text-2xl font-semibold w-full h-20"
              }}
            >
              <BsStars />
              Leaves
            </NavLink>
          </div>
        </div>

        <div className="text-xl text-zinc-400">
          Others
          <div>
            <div
              onClick={() => setConformBox(true)}
              className="flex hover:text-[#733CE4] items-center text-black cursor-pointer gap-2 text-2xl font-semibold w-full h-20"
            >
              <IoIosLogOut />
              Log out
            </div>

            {conformBox && (
              <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-[#6462627a] flex items-center justify-center">
                <div className="w-1/2 h-2/5 bg-white rounded-3xl overflow-hidden">
                  <div className="bg-[#6234C1] h-20 w-full flex items-center justify-center text-4xl font-bold text-white">
                    Log Out
                  </div>
                  <div className="p-20 flex flex-col items-center justify-center gap-20">
                    <div className="text-3xl font-bold text-black">
                      Are you sure you want to log out?
                    </div>
                    <div className="flex gap-10">
                      <button
                        onClick={() => setConformBox(false)}
                        className="bg-[#6234C1] px-20 py-4 cursor-pointer rounded-full text-white font-bold text-2xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="bg-[#6234C1] cursor-pointer px-20 py-4 rounded-full text-white font-bold text-2xl"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
