import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";

const ManageUser = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const [updatingUserId, setUpdatingUserId] = useState(null);
  
  const { data: users = [], refetch, isLoading } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const handleMakeAdmin = async (user) => {
    if (user.email === currentUser?.email) {
      toast.error("You cannot change your own role!");
      return;
    }

    if (!window.confirm(`Are you sure you want to make ${user.name} an Admin?`)) {
      return;
    }

    setUpdatingUserId(user._id);
    
    try {
      const res = await axiosSecure.patch(`/users/admin/${user._id}`);
      
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`${user.name} is now an Admin!`);
      } else {
        toast.error('Failed to update role');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleMakeInstructor = async (user) => {
    if (user.email === currentUser?.email) {
      toast.error("You cannot change your own role!");
      return;
    }

    if (!window.confirm(`Are you sure you want to make ${user.name} an Instructor?`)) {
      return;
    }

    setUpdatingUserId(user._id);
    
    try {
      const res = await axiosSecure.patch(`/users/instructor/${user._id}`);
      
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`${user.name} is now an Instructor!`);
      } else {
        toast.error('Failed to update role');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleMakeStudent = async (user) => {
    if (user.email === currentUser?.email) {
      toast.error("You cannot change your own role!");
      return;
    }

    const adminCount = users.filter(u => u.role === 'admin').length;
    if (user.role === 'admin' && adminCount <= 1) {
      toast.error("Cannot remove the last admin!");
      return;
    }

    if (!window.confirm(`Are you sure you want to make ${user.name} a Student?`)) {
      return;
    }

    setUpdatingUserId(user._id);
    
    try {
      const res = await axiosSecure.patch(`/users/student/${user._id}`);
      
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`${user.name} is now a Student!`);
      } else {
        toast.error('Failed to update role');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdatingUserId(null);
    }
  };
  
  

  return (
    
    <div>
      <Helmet>
        <title>RMT MUSIC | Manage Users</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center py-5">
        Manage Users
      </h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-[#F5A207] border-b border-[#F5A207]">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Photo
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Current Role
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4 text-center"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-8 text-gray-500">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((user, index) => {
                          const isUpdating = updatingUserId === user._id;
                          const isCurrentUser = user.email === currentUser?.email;
                          const currentRole = user.role || 'student';
                          
                          return (
                            <tr
                              className="bg-white border-b border-[#F5A207] transition duration-300 ease-in-out hover:bg-gray-100"
                              key={user._id}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <img 
                                  src={user.photo || user.photoURL || 'https://via.placeholder.com/56'} 
                                  className="h-14 w-14 rounded-full object-cover" 
                                  alt={user.name || 'User'} 
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.name || 'N/A'}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs text-[#F5A207] font-semibold">(You)</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  currentRole === 'admin' 
                                    ? 'bg-red-100 text-red-800' 
                                    : currentRole === 'instructor'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                                </span>
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <div className="flex gap-2 justify-center flex-wrap">
                                  {currentRole !== 'admin' && (
                                    <button
                                      onClick={() => handleMakeAdmin(user)}
                                      disabled={isUpdating || isCurrentUser}
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                        isUpdating || isCurrentUser
                                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                          : "bg-red-600 text-white hover:bg-red-700"
                                      }`}
                                    >
                                      {isUpdating ? 'Updating...' : 'Make Admin'}
                                    </button>
                                  )}
                                  {currentRole !== 'instructor' && (
                                    <button
                                      onClick={() => handleMakeInstructor(user)}
                                      disabled={isUpdating || isCurrentUser}
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                        isUpdating || isCurrentUser
                                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                          : "bg-blue-600 text-white hover:bg-blue-700"
                                      }`}
                                    >
                                      {isUpdating ? 'Updating...' : 'Make Instructor'}
                                    </button>
                                  )}
                                  {currentRole !== 'student' && (
                                    <button
                                      onClick={() => handleMakeStudent(user)}
                                      disabled={isUpdating || isCurrentUser || (currentRole === 'admin' && users.filter(u => u.role === 'admin').length <= 1)}
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                        isUpdating || isCurrentUser || (currentRole === 'admin' && users.filter(u => u.role === 'admin').length <= 1)
                                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                          : "bg-gray-600 text-white hover:bg-gray-700"
                                      }`}
                                    >
                                      {isUpdating ? 'Updating...' : 'Make Student'}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />

      
    </div>
  );
};

export default ManageUser;
