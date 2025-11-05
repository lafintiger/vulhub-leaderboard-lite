'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [rank, setRank] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);

    // Fetch rank
    axios.get(`${API_URL}/leaderboard/my-rank`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRank(res.data)).catch(() => {});
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">VulHub Leaderboard</h1>
          <div className="flex gap-4">
            <button onClick={() => router.push('/submit')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Submit Exploit
            </button>
            <button onClick={() => router.push('/leaderboard')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Leaderboard
            </button>
            <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-3xl font-bold text-blue-600">{rank?.points || 0}</div>
              <div className="text-gray-600">Points</div>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <div className="text-3xl font-bold text-green-600">#{rank?.rank || '-'}</div>
              <div className="text-gray-600">Rank</div>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <div className="text-3xl font-bold text-purple-600">{rank?.badges || 0}</div>
              <div className="text-gray-600">Badges</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              onClick={() => router.push('/submit')}
              className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700"
            >
              🎯 Submit New Exploit
            </button>
            
            <button 
              onClick={() => router.push('/leaderboard')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              🏆 View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

