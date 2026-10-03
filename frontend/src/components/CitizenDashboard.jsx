import React, { useState } from 'react';
import SmartAutoSOSModal from './SmartAutoSOSModal';

export default function CitizenDashboard({ incident, setIncident }) {
  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Road Accident');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [gpsLocked, setGpsLocked] = useState(true);
  const [isAutoCrashModalOpen, setIsAutoCrashModalOpen] = useState(false);
  const [telemetry, setTelemetry] = useState({ impactG: 4.8, speedDrop: '65 ➔ 0 km/h', tilt: '142°' });

  const handleSOS = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIncident({
        id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
        type: selectedCategory,
        category: desc || 'Citizen One-Tap Emergency SOS',
        severity: selectedCategory === 'Road Accident' || selectedCategory === 'Cardiac Arrest' ? 'Critical' : 'Medium',
        severityScore: 95,
        status: 'En Route',
        lat: 17.4325,
        lng: 78.4071,
        address: 'Jubilee Hills Road 36, Hyderabad',
        assignedUnit: 'AMB-104',
        eta: '03m 15s',
        elapsedSeconds: 0
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleSimulateCrash = () => {
    setTelemetry({ impactG: (4.2 + Math.random()).toFixed(1), speedDrop: '68 ➔ 0 km/h', tilt: '155°' });
    setIsAutoCrashModalOpen(true);
  };

  const handleCancelSafe = () => {
    setIsAutoCrashModalOpen(false);
    alert("False positive safely cancelled. Telematics logged for sensor calibration.");
  };

  const handleEscalateHelp = () => {
    setIsAutoCrashModalOpen(false);
    setIncident({
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Road Accident',
      category: 'Smart Auto SOS: Autonomous Multi-Sensor Crash Escalation',
      severity: 'Critical',
      severityScore: 96,
      status: 'En Route',
      lat: 17.4325,
      lng: 78.4071,
      address: 'Jubilee Hills Road 36, Hyderabad',
      assignedUnit: 'AMB-104',
      eta: '03m 10s',
      elapsedSeconds: 0
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadedImages(files.map(f => URL.createObjectURL(f)));
    }
  };

  return (
    <div className="space-y-4">
      {/* Smart Auto SOS Background Sensor Monitor Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-800 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-emerald-400">SMART AUTO SOS SENSOR FUSION</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Accelerometer, Gyro & GPS Active in Background</div>
        </div>
        <button
          onClick={handleSimulateCrash}
          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition"
        >
          ⚡ Simulate Crash (4.8G)
        </button>
      </div>

      {/* SOS Big Button Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-4 border border-red-100">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          ONE-TAP EMERGENCY SOS
        </div>

        <div className="flex justify-center my-3">
          <button
            onClick={handleSOS}
            disabled={isSubmitting}
            className="w-36 h-36 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-3xl shadow-xl shadow-red-200 hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center border-4 border-white"
          >
            <span>{isSubmitting ? '...' : 'SOS'}</span>
            <span className="text-[10px] font-semibold tracking-wider uppercase mt-1">
              {isSubmitting ? 'Dispatching...' : 'Tap to Report'}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-2">
          <span>📍</span>
          <span>Auto GPS Locked: <strong>Jubilee Hills, Hyderabad (±1.5m)</strong></span>
        </div>
      </div>

      {/* Emergency Reporting Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
        <h3 className="font-bold text-sm text-slate-900">Incident Details & AI Triage</h3>
        
        <div className="grid grid-cols-2 gap-2">
          {['Road Accident', 'Cardiac Arrest', 'Building Fire', 'Assault / Crime'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                selectedCategory === cat
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              {cat === 'Road Accident' && '🚗 '}
              {cat === 'Cardiac Arrest' && '❤️ '}
              {cat === 'Building Fire' && '🔥 '}
              {cat === 'Assault / Crime' && '🚨 '}
              {cat}
            </button>
          ))}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">Scene Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="e.g. Person unconscious after bike collision"
            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">Attach Photo / Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileUpload}
            className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
          />
        </div>
      </div>

      {/* Assigned Responder Live Status */}
      {incident && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">Live Responder Tracking</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
              {incident.status}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              🚑
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900">{incident.assignedUnit} (ALS Trauma)</div>
              <div className="text-xs text-slate-500">Paramedic Alpha Crew • Green Wave Active</div>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-blue-700">{incident.eta}</div>
              <div className="text-[10px] text-slate-400">Estimated Arrival</div>
            </div>
          </div>

          {/* Gemini AI Triage Insight */}
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
            <div className="text-xs font-bold text-indigo-900 flex items-center gap-1 mb-1">
              <span>✨</span>
              <span>Gemini AI Triage Assessment</span>
            </div>
            <p className="text-xs text-indigo-700">
              Emergency categorized as <strong>{incident.type}</strong>. Severity level: <strong>{incident.severity}</strong> (Score: {incident.severityScore}/100). Zero duplicates detected within 500m.
            </p>
          </div>
        </div>
      )}

      {/* Emergency Contacts List */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Automated Emergency Contacts</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
            <span>Sunita Sharma (Mother)</span>
            <span className="text-green-600 font-semibold">✓ SMS & WhatsApp Sent</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
            <span>Dr. Srinivas (Family Physician)</span>
            <span className="text-green-600 font-semibold">✓ Live Telemetry Shared</span>
          </div>
        </div>
      {/* Smart Auto SOS Fullscreen Crash Modal */}
      <SmartAutoSOSModal
        isOpen={isAutoCrashModalOpen}
        telemetry={telemetry}
        onCancelSafe={handleCancelSafe}
        onSendHelp={handleEscalateHelp}
        onTimeoutEscalate={handleEscalateHelp}
      />
    </div>
  );
}
