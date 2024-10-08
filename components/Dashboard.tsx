'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Droplet, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { fetchUserData } from '@/lib/api';
import { UserData } from '@/types';

// Custom wrappers for XAxis and YAxis to set default props
const CustomXAxis = (props) => <XAxis tick={{ fontSize: 12 }} {...props} />;
const CustomYAxis = (props) => <YAxis tick={{ fontSize: 12 }} {...props} />;

function DashboardCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="bg-gradient-to-r from-blue-700 to-blue-500">
      <CardContent className="p-6">
        <div className="flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Failed to load user data</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h1 className="text-2xl font-bold text-white">Welcome back, {userData.name}</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <DashboardCard 
            title="Total Dives" 
            value={userData.totalDives.toString()} 
            icon={<Calendar className="h-8 w-8 text-white" />}
          />
          <DashboardCard 
            title="Total Dive Time" 
            value={`${userData.totalDiveTime} hours`} 
            icon={<Clock className="h-8 w-8 text-white" />}
          />
          <DashboardCard 
            title="Max Depth Reached" 
            value={`${userData.maxDepthReached}m`} 
            icon={<Droplet className="h-8 w-8 text-white" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Chart title="Dives per Month">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userData.diveData}>
                <CustomXAxis 
                  dataKey="month" 
                  scale="point" 
                  padding={{ left: 10, right: 10 }} 
                />
                <CustomYAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="dives" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
          <Chart title="Average Depth Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData.depthData}>
                <CustomXAxis 
                  dataKey="month" 
                  scale="point" 
                  padding={{ left: 10, right: 10 }} 
                />
                <CustomYAxis unit="m" />
                <Tooltip />
                <Line type="monotone" dataKey="depth" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </Chart>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <UpcomingDive dive={userData.upcomingDive} />
          <Certifications certifications={userData.certifications} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Safety Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Always perform a safety check before each dive</li>
              <li>Regularly maintain and inspect your equipment</li>
              <li>Stay within your training and experience limits</li>
              <li>Never dive alone - always use the buddy system</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white" asChild>
            <Link href="/log-dive">Log New Dive</Link>
          </Button>
          <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white" asChild>
            <Link href="/share-logbook">Share Logbook</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Chart({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function UpcomingDive({ dive }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Dive</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{dive.title}</p>
            <p className="text-gray-600">{dive.date} - {dive.time}</p>
            <p className="text-gray-600">Expected depth: {dive.expectedDepth}m</p>
          </div>
          <TrendingUp className="h-12 w-12 text-blue-500" />
        </div>
      </CardContent>
    </Card>
  );
}

function Certifications({ certifications }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{cert.name}</span>
              {cert.status === 'valid' ? (
                <Award className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
            </div>
          ))}
        </div>
        {certifications.some(cert => cert.status === 'expired') && (
          <p className="mt-2 text-sm text-yellow-600">Some certifications have expired. Please renew them.</p>
        )}
      </CardContent>
    </Card>
  );
}