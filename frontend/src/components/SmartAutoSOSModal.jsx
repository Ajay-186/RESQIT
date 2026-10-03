import React, { useState, useEffect } from 'react';

export default function SmartAutoSOSModal({ isOpen, onCancelSafe, onSendHelp, onTimeoutEscalate, telemetry }) {
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(60);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeoutEscalate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onTimeoutEscalate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border-4 border-red-500 text-center relative overflow-hidden">
        {/* Pulsing Alert Header */}
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-3xl mx-auto mb-4 animate-bounce">
          ⚠️
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Possible Accident Detected
        </h2>
        <p className="text-sm text-slate-600 font-medium mt-1">
          We detected an unusual impact and sudden deceleration.
        </p>

        {/* Telematics Badge */}
        <div className="my-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex justify-around text-xs font-mono text-red-800">
          <div>
            <span className="text-[10px] text-red-500 uppercase block">Impact Spike</span>
            <strong>{telemetry?.impactG || '4.8'}G</strong>
          </div>
          <div>
            <span className="text-[10px] text-red-500 uppercase block">Speed Drop</span>
            <strong>{telemetry?.speedDrop || '65 ➔ 0 km/h'}</strong>
          </div>
          <div>
            <span className="text-[10px] text-red-500 uppercase block">Device Tilt</span>
            <strong>{telemetry?.tilt || '142°'} Rollover</strong>
          </div>
        </div>

        <div className="text-lg font-extrabold text-slate-800 my-2">
          Are you safe?
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Emergency alert with live video evidence will be sent automatically in:
        </p>

        {/* 60s Countdown Circular Display */}
        <div className="w-24 h-24 rounded-full border-4 border-red-500 border-t-red-200 flex items-center justify-center mx-auto my-2 shadow-lg shadow-red-100 bg-red-50">
          <span className="text-4xl font-black font-mono text-red-600">
            {secondsLeft}
          </span>
        </div>
        <div className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
          Seconds remaining before auto-dispatch
        </div>

        {/* Two Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={onCancelSafe}
            className="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>🟢</span>
            <span>I'M SAFE</span>
          </button>

          <button
            onClick={onSendHelp}
            className="py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>🔴</span>
            <span>SEND HELP NOW</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-4">
          If unresponsive, sub-meter GPS and 10-second video evidence will be transmitted to emergency dispatch automatically.
        </p>
      </div>
    </div>
  );
}
