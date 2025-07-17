import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [userForm, setUserForm] = useState({});
  const [storeForm, setStoreForm] = useState({});

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get('/admin/dashboard', authHeader());
      setSummary(res.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users', authHeader());
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await API.get('/admin/stores', authHeader());
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err.message);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/create-user', userForm, authHeader());
      alert("User added");
      fetchUsers();
    } catch (err) {
      console.error("Failed to add user:", err.message);
    }
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/create-store', storeForm, authHeader());
      alert("Store added");
      fetchStores();
    } catch (err) {
      console.error("Failed to add store:", err.message);
    }
  };

  const handleChange = (e, setFunc, state) => {
    setFunc({ ...state, [e.target.name]: e.target.value });
  };

  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h4>Summary</h4>
        <p>Total Users: {summary.users}</p>
        <p>Total Stores: {summary.stores}</p>
        <p>Total Ratings: {summary.ratings}</p>
      </div>

      <hr />

      <div>
        <h4>Add New User</h4>
        <form onSubmit={handleUserSubmit}>
          <input name="name" placeholder="Name" onChange={(e) => handleChange(e, setUserForm, userForm)} />
          <input name="email" placeholder="Email" onChange={(e) => handleChange(e, setUserForm, userForm)} />
          <input name="address" placeholder="Address" onChange={(e) => handleChange(e, setUserForm, userForm)} />
          <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, setUserForm, userForm)} />
          <select name="role" onChange={(e) => handleChange(e, setUserForm, userForm)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
          <button type="submit">Create User</button>
        </form>
      </div>

      <hr />

      <div>
        <h4>Add New Store</h4>
        <form onSubmit={handleStoreSubmit}>
          <input name="name" placeholder="Store Name" onChange={(e) => handleChange(e, setStoreForm, storeForm)} />
          <input name="email" placeholder="Store Email" onChange={(e) => handleChange(e, setStoreForm, storeForm)} />
          <input name="address" placeholder="Store Address" onChange={(e) => handleChange(e, setStoreForm, storeForm)} />
          <button type="submit">Create Store</button>
        </form>
      </div>

      <hr />

      <div>
        <h4>All Users</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div>
        <h4>All Stores</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
                <td>{parseFloat(s.rating).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;
