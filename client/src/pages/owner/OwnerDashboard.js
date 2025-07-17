import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  // Auth Header for secure requests
  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });

  // Fetch store ratings
  const fetchRatings = async () => {
    try {
      const res = await API.get('/owner/ratings', authHeader());
      setRatings(res.data);
    } catch (err) {
      console.error("Failed to fetch ratings", err);
    }
  };

  // Fetch average store rating
  const fetchAverage = async () => {
    try {
      const res = await API.get('/owner/average-rating', authHeader());
      setAverage(parseFloat(res.data.average_rating).toFixed(2));
    } catch (err) {
      console.error("Failed to fetch average rating", err);
    }
  };

  useEffect(() => {
    fetchRatings();
    fetchAverage();
  }, []);

  // Handle password update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await API.put('/owner/password', { newPassword }, authHeader());
      alert("Password updated");
      setNewPassword('');
    } catch (err) {
      alert("Failed to update password");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Store Owner Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Average Store Rating: {average ?? "N/A"}</h3>
      </div>

      <hr />

      <div>
        <h3>Ratings from Users</h3>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.rating_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div>
        <h3>Update Password</h3>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default OwnerDashboard;
