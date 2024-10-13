import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./usercontext";


const CandidatesContext = createContext(null);

export const useCandidates = () => {
  return useContext(CandidatesContext);
};

export const CandidatesProvider = ({ children }) => {
  const { auth, logout } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Set default axios headers with the token if available
  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
    }
  }, [auth]);



  // Fetch candidates on initial render
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/condidate/getCondidate"
        );
        setCandidates(res.data.data);
      } catch (error) {
        
        if(error.status==401){
            logout();
        }
        
        setError("Error fetching candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);



  // Add candidate
  const addCandidate = async (formData) => {
    console.log(formData);

    try {
        const res = await axios.post(
          "http://localhost:3000/condidate/addCondidate",
          formData
        );
        setCandidates((prev) => [...prev, res.data.data]);
        return res;
      } catch (error) {
        if(error.status==401){
            logout();
        }
        console.error("Error adding candidate:", error);
    
        const errorMessage = error.response?.data?.message || "An unknown error occurred";
        throw new Error(errorMessage); 
      }
      
  };

  
  // Edit candidate
  const editCandidate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/condidate/editCondidate/${id}`,
        updatedData
      );
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id == id ? res.data.data : candidate
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error editing candidate.");
    }
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `http://localhost:3000/condidate/deleteCondidate/${id}`
      );
      console.log(candidates);

      setCandidates((prev) => prev.filter((candidate) => candidate._id != id));
      console.log(candidates);
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error deleting candidate.");
    }
  };

  // Update candidate status
  const updateCandidateStatus = async (id, selectedStatus) => {
    try {
      const res = await axios.put(`http://localhost:3000/condidate/updateCondidate?id=${id}&status=${selectedStatus}`);
      console.log(res);
      
      setCandidates((prev) =>
        prev.map((candidate) =>
         {
            if(candidate._id == id){
                return {...candidate, status:selectedStatus}
            }
            return candidate
         }
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error updating candidate status.");
    }
  };


  // Update candidate attandencestatus
  const updateCandidateAttandence = async (id, attendenceStatus) => {
    try {
      const res = await axios.put(`http://localhost:3000/condidate/updateTask?id=${id}&attendenceStatus=${attendenceStatus}`);
      console.log(res);
      
      setCandidates((prev) =>
        prev.map((candidate) =>
         {
            if(candidate._id == id){
                return {...candidate, attendenceStatus:attendenceStatus}
            }
            return candidate
         }
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error updating candidate attendenceStatus.");
    }
  };




  // Update candidate Task
  const updateCandidateTask = async (id, task) => {
    try {
      const res = await axios.put(`http://localhost:3000/condidate/updateTask?id=${id}&task=${task}`);
      console.log(res);
      
      setCandidates((prev) =>
        prev.map((candidate) =>
         {
            if(candidate._id == id){
                return {...candidate, task:task}
            }
            return candidate
         }
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error updating candidate task.");
    }
  };



  return (
    <CandidatesContext.Provider
      value={{
        candidates,
        loading,
        error,
        addCandidate,
        editCandidate,
        deleteCandidate,
        updateCandidateStatus,
        updateCandidateAttandence,
        updateCandidateTask
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};
