import React, { useState, useEffect } from 'react';
import CitizenDashboard from './components/CitizenDashboard';
import ResponderDashboard from './components/ResponderDashboard';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import LiveMap from './components/LiveMap';

export default function App() {
  const [currentRole, setCurrentRole] = useState('split'); // 'citizen' | 'responder' | 'admin' | 'split'
  const [showProfile, setShowProfile] = useState(false);
  const [activeIncident, setActiveIncident] = useState({
    id: 'INC-7041',
    type: 'Road Accident',
    category: 'Person unconscious after bike collision',
    severity: 'Critical',
    severityScore: 96,
    status: 'Assigned',
    lat: 17.4325,
    lng: 78.4071,
    address: 'Jubilee Hills Road 36, Hyderabad',
    assignedUnit: 'AMB-104',
    eta: '03m 40s',
    elapsedSeconds: 52
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-red-200">
            🚨
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              ResQNet <span className="text-blue-700">AI</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Connecting the Right Responder at the Right Time
            </p>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setCurrentRole('citizen')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              currentRole === 'citizen' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📱 Citizen
          </button>
          <button
            onClick={() => setCurrentRole('responder')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              currentRole === 'responder' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚑 Responder
          </button>
          <button
            onClick={() => setCurrentRole('admin')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              currentRole === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🖥️ Admin Command
          </button>
          <button
            onClick={() => setCurrentRole('split')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              currentRole === 'split' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔀 Split Demo
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            👤 Profile & OTP
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-auto">
        {currentRole === 'citizen' && (
          <div className="max-w-md mx-auto py-6 px-4">
            <CitizenDashboard incident={activeIncident} setIncident={setActiveIncident} />
          </div>
        )}

        {currentRole === 'responder' && (
          <div className="h-[calc(100vh-64px)]">
            <ResponderDashboard incident={activeIncident} setIncident={setActiveIncident} />
          </div>
        )}

        {currentRole === 'admin' && (
          <div className="h-[calc(100vh-64px)]">
            <AdminDashboard incident={activeIncident} setIncident={setActiveIncident} />
          </div>
        )}

        {currentRole === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-64px)] divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            <div className="p-4 overflow-y-auto bg-slate-50">
              <div className="text-xs font-bold text-red-600 uppercase mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                Citizen View (Mobile Simulator)
              </div>
              <CitizenDashboard incident={activeIncident} setIncident={setActiveIncident} />
            </div>

            <div className="p-4 overflow-y-auto bg-white">
              <div className="text-xs font-bold text-blue-700 uppercase mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                First Responder MDT (Ambulance AMB-104)
              </div>
              <ResponderDashboard incident={activeIncident} setIncident={setActiveIncident} />
            </div>

            <div className="p-4 overflow-y-auto bg-slate-900 text-white">
              <div className="text-xs font-bold text-cyan-400 uppercase mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Emergency Command Center (Admin)
              </div>
              <AdminDashboard incident={activeIncident} setIncident={setActiveIncident} />
            </div>
          </div>
        )}
      </main>

      {/* User Profile Modal */}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
}
