import React, { useState } from "react";

function DropDown({ options, fn }) {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  return (
    <select
      className="ml-5 px-5 py-2 border-2 border-[#6C39D6] rounded-full"
      value={selectedDepartment}
      onChange={(e) => {
          setSelectedDepartment(e.target.value)
          fn(e.target.value)
    }}
    >
      <option value="All">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
