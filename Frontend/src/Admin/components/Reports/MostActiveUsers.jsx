import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MostActiveMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token=localStorage.getItem("token")
        const { data } = await axios.get("http://localhost:5000/api/report/active-members",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setMembers(data.members || []);
      } catch (err) {
        toast.error("Failed to fetch active members");
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">👥 Most Active Members</h2>
      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Borrow Count</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => (
            <tr key={i} className="text-center">
              <td className="p-2 border">{member.name}</td>
              <td className="p-2 border">{member.email}</td>
              <td className="p-2 border font-semibold">{member.borrowCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostActiveMembers;
