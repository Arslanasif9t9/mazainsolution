import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import ApiKeysPanel from './ApiKeyPanel';

const NAV_ITEMS = [
  { key: 'contacts', label: 'Contact Requests', icon: 'fa-envelope' },
  { key: 'enrollments', label: 'Enrollments', icon: 'fa-graduation-cap' },
  { key: 'api-keys', label: 'API Keys', icon: 'fa-key' },
];
export default function AdminDashboard() {
  const [tab, setTab] = useState('contacts'); // 'contacts' | 'enrollments'
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const endpoint = tab === 'contacts' ? '/admin/contacts' : '/admin/enrollments';

    setLoading(true);
    setError('');
    axiosClient
      .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const data = res.data.data || [];
        // newest first, per the scope doc
        const sorted = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRows(sorted);
      })
      .catch(() => {
        setRows([]);
        setError('Could not load data.');
      })
      .finally(() => setLoading(false));
  }, [tab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTab('contacts')}
            className={`px-4 py-2 font-medium ${tab === 'contacts' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-500'}`}
          >
            Contact Requests
          </button>
          <button
            onClick={() => setTab('enrollments')}
            className={`px-4 py-2 font-medium ${tab === 'enrollments' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-500'}`}
          >
            Enrollments
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          {loading ? (
            <p className="p-6 text-gray-500">Loading...</p>
          ) : error ? (
            <p className="p-6 text-red-600">{error}</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-gray-500">No records yet.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id ?? i} className="border-t border-gray-100">
                    {columns.map((col) => (
                      <td key={col} className="p-3 text-sm text-gray-600 whitespace-nowrap">{String(row[col])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <ApiKeysPanel/>
      </div>
    </div>
  );
}
