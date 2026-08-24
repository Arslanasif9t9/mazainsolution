import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

export default function ApiKeysPanel({ onCountChange }) {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [provider, setProvider] = useState('auto');

  const loadKeys = () => {
    setLoading(true);
    axiosClient
      .get('/admin/api-keys')
      .then((res) => {
        const data = res.data.data || [];
        setKeys(data);
        onCountChange?.(data.length);
      })
      .catch(() => setError('Could not load API keys.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!label.trim() || !keyValue.trim()) {
      setError('Both a label and a key value are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await axiosClient.post('/admin/api-keys', { label, key_value: keyValue, provider });
      setLabel('');
      setKeyValue('');
      setProvider('auto');
      loadKeys();
    } catch (err) {
      setError('Could not add key. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axiosClient.patch(`/admin/api-keys/${id}/toggle`);
      loadKeys();
    } catch {
      setError('Could not update key status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this API key? This cannot be undone.')) return;
    try {
      await axiosClient.delete(`/admin/api-keys/${id}`);
      loadKeys();
    } catch {
      setError('Could not delete key.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">API Keys</h2>
        <p className="text-sm text-gray-500 mt-1">
          Keys used by the Mazain AI Assistant chatbot
        </p>
      </div>

      {/* Add key form */}
      <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Add a new key</h3>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_2fr_auto] gap-3">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (e.g. Groq – primary)"
            className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          >
            <option value="auto">Auto-detect</option>
            <option value="openai">OpenAI</option>
            <option value="groq">Groq</option>
          </select>
          <input
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
            placeholder="Paste API key here"
            type="password"
            className="px-4 py-3 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-purple-700 transition disabled:opacity-50 whitespace-nowrap"
          >
            {submitting ? 'Adding...' : '+ Add Key'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </form>

      {/* Key list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <i className="fas fa-circle-notch fa-spin text-2xl mb-2"></i>
            <p>Loading...</p>
          </div>
        ) : keys.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <i className="fas fa-key text-3xl mb-2"></i>
            <p>No API keys added yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {keys.map((k) => (
              <li key={k.id} className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50/60 transition">
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      k.is_active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={k.is_active ? 'Active' : 'Disabled'}
                  ></div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800 truncate">{k.label}</p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                          k.resolved_provider === 'groq' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {k.resolved_provider}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-400 truncate">{k.key_value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggle(k.id)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                      k.is_active
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {k.is_active ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleDelete(k.id)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}