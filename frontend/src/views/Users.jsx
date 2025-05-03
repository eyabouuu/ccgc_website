import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubAdminManagement = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    email: '',
    password: '',
    pseudo: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch sub-admins from the backend
  const fetchSubAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/auth/sub-admins', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubAdmins(response.data);
      toast.success('Sub-admins fetched successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch sub-admins');
    }
  };

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  const handleOpenModal = (subAdmin = null) => {
    if (subAdmin) {
      setFormData({
        _id: subAdmin._id,
        email: subAdmin.email,
        password: '', // Keep password empty for editing
        pseudo: subAdmin.pseudo,
      });
      setIsEditing(true);
    } else {
      setFormData({ _id: null, email: '', password: '', pseudo: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ _id: null, email: '', password: '', pseudo: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (isEditing) {
        // Update sub-admin
        await axios.put(process.env.REACT_APP_BACKEND_URL +`/auth/sub-admins/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Sub-admin updated successfully');
      } else {
        // Create new sub-admin
        await axios.post(process.env.REACT_APP_BACKEND_URL +'/auth/sub-admins', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Sub-admin created successfully');
      }
      fetchSubAdmins();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save sub-admin');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(process.env.REACT_APP_BACKEND_URL +`/auth/sub-admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Sub-admin deleted successfully');
      fetchSubAdmins();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete sub-admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">Sub-Admin Management</h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add Sub-Admin
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-green-700">
                <th className="p-3 text-left text-gray-100 font-semibold">Email</th>
                <th className="p-3 text-left text-gray-100 font-semibold">Pseudo</th>
                <th className="p-3 text-left text-gray-100 font-semibold">Role</th>
                <th className="p-3 text-left text-gray-100 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subAdmins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-400">
                    No sub-admins found.
                  </td>
                </tr>
              ) : (
                subAdmins.map((admin) => (
                  <tr key={admin._id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="p-3 text-gray-200">{admin.email}</td>
                    <td className="p-3 text-gray-200">{admin.pseudo || '-'}</td>
                    <td className="p-3 text-gray-200">{admin.role}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleOpenModal(admin)}
                        className="text-green-400 hover:text-green-500 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-semibold text-green-400 mb-4">
                {isEditing ? 'Edit Sub-Admin' : 'Add Sub-Admin'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1" htmlFor="password">
                    Password {isEditing && <span className="text-gray-400">(Leave blank to keep unchanged)</span>}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1" htmlFor="pseudo">
                    Pseudo
                  </label>
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-600 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                  >
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubAdminManagement;