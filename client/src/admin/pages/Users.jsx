// client/src/admin/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../admin.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ API response:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error('❌ Error fetching users:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <h2 className="page-title">Registered Users</h2>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
          />
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Email</th>
                  <th>Contact No</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>DOB</th>
                  <th>Reg Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.image ? (
                        <img
                          src={`http://localhost:5000${user.image}`}
                          alt="avatar"
                          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                          onError={(e) => { e.target.src = "/profile.png"; }}
                        />
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone || '-'}</td>
                    <td>{user.address || '-'}</td>
                    <td>{user.city || '-'}</td>
                    <td>{user.dob || '-'}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleDelete(user._id)} style={{ background: 'none', border: 'none', color: 'red' }}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr><td colSpan="10">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
