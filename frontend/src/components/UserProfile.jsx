import React, { useState } from 'react';

export default function UserProfile({ onClose }) {
  const [phone, setPhone] = useState('+91 98480 22338');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('otp'); // 'otp' | 'profile'
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('Asthmatic, Penicillin');
  const [contacts, setContacts] = useState([
    { name: 'Sunita Sharma', phone: '+91 94400 11223', relation: 'Mother' },
    { name: 'Dr. Srinivas', phone: '+91 98490 33445', relation: 'Physician' }
  ]);

  const handleVerify = () => {
    if (otp === '123456' || otp.length === 6) {
      setStep('profile');
    } else {
      alert('Use demo OTP: 123456');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold"
        >
          ✕
        </button>

        {step === 'otp' ? (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl mx-auto">
              🔐
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-lg text-slate-900">Secure Citizen Login</h3>
              <p className="text-xs text-slate-500 mt-1">Enter your mobile number to receive instant verification OTP</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Mobile Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">6-Digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 123456"
                maxLength={6}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-mono tracking-widest text-center"
              />
              <div className="text-[11px] text-blue-600 mt-1 text-center font-semibold">Demo Bypass Code: 123456</div>
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition"
            >
              Verify & Enter Profile ➔
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center font-bold text-2xl mx-auto mb-2">
                👤
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Medical ID & Contacts</h3>
              <p className="text-xs text-slate-500">Shared automatically with responding paramedics</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-red-600"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Medical Conditions</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Emergency Contacts</label>
              <div className="space-y-2">
                {contacts.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between text-xs items-center">
                    <div>
                      <strong>{c.name}</strong> ({c.relation})
                      <div className="text-slate-400 font-mono">{c.phone}</div>
                    </div>
                    <span className="text-green-600 font-bold">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
