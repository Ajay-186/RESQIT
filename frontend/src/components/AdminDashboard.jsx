import React, { useState } from 'react';

export default function AdminDashboard({ incident, setIncident }) {
  const [activeTab, setActiveTab] = useState('incidents'); // 'incidents' | 'heatmap' | 'analytics' | 'users' | 'fleet'
  const [isHeatmapOn, setIsHeatmapOn] = useState(true);

  const mockIncidents = [
    { id: 'INC-7041', type: 'Road Accident', severity: 'Critical', unit: 'AMB-104', status: incident?.status || 'Assigned', time: '1m ago' },
    { id: 'INC-7039', type: 'Cardiac Arrest', severity: 'Critical', unit: 'AMB-108', status: 'Reached', time: '8m ago' },
    { id: 'INC-7034', type: 'Building Fire', severity: 'Critical', unit: 'FIRE-301', status: 'En Route', time: '14m ago' },
    { id: 'INC-7028', type: 'Minor Collision', severity: 'Minor', unit: 'POL-201', status: 'Resolved', time: '28m ago' },
  ];

  return (
    <div className="h-full flex flex-col space-y-4 p-4 bg-slate-900 text-white">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <div className="text-[11px] text-slate-400 font-mono">ACTIVE INCIDENTS</div>
          <div className="text-2xl font-black text-red-500 mt-0.5">3</div>
          <div className="text-[10px] text-slate-400 mt-1">Across Hyderabad Metro</div>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <div className="text-[11px] text-slate-400 font-mono">CRITICAL CASES</div>
          <div className="text-2xl font-black text-rose-400 mt-0.5">2</div>
          <div className="text-[10px] text-rose-400/80 mt-1">Golden Hour Preserved</div>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <div className="text-[11px] text-slate-400 font-mono">AVAILABLE FLEET</div>
          <div className="text-2xl font-black text-emerald-400 mt-0.5">14</div>
          <div className="text-[10px] text-slate-400 mt-1">Ambulances, Police & Fire</div>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <div className="text-[11px] text-slate-400 font-mono">AVG RESPONSE TIME</div>
          <div className="text-2xl font-black text-cyan-400 mt-0.5">3m 48s</div>
          <div className="text-[10px] text-emerald-400 mt-1">-45% vs City Target</div>
        </div>
      </div>

      {/* Admin Subnav */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        {[
          { key: 'incidents', label: 'Active Incidents' },
          { key: 'heatmap', label: 'Heatmap & Map' },
          { key: 'analytics', label: 'Response Analytics' },
          { key: 'fleet', label: 'Responder Fleet' },
          { key: 'users', label: 'User Directory' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Incidents List */}
      {activeTab === 'incidents' && (
        <div className="flex-1 overflow-y-auto space-y-2">
          {mockIncidents.map(inc => (
            <div
              key={inc.id}
              className={`p-3.5 rounded-xl border flex justify-between items-center transition ${
                inc.id === incident?.id
                  ? 'border-blue-500 bg-slate-800/90'
                  : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/60'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{inc.id} • {inc.type}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {inc.severity}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Assigned Unit: <span className="text-cyan-400 font-semibold">{inc.unit}</span> • {inc.time}</div>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  inc.status === 'Resolved' ? 'bg-slate-700 text-slate-300' : 'bg-blue-600 text-white'
                }`}>
                  {inc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Heatmap & Map Controls */}
      {activeTab === 'heatmap' && (
        <div className="flex-1 bg-slate-800/50 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Urban Incident Heatmap Layer</span>
            <button
              onClick={() => setIsHeatmapOn(!isHeatmapOn)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                isHeatmapOn ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {isHeatmapOn ? 'Heatmap: ACTIVE' : 'Heatmap: OFF'}
            </button>
          </div>

          <div className="flex-1 rounded-xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="font-bold text-base text-white">Live Metropolitan Density Mesh</div>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              High density clusters identified in Jubilee Hills Checkpost, Begumpet Corridor, and Gachibowli Junction.
            </p>
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>Low Risk (Green)</span>
            <span>Moderate (Amber)</span>
            <span className="text-red-400 font-bold">Critical Blackspots (Red)</span>
          </div>
        </div>
      )}

      {/* Tab 3: Analytics */}
      {activeTab === 'analytics' && (
        <div className="flex-1 bg-slate-800/50 rounded-2xl p-4 border border-slate-700 space-y-4">
          <div className="text-xs font-bold uppercase text-slate-400">Response Time KPI Breakdown</div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Dispatch Automation Latency</span>
                <span className="text-emerald-400 font-bold">24 seconds</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[18%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Golden Hour Adherence Rate</span>
                <span className="text-blue-400 font-bold">94.6%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[94.6%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Spatiotemporal Duplicates Filtered</span>
                <span className="text-cyan-400 font-bold">14 Calls Merged</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[70%]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Fleet & Tab 5: Users */}
      {(activeTab === 'fleet' || activeTab === 'users') && (
        <div className="flex-1 bg-slate-800/50 rounded-2xl p-4 border border-slate-700 text-xs">
          <div className="text-xs font-bold uppercase text-slate-400 mb-3">
            {activeTab === 'fleet' ? 'Registered Responder Fleet' : 'Citizen Directory & Contacts'}
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-800 flex justify-between">
              <div>
                <strong>AMB-104 (ALS)</strong>
                <div className="text-slate-400">Jubilee Hills Hub • Paramedic Alpha Crew</div>
              </div>
              <span className="text-emerald-400 font-bold">En Route</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800 flex justify-between">
              <div>
                <strong>POL-201 (Patrol)</strong>
                <div className="text-slate-400">Banjara Hills Interceptor</div>
              </div>
              <span className="text-blue-400 font-bold">Available</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
