import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { TrendingUp, Activity, Users, Thermometer } from 'lucide-react';
import moment from 'moment';

// Mock data generator for local development
const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: moment().subtract(20 - i, 'minutes').format('HH:mm:ss'),
      temperature: 22 + Math.random() * 6,
      humidity: 45 + Math.random() * 15,
      pm25: 10 + Math.random() * 20,
    });
  }
  return data;
};

const mockAttendanceData = [
  { time: '7:00', students: 5, expected: 32, percentage: 15.6 },
  { time: '7:15', students: 12, expected: 32, percentage: 37.5 },
  { time: '7:30', students: 20, expected: 32, percentage: 62.5 },
  { time: '7:45', students: 28, expected: 32, percentage: 87.5 },
  { time: '8:00', students: 32, expected: 32, percentage: 100 },
];

const mockEventData = [
  { name: 'Alert', count: 5 },
  { name: 'Checkin', count: 12 },
  { name: 'Security', count: 3 },
  { name: 'Attendance', count: 35 },
  { name: 'System', count: 8 },
];

export default function Analytics() {
  const [liveData, setLiveData] = useState(generateMockData());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        const newPoint = {
          time: moment().format('HH:mm:ss'),
          temperature: 22 + Math.random() * 6,
          humidity: 45 + Math.random() * 15,
          pm25: 10 + Math.random() * 20,
        };
        const updated = [...prev, newPoint];
        return updated.slice(-20);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const environmentalData = liveData;
  const attendanceData = mockAttendanceData;
  const eventData = mockEventData;
  const activityLogs = mockEventData;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">Real-time insights and trends for Room 301</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Avg Temperature</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {(environmentalData.reduce((acc, d) => acc + d.temperature, 0) / environmentalData.length || 0).toFixed(1)}°C
                  </p>
                </div>
                <Thermometer className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Avg Humidity</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {(environmentalData.reduce((acc, d) => acc + d.humidity, 0) / environmentalData.length || 0).toFixed(0)}%
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Avg Attendance</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">
                    {(attendanceData.reduce((acc, d) => acc + d.percentage, 0) / attendanceData.length || 0).toFixed(0)}%
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600">Total Events</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{activityLogs?.length || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Environmental Trends (Last 20 readings)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={environmentalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="temperature" stackId="1" stroke="#ef4444" fill="#fca5a5" name="Temperature (°C)" />
                <Area type="monotone" dataKey="humidity" stackId="2" stroke="#3b82f6" fill="#93c5fd" name="Humidity (%)" />
                <Area type="monotone" dataKey="pm25" stackId="3" stroke="#10b981" fill="#6ee7b7" name="PM2.5 (μg/m³)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="students" fill="#8b5cf6" name="Present" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expected" fill="#e2e8f0" name="Expected" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Event Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}