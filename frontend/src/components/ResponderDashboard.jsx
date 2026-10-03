import React, { useState } from 'react';

export default function ResponderDashboard({ incident, setIncident }) {
  const [hasAccepted, setHasAccepted] = useState(true);

  const statuses = [
    'Assigned',
    'En Route',
    'Reached',
    'Treatment Started',
    'Resolved'
  ];

  const handleStatusChange = (newStatus) => {
    setIncident(prev => ({
      ...prev,
      status: newStatus,
      eta: newStatus === 'Reached' || newStatus === 'Treatment Started' ? 'ON SCENE' : newStatus === 'Resolved' ? 'COMPLETED' : prev.eta
    }));
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      {/* Top Unit Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl">
            🚑
          </div>
          <div>
            <div className="text-xs text-blue-400 font-mono font-bold">MDT TERMINAL • ONLINE</div>
            <div className="font-extrabold text-base">Ambulance Unit AMB-104 (ALS)</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Current Status</div>
          <span className="inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            {incident?.status || 'Available'}
          </span>
        </div>
      </div>

      {/* Emergency Alert Card */}
      {incident && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
                <span>🚨</span> CRITICAL INCIDENT ALERT
              </div>
              <h3 className="font-extrabold text-base text-slate-900">{incident.id} - {incident.type}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{incident.address}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-700">{incident.eta}</span>
              <div className="text-[10px] text-slate-400">Optimal ETA</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
            <div className="font-bold text-slate-700">Scene Briefing (Gemini AI):</div>
            <p className="text-slate-600">{incident.category}. Two-wheeler driver unconscious with blunt trauma risk. ALS ventilator & cervical collar recommended.</p>
          </div>

          {/* Accept / Reject Buttons if in Assigned State */}
          {!hasAccepted && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setHasAccepted(true)}
                className="py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs shadow-md shadow-green-100 hover:bg-green-700 transition"
              >
                ✓ Accept Incident
              </button>
              <button
                onClick={() => setHasAccepted(false)}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
              >
                ✕ Reject / Pass to Next Unit
              </button>
            </div>
          )}

          {/* 5 Status Lifecycle Transitions */}
          {hasAccepted && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Update Incident Status:</div>
              <div className="grid grid-cols-5 gap-1.5">
                {statuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold transition border ${
                      incident.status === st
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Telemetry */}
      <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase mb-2">Live Turn-by-Turn Route Navigation</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-base">⬆️</span>
              <span className="font-semibold text-slate-800">Proceed on Outer Ring Road for 800m</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 font-semibold">
              <span className="text-base">↗️</span>
              <span>Take Flyover Exit onto Jubilee Hills Rd 36 (Traffic Preempted)</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-400">Nearest Trauma Center:</span>
            <strong className="block text-slate-800">Care Hospitals Banjara Hills</strong>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition">
            Reserve ICU Bed ➔
          </button>
        </div>
      </div>
    </div>
  );
}
