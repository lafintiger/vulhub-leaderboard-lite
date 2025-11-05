'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Leaderboard() {
  const router = useRouter();
  const [leaders, setLeaders] = useState([]);
  const [myRank, setMyRank] = useState<any>(null);
  const [myBadges, setMyBadges] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${API_URL}/leaderboard`, { headers })
      .then(res => setLeaders(res.data));
    
    axios.get(`${API_URL}/leaderboard/my-rank`, { headers })
      .then(res => setMyRank(res.data));
    
    axios.get(`${API_URL}/leaderboard/my-badges`, { headers })
      .then(res => setMyBadges(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🏆 Leaderboard</h1>
          <button onClick={() => router.push('/dashboard')} className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* My Rank Card */}
        {myRank && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Stats</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-3xl font-bold">#{myRank.rank}</div>
                <div className="text-blue-100">Rank</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{myRank.points}</div>
                <div className="text-blue-100">Points</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{myRank.submissions}</div>
                <div className="text-blue-100">Exploits</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{myRank.badges}</div>
                <div className="text-blue-100">Badges</div>
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        {myBadges.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">🏅 Your Badges</h3>
            <div className="flex gap-4 flex-wrap">
              {myBadges.map((badge: any) => (
                <div key={badge.id} className={`px-4 py-2 rounded-lg ${
                  badge.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                  badge.tier === 'silver' ? 'bg-gray-200 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {badge.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Rank</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Points</th>
                <th className="px-6 py-4 text-left font-semibold">Exploits</th>
                <th className="px-6 py-4 text-left font-semibold">Badges</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader: any) => (
                <tr key={leader.id} className={`border-t ${leader.rank <= 3 ? 'bg-yellow-50' : ''}`}>
                  <td className="px-6 py-4">
                    <span className="text-2xl">
                      {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : leader.rank === 3 ? '🥉' : `#${leader.rank}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{leader.name}</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">{leader.points}</td>
                  <td className="px-6 py-4">{leader.submissions}</td>
                  <td className="px-6 py-4">{leader.badges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

