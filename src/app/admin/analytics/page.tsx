'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import type { AnalyticsData } from '@/lib/analytics/types';

type Range = '7d' | '30d' | '90d';

function formatDate(raw: string) {
  if (raw.length !== 8) return raw;
  const y = raw.slice(0, 4);
  const m = raw.slice(4, 6);
  const d = raw.slice(6, 8);
  return new Date(`${y}-${m}-${d}`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

const DEVICE_COLORS = ['#ef4444', '#a1a1aa', '#10b981'];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [range, setRange] = useState<Range>('30d');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`/api/admin/analytics?range=${range}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError('Failed to load analytics.'))
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-zinc-500 text-sm">Website traffic and engagement from Google Analytics.</p>
        </div>
        <div className="flex border border-zinc-800 divide-x divide-zinc-800">
          {(['7d', '30d', '90d'] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                range === r
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && <p className="text-red-400 text-sm">{error}</p>}

      {data && !loading && !error && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Page Views</p>
              <p className="text-3xl font-bold text-white">{data.summary.totalPageViews.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Sessions</p>
              <p className="text-3xl font-bold text-white">{data.summary.totalSessions.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Users</p>
              <p className="text-3xl font-bold text-white">{data.summary.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Avg Duration</p>
              <p className="text-3xl font-bold text-white">{formatDuration(data.summary.avgSessionDuration)}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Bounce Rate</p>
              <p className="text-3xl font-bold text-white">{(data.summary.bounceRate * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Traffic over time */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-6">Traffic Over Time</p>
            {data.daily.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.daily.map((d) => ({ ...d, label: formatDate(d.date) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="label" tick={{ fill: '#71717a', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#71717a', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: 0 }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: 4 }}
                    itemStyle={{ color: '#d4d4d8', fontSize: 13 }}
                  />
                  <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#a1a1aa" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="users" name="Users" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-zinc-500 text-sm">No data available for this period.</p>
            )}
          </div>

          {/* Two-column: Top Pages + Traffic Sources */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">Top Pages</p>
              {data.topPages.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 pb-2">Page</th>
                      <th className="text-right text-xs uppercase tracking-widest font-bold text-zinc-600 pb-2">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((p, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2.5 text-sm text-zinc-300 truncate max-w-0">{p.pagePath}</td>
                        <td className="py-2.5 text-sm text-white text-right font-medium tabular-nums">{p.pageViews.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-zinc-500 text-sm">No data available.</p>
              )}
            </div>

            {/* Traffic Sources */}
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">Traffic Sources</p>
              {data.trafficSources.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data.trafficSources} layout="vertical" margin={{ left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#71717a', fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis
                      dataKey="source"
                      type="category"
                      tick={{ fill: '#d4d4d8', fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: 0 }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      itemStyle={{ color: '#d4d4d8' }}
                    />
                    <Bar dataKey="sessions" name="Sessions" fill="#ef4444" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-zinc-500 text-sm">No data available.</p>
              )}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">Devices</p>
            {data.devices.length > 0 ? (
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.devices}
                      dataKey="sessions"
                      nameKey="deviceCategory"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      strokeWidth={0}
                    >
                      {data.devices.map((_, i) => (
                        <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: 0 }}
                      itemStyle={{ color: '#d4d4d8' }}
                    />
                    <Legend
                      formatter={(value) => <span className="text-zinc-300 text-sm capitalize">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">No data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
