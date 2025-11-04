
import HeroReport from '../../../../Components/Report/HeroReport'
import ReportCard from '../../../../Components/Report/ReportCard'
import ReportMenu from '../../../../Components/Report/ReportMenu'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { testURL } from '@/testURL';
import { getSession, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function Index() {
  const { data: session } = useSession(); 
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 8;
    const router = useRouter();

    const handleEdit = (userId) => {
      router.push(`/user/update/${userId}`);
    };

    const handlePW = (userId) => {
      router.push(`/user/password/${userId}`);
    };

    // const handleDelete = async (id) => {
    //   if (window.confirm("Are you sure you want to delete this user?")) {
    //     try {
    //       await axios.delete(`${testURL}/api/users/${id}`);
    //       setUserData((prevData) => prevData.filter((user) => user.id_user !== id));
    //       alert("User deleted successfully");
    //     } catch (error) {
    //       console.error("Error deleting user:", error);
    //       alert("Failed to delete user");
    //     }
    //   }
    // };

    const handleDelete = async (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`${testURL}/api/users/${id}`);
            setUserData((prevData) => prevData.filter((user) => user.id_user !== id));

            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            );
          } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire(
              'Failed!',
              'An error occurred while deleting the user.',
              'error'
            );
          }
        }
      });
};

    const fetchData = async (query = "")=>{
      try {
        const response = await axios.get(`${testURL}/api/tableusers`,{
          params: {search: query},
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    useEffect(() => {
      fetchData();
    }, [])
    
    const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchData(query);
  };

    if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
    <HeroReport/>
    <ReportMenu/>
    <ReportCard/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Daftar User</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <a href="/user/add" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Add New User
          </button>
        </a>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentItems.map((user, index) => (
                <tr key={user.id_user} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{user.id_user}</td>
                  <td className="py-3 px-6">{user.nama}</td>
                  <td className="py-3 px-6">{user.rank}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button onClick={()=>handleEdit(user.id_user)} className="text-blue-500 hover:scale-110 cursor-pointer">✏️</button>
                       <button onClick={()=>handlePW(user.id_user)} className="text-yellow-500 hover:scale-110 cursor-pointer">🗝️</button>
                      <button onClick={()=>handleDelete(user.id_user)} className="text-red-500 hover:scale-110 cursor-pointer">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const allowedRanks = ['Training', 'Expert', 'Manager'];
  const session = await getSession(ctx);
  if (!session || allowedRanks.includes(session.user.rank) ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...session,
    },
  };
}