'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Common VulHub vulnerabilities
const VULHUB_VULNS = [
  'langflow/CVE-2025-3248',
  'activemq/CVE-2023-46604',
  'apache-airflow/CVE-2020-17526',
  'apache-druid/CVE-2021-25646',
  'apache-flink/CVE-2020-17518',
  'apache-solr/CVE-2019-17558',
  'apache-struts2/S2-001',
  'apache-struts2/S2-016',
  'docker/CVE-2019-5736',
  'elasticsearch/CVE-2014-3120',
  'fastjson/1.2.24-rce',
  'jenkins/CVE-2018-1000861',
  'joomla/CVE-2015-8562',
  'mysql/CVE-2012-2122',
  'nginx/CVE-2021-23017',
  'redis/CVE-2022-0543',
  'spring/CVE-2022-22965',
  'tomcat/CVE-2020-1938',
  'weblogic/CVE-2020-14882',
  'wordpress/CVE-2019-8943',
];

const CATEGORIES = ['Web Security', 'Binary Exploitation', 'Network Security', 'Database Security', 'Container Security', 'Other'];

export default function SubmitPage() {
  const router = useRouter();
  const [vulnName, setVulnName] = useState('');
  const [vulnCategory, setVulnCategory] = useState('Web Security');
  const [notes, setNotes] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      alert('Please upload a screenshot');
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append('screenshot', screenshot);
    formData.append('vulnName', vulnName);
    formData.append('vulnCategory', vulnCategory);
    formData.append('notes', notes);

    try {
      await axios.post(`${API_URL}/submissions`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Submission Successful!</h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Submit Exploit</h1>
          <button onClick={() => router.push('/dashboard')} className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Submit VulHub Exploit</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* VulHub Vulnerability Selector */}
            <div>
              <label className="block text-sm font-semibold mb-2">VulHub Vulnerability *</label>
              <select
                value={vulnName}
                onChange={(e) => setVulnName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select vulnerability...</option>
                {VULHUB_VULNS.map(vuln => (
                  <option key={vuln} value={vuln}>{vuln}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Select which VulHub environment you exploited</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                value={vulnCategory}
                onChange={(e) => setVulnCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">Screenshot Proof *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Upload screenshot showing successful exploit</p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold mb-2">Findings & Notes *</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your exploit process, findings, and any issues you encountered..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">Explain how you exploited the vulnerability</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : '🚀 Submit Exploit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

