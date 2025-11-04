import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useRouter } from "next/router";
import { testURL } from '@/testURL';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';

export default function UpdateData() {
   const { data: session } = useSession();
   const router = useRouter();
   const { id } = router.query;
   const [formData, setFormData] = useState({
   nama : "",
   rank : "",
   });
      
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

      useEffect(() => {
        if (id) {
          axios.get(`${testURL}/api/users/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error("Error fetching user data:", error));
        }
      }, [id]);

      const [file, setFile] = useState(null);
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("nama",formData.nama);
        formDataObj.append("rank",formData.rank);
        if (file) {
          formDataObj.append("foto",file)
        }
        try {
          const response = await axios.put(`${testURL}/api/users/updatedata/${id}`, formDataObj, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User updated successfully",
            }).then(() => {
              router.push("/report/user");
            });
          }
        } catch (error) {
          console.error("Error updating user:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update user",
          });
        }
      };
  return (
   <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/logo/gambar.png')" }}
    >
      <div className="h-screen flex justify-center items-center mt-5">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Add user</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="email">
                Full Name
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name = "nama"
                type="text"
                value={formData.nama}
                onChange={handleChange}
              />
            </div>
              <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="rank">
                Rank
              </label>
              <select
                id="rank"
                value={formData.rank}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                name ="rank"
              >
                <option value="">Pilih Rank</option>
                <option value="Owner">Owner</option>
                <option value="Co-Owner">Co-Owner</option>
                <option value="Head">Head</option>
                <option value="Manager">Manager</option>
                <option value="Expert">Expert</option>
                <option value="Training">Training</option>
              </select>
            </div>
            <div className="sm:col-span-2">
            {formData.foto && (
              <img
                src={`${testURL}/assets/images/user/${formData.foto}`}
                alt="Brand"
                className="w-100 h-100 object-contain"
              />
            )}
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="user_avatar">
              Upload foto
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="user_avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const allowedRanks = ['Training', 'Expert', 'Manager', 'Head'];
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