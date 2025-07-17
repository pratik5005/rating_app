import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  // Authorization header for secure requests
  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });

  useEffect(() => {
    fetchStores();
  }, []);

  // Fetch all stores with ratings
  const fetchStores = async () => {
    try {
      const res = await API.get('/user/stores', authHeader());
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  // Handle user rating submission
  const handleRatingChange = async (storeId, value) => {
    try {
      await API.post('/user/rate', { storeId, ratingValue: value }, authHeader());
      alert('Rating updated!');
      fetchStores(); // Refresh ratings
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating rating');
    }
  };

  // Filter stores based on search input
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search store by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Store</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.store_id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{parseFloat(store.overall_rating || 0).toFixed(2)}</td>
              <td>{store.user_rating || '—'}</td>
              <td>
                <select
                  value={store.user_rating || ''}
                  onChange={(e) => handleRatingChange(store.store_id, parseInt(e.target.value))}
                >
                  <option value="">Rate</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
