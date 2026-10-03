// Hackathon Pitch Deck Mode (5-Minute Interactive Presentation System)

const SLIDES_DATA = [
  {
    index: 0,
    title: "ResQNet AI",
    sub: "Slide 1 of 7 • Title & Overview",
    durationSec: 20,
    speakerNote: "Introduce team, problem hook, and core tagline in 20 seconds.",
    content: `
      <div style="text-align:center; max-width: 900px; margin: 0 auto;">
        <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(0,240,255,0.1); border:1px solid var(--border-glow); padding:0.4rem 1rem; border-radius:50px; color:var(--cyan-primary); font-family:var(--font-mono); font-size:0.85rem; margin-bottom:1.5rem;">
          🚨 HACKATHON PITCH DECK
        </div>
        <h1 style="font-size: 3.8rem; margin-bottom: 0.5rem; letter-spacing: -0.03em;">ResQNet <span style="color:var(--cyan-primary);">AI</span></h1>
        <h2 style="font-size: 1.6rem; color: #94a3b8; font-weight: 500; margin-bottom: 2rem;">Hyperlocal Intelligent Emergency Response & Coordination Platform</h2>
        
        <div style="background: rgba(255,51,102,0.1); border-left: 4px solid var(--emergency-red); padding: 1.25rem 2rem; border-radius: 8px; margin-bottom: 2.5rem; text-align: left;">
          <p style="font-size: 1.35rem; font-style: italic; color: #ffffff; margin: 0;">"Connecting the Right Responder at the Right Time to Save Lives."</p>
        </div>

        <div style="display:flex; justify-content:center; gap: 2rem; flex-wrap:wrap; font-family:var(--font-mono); font-size:0.95rem;">
          <div style="background:rgba(255,255,255,0.05); padding:0.75rem 1.5rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <span style="color:var(--text-dim);">TEAM:</span> <strong id="pitch-team-name" style="color:#ffffff;">Team Lifeline</strong>
          </div>
          <div style="background:rgba(255,255,255,0.05); padding:0.75rem 1.5rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <span style="color:var(--text-dim);">MEMBERS:</span> <strong id="pitch-team-members" style="color:#ffffff;">Lead Dev & AI Engineer</strong>
          </div>
          <div style="background:rgba(255,255,255,0.05); padding:0.75rem 1.5rem; border-radius:12px; border:1px solid var(--border-subtle);">
            <span style="color:var(--text-dim);">EVENT:</span> <strong id="pitch-hackathon-name" style="color:var(--amber-warning);">Smart City Hackathon 2026</strong>
          </div>
        </div>
      </div>
    `
  },
  {
    index: 1,
    title: "The Problem",
    sub: "Slide 2 of 7 • Problem Statement & Critical Bottlenecks",
    durationSec: 45,
    speakerNote: "Highlight that every second matters and emergency calling alone is broken.",
    content: `
      <div>
        <h2 style="font-size: 2.5rem; margin-bottom: 0.75rem;">Current Emergency Response Is Broken</h2>
        <p style="font-size: 1.2rem; color: #cbd5e1; margin-bottom: 2rem;">During emergencies, every second matters. However, legacy call centers face severe systemic hurdles.</p>
        
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem;">
          <div style="background:rgba(255,51,102,0.08); border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:1.25rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🚑</div>
            <strong style="color:#ffffff; font-size:1.1rem; display:block; margin-bottom:0.25rem;">Delayed Emergency Response</strong>
            <p style="font-size:0.875rem; color:var(--text-muted); margin:0;">12-18 minute average wait due to manual triage and phone line congestion.</p>
          </div>
          <div style="background:rgba(255,51,102,0.08); border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:1.25rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">📍</div>
            <strong style="color:#ffffff; font-size:1.1rem; display:block; margin-bottom:0.25rem;">Inaccurate Location Sharing</strong>
            <p style="font-size:0.875rem; color:var(--text-muted); margin:0;">Panicked callers cannot describe exact GPS coordinates over voice calls.</p>
          </div>
          <div style="background:rgba(255,51,102,0.08); border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:1.25rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🔄</div>
            <strong style="color:#ffffff; font-size:1.1rem; display:block; margin-bottom:0.25rem;">Duplicate Incident Reports</strong>
            <p style="font-size:0.875rem; color:var(--text-muted); margin:0;">Dozens call for the same incident, choking lines and wasting resources.</p>
          </div>
          <div style="background:rgba(255,51,102,0.08); border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:1.25rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🚔</div>
            <strong style="color:#ffffff; font-size:1.1rem; display:block; margin-bottom:0.25rem;">Poor Agency Coordination</strong>
            <p style="font-size:0.875rem; color:var(--text-muted); margin:0;">Siloed communication between police, fire dispatch, and EMS teams.</p>
          </div>
          <div style="background:rgba(255,51,102,0.08); border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:1.25rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">📊</div>
            <strong style="color:#ffffff; font-size:1.1rem; display:block; margin-bottom:0.25rem;">No Centralized Monitoring</strong>
            <p style="font-size:0.875rem; color:var(--text-muted); margin:0;">Dispatchers have zero live telemetry of vehicle proximity or readiness.</p>
          </div>
          <div style="background:rgba(255,51,102,0.08); border:1px solid rgba(255,51,102,0.3); border-radius:14px; padding:1.25rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">⏱</div>
            <strong style="color:#ffffff; font-size:1.1rem; display:block; margin-bottom:0.25rem;">Increased Fatal Response Time</strong>
            <p style="font-size:0.875rem; color:var(--text-muted); margin:0;">The critical 'Golden Hour' is lost while responders try to locate victims.</p>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--amber-warning); padding: 1rem 1.5rem; border-radius: 8px;">
          <strong style="color:var(--amber-warning); font-size:1.1rem;">Bottom Line:</strong>
          <span style="color:#ffffff; margin-left:0.5rem; font-size:1.1rem;">"Emergency response requires intelligent coordination, not just emergency calling."</span>
        </div>
      </div>
    `
  },
  {
    index: 2,
    title: "Our Solution",
    sub: "Slide 3 of 7 • ResQNet AI Core Objectives & Workflow",
    durationSec: 50,
    speakerNote: "Judge Pitch: Instead of only sending an emergency alert, our platform captures a short live video immediately after the SOS is triggered. This provides responders with visual evidence, helping them understand the situation before reaching the location. AI further analyzes the video to estimate emergency type and severity.",
    content: `
      <div>
        <h2 style="font-size: 2.5rem; margin-bottom: 0.75rem;">AI-Powered Hyperlocal Emergency Platform</h2>
        <p style="font-size: 1.15rem; color: #cbd5e1; margin-bottom: 1.75rem;">Instantly connects citizens with the nearest available responders using real-time location intelligence, 10-second Smart Evidence Capture, and Gemini AI triage.</p>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem;">
          <div style="background:rgba(229,57,53,0.1); border:1px solid var(--emergency-red); padding:1rem 1.25rem; border-radius:12px;">
            <span style="font-size:1.5rem;">🎥</span>
            <h4 style="margin: 0.25rem 0; color:var(--emergency-red);">Smart Evidence Capture</h4>
            <p style="font-size:0.825rem; margin:0;">10s live video + audio streams visual proof to responders.</p>
          </div>
          <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); padding:1rem 1.25rem; border-radius:12px;">
            <span style="font-size:1.5rem;">📍</span>
            <h4 style="margin: 0.25rem 0;">Automatic GPS Capture</h4>
            <p style="font-size:0.825rem; margin:0;">Zero verbal directions; sub-meter precision coordinates.</p>
          </div>
          <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); padding:1rem 1.25rem; border-radius:12px;">
            <span style="font-size:1.5rem;">🤖</span>
            <h4 style="margin: 0.25rem 0;">AI Emergency Classification</h4>
            <p style="font-size:0.825rem; margin:0;">Gemini AI severity scoring & deduplication logic.</p>
          </div>
          <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); padding:1rem 1.25rem; border-radius:12px;">
            <span style="font-size:1.5rem;">🚑</span>
            <h4 style="margin: 0.25rem 0;">Smart Responder Assignment</h4>
            <p style="font-size:0.825rem; margin:0;">Hyperlocal distance + equipment matching algorithm.</p>
          </div>
          <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); padding:1rem 1.25rem; border-radius:12px;">
            <span style="font-size:1.5rem;">📡</span>
            <h4 style="margin: 0.25rem 0;">Live Incident Tracking</h4>
            <p style="font-size:0.825rem; margin:0;">Bidirectional WebSockets streaming telemetry.</p>
          </div>
          <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); padding:1rem 1.25rem; border-radius:12px;">
            <span style="font-size:1.5rem;">📊</span>
            <h4 style="margin: 0.25rem 0;">Admin Monitoring Dashboard</h4>
            <p style="font-size:0.825rem; margin:0;">City-wide operational oversight and heatmap analytics.</p>
          </div>
        </div>

        <div style="background:rgba(0,240,255,0.06); border:1px solid var(--border-glow); border-radius:14px; padding:1.25rem; text-align:center;">
          <div style="font-size:0.8rem; font-family:var(--font-mono); color:var(--cyan-primary); margin-bottom:0.5rem;">CORE WORKFLOW PIPELINE</div>
          <div style="display:flex; justify-content:center; align-items:center; gap:1.25rem; font-weight:700; font-size:1rem; flex-wrap:wrap;">
            <span>👤 Citizen SOS</span> ➔ 
            <span style="color:var(--cyan-primary);">🤖 AI Engine</span> ➔ 
            <span style="color:var(--emerald-success);">🚑 Nearest Responder</span> ➔ 
            <span style="color:var(--blue-accent);">📡 Live Tracking</span> ➔ 
            <span style="color:var(--amber-warning);">📊 Admin Dashboard</span>
          </div>
        </div>
      </div>
    `
  },
  {
    index: 3,
    title: "Key Platform Features",
    sub: "Slide 4 of 7 • Citizen, AI Engine, Responder & Admin",
    durationSec: 60,
    speakerNote: "Walk through the four pillars of the platform.",
    content: `
      <div>
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Comprehensive 4-Pillar Architecture</h2>
        
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:1.5rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">👤</div>
            <h3 style="color:var(--cyan-primary); font-size:1.2rem; margin-bottom:0.75rem;">Citizen</h3>
            <ul style="list-style:none; font-size:0.875rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.5rem; padding:0;">
              <li>✓ One-Tap SOS Alarm</li>
              <li>✓ Sub-meter GPS Capture</li>
              <li>✓ Photo & Video Scene Upload</li>
              <li>✓ Emergency Contacts Alert</li>
              <li>✓ Live Responder ETA Tracking</li>
            </ul>
          </div>

          <div style="background:var(--bg-card); border:1px solid var(--purple-ai); border-radius:16px; padding:1.5rem; box-shadow:0 0 20px rgba(168,85,247,0.15);">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🤖</div>
            <h3 style="color:var(--purple-ai); font-size:1.2rem; margin-bottom:0.75rem;">AI Engine</h3>
            <ul style="list-style:none; font-size:0.875rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.5rem; padding:0;">
              <li>✓ Multimodal Classification</li>
              <li>✓ Real-Time Severity Score</li>
              <li>✓ Duplicate Incident Detection</li>
              <li>✓ Hyperlocal Match Recommender</li>
              <li>✓ Traffic Preemption Route</li>
            </ul>
          </div>

          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:1.5rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🚑</div>
            <h3 style="color:var(--emerald-success); font-size:1.2rem; margin-bottom:0.75rem;">Responder</h3>
            <ul style="list-style:none; font-size:0.875rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.5rem; padding:0;">
              <li>✓ Instant Priority Alerts</li>
              <li>✓ Turn-by-Turn Dynamic GPS</li>
              <li>✓ Victim Vitals & Scene Brief</li>
              <li>✓ One-Touch Status Toggle</li>
              <li>✓ Hospital Pre-Notification</li>
            </ul>
          </div>

          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:1.5rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🖥</div>
            <h3 style="color:var(--amber-warning); font-size:1.2rem; margin-bottom:0.75rem;">Admin</h3>
            <ul style="list-style:none; font-size:0.875rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.5rem; padding:0;">
              <li>✓ Live Real-Time Dashboard</li>
              <li>✓ Incident Density Heatmap</li>
              <li>✓ Fleet Readiness Telemetry</li>
              <li>✓ Response Time Analytics</li>
              <li>✓ Audit Logs & Post-Mortem</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    index: 4,
    title: "System Architecture",
    sub: "Slide 5 of 7 • End-to-End Scalable Stack",
    durationSec: 60,
    speakerNote: "Explain the backend API, Gemini AI engine, and Socket.IO real-time backbone.",
    content: `
      <div>
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Scalable Real-Time Event Architecture</h2>

        <div style="background:var(--bg-elevated); border:1px solid var(--border-glow); border-radius:16px; padding:2rem; font-family:var(--font-mono); text-align:center; margin-bottom:1.75rem;">
          <div style="display:inline-block; background:rgba(59,130,246,0.2); border:1px solid var(--blue-accent); padding:0.6rem 1.5rem; border-radius:8px; color:#ffffff; font-weight:700;">
            Citizen Web / Mobile App (PWA)
          </div>
          <div style="font-size:1.5rem; color:var(--cyan-primary); margin:0.35rem 0;">▼</div>
          <div style="display:inline-block; background:rgba(0,240,255,0.15); border:1px solid var(--cyan-primary); padding:0.6rem 2rem; border-radius:8px; color:#ffffff; font-weight:700;">
            Node.js & Express.js Backend Gateway
          </div>
          <div style="font-size:1.5rem; color:var(--cyan-primary); margin:0.35rem 0;">▼</div>
          <div style="display:flex; justify-content:center; gap:2rem; margin:0.5rem 0;">
            <div style="background:rgba(255,255,255,0.06); padding:0.5rem 1rem; border-radius:8px; border:1px solid var(--border-subtle); font-size:0.85rem;">🍃 MongoDB (Geospatial)</div>
            <div style="background:rgba(168,85,247,0.15); padding:0.5rem 1rem; border-radius:8px; border:1px solid var(--purple-ai); font-size:0.85rem; color:#c084fc;">🤖 Gemini Multimodal AI</div>
            <div style="background:rgba(255,255,255,0.06); padding:0.5rem 1rem; border-radius:8px; border:1px solid var(--border-subtle); font-size:0.85rem;">🗺️ Google Maps Routing API</div>
          </div>
          <div style="font-size:1.5rem; color:var(--cyan-primary); margin:0.35rem 0;">▼</div>
          <div style="display:inline-block; background:rgba(255,51,102,0.15); border:1px solid var(--emergency-red); padding:0.6rem 1.5rem; border-radius:8px; color:#ffffff; font-weight:700;">
            ⚡ Socket.IO Real-Time Pub/Sub Pipeline
          </div>
          <div style="font-size:1.5rem; color:var(--cyan-primary); margin:0.35rem 0;">▼</div>
          <div style="display:flex; justify-content:center; gap:2.5rem;">
            <div style="background:rgba(0,230,118,0.15); padding:0.5rem 1.25rem; border-radius:8px; border:1px solid var(--emerald-success); color:#6ee7b7; font-weight:700;">
              🚑 Responder Dashboard
            </div>
            <div style="background:rgba(255,184,0,0.15); padding:0.5rem 1.25rem; border-radius:8px; border:1px solid var(--amber-warning); color:#fde047; font-weight:700;">
              🖥️ Admin Command Dashboard
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem;">⚛️ React</span>
          <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem;">🟢 Node.js</span>
          <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem;">🚀 Express.js</span>
          <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem;">🍃 MongoDB</span>
          <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem;">🗺️ Google Maps API</span>
          <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem;">⚡ Socket.IO</span>
          <span style="background:rgba(168,85,247,0.2); border:1px solid var(--purple-ai); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem; color:#c084fc; font-weight:700;">✨ Gemini AI</span>
        </div>
      </div>
    `
  },
  {
    index: 5,
    title: "Demo & Impact",
    sub: "Slide 6 of 7 • Workflow & Measurable Outcomes",
    durationSec: 60,
    speakerNote: "Highlight the 40%+ response time reduction and Golden Hour savings.",
    content: `
      <div>
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Field Demo Sequence & Projected Impact</h2>

        <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); border-radius:14px; padding:1.25rem 2rem; margin-bottom:2rem; font-size:0.95rem; font-family:var(--font-mono); text-align:center;">
          <div style="color:var(--cyan-primary); margin-bottom:0.5rem; font-weight:700;">8-STAGE INCIDENT LIFECYCLE:</div>
          Road Accident ➔ Citizen Reports ➔ GPS Captured ➔ AI Classifies ➔ Nearest Ambulance Assigned ➔ Responder Navigates ➔ Live Tracking ➔ Incident Resolved
        </div>

        <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem;">
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:1.5rem 1rem; text-align:center;">
            <div style="font-size:2.25rem; font-weight:800; color:var(--emerald-success); font-family:var(--font-heading);">-45%</div>
            <div style="font-size:0.85rem; color:#ffffff; font-weight:600; margin-top:0.25rem;">Response Time</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">Down from 15m to under 8m</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:1.5rem 1rem; text-align:center;">
            <div style="font-size:2.25rem; font-weight:800; color:var(--cyan-primary); font-family:var(--font-heading);">99.4%</div>
            <div style="font-size:0.85rem; color:#ffffff; font-weight:600; margin-top:0.25rem;">Location Accuracy</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">Sub-meter pin lock</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:1.5rem 1rem; text-align:center;">
            <div style="font-size:2.25rem; font-weight:800; color:var(--blue-accent); font-family:var(--font-heading);">3x</div>
            <div style="font-size:0.85rem; color:#ffffff; font-weight:600; margin-top:0.25rem;">Inter-Agency Speed</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">Unified police + EMS link</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:1.5rem 1rem; text-align:center;">
            <div style="font-size:2.25rem; font-weight:800; color:var(--amber-warning); font-family:var(--font-heading);">100%</div>
            <div style="font-size:0.85rem; color:#ffffff; font-weight:600; margin-top:0.25rem;">Real-Time Visibility</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">End-to-end telemetry</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--emergency-red); border-radius:14px; padding:1.5rem 1rem; text-align:center; box-shadow:0 0 20px rgba(255,51,102,0.15);">
            <div style="font-size:2.25rem; font-weight:800; color:var(--emergency-red); font-family:var(--font-heading);">1000s</div>
            <div style="font-size:0.85rem; color:#ffffff; font-weight:600; margin-top:0.25rem;">Lives Saved</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">Preserving the Golden Hour</p>
          </div>
        </div>
      </div>
    `
  },
  {
    index: 6,
    title: "Future Scope & Conclusion",
    sub: "Slide 7 of 7 • Roadmap & Vision",
    durationSec: 45,
    speakerNote: "Deliver a strong emotional close: 'Every Second Matters. Every Life Matters.'",
    content: `
      <div style="text-align:center;">
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Future Scope & Smart City Integration</h2>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem; text-align:left;">
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1rem;">
            <span style="font-size:1.4rem;">🚨</span>
            <strong style="color:#ffffff; display:block; font-size:0.95rem; margin-top:0.25rem;">Emergency 112</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">National emergency dialer bridge.</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1rem;">
            <span style="font-size:1.4rem;">⌚</span>
            <strong style="color:#ffffff; display:block; font-size:0.95rem; margin-top:0.25rem;">Smartwatch SOS</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Fall & cardiac arrest detection.</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1rem;">
            <span style="font-size:1.4rem;">📹</span>
            <strong style="color:#ffffff; display:block; font-size:0.95rem; margin-top:0.25rem;">CCTV AI Detection</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Computer vision crash monitoring.</p>
          </div>
          <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1rem;">
            <span style="font-size:1.4rem;">🛸</span>
            <strong style="color:#ffffff; display:block; font-size:0.95rem; margin-top:0.25rem;">Drone First-Aid</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Defibrillator & med delivery.</p>
          </div>
        </div>

        <div style="background: linear-gradient(135deg, rgba(255,51,102,0.15), rgba(0,240,255,0.15)); border: 1px solid var(--border-glow); border-radius: 18px; padding: 2rem;">
          <div style="font-size: 1.85rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem; letter-spacing: -0.02em;">
            "Every Second Matters. Every Life Matters."
          </div>
          <p style="font-size: 1.1rem; color: #cbd5e1; max-width: 800px; margin: 0 auto;">
            ResQNet AI reduces emergency response delays through intelligent incident classification, smart responder allocation, and real-time hyperlocal tracking.
          </p>
        </div>
      </div>
    `
  }
];

class PitchPresentation {
  constructor() {
    this.overlay = document.getElementById('pitch-deck-overlay');
    this.currentSlideIndex = 0;
    this.totalSeconds = 300; // 5 minutes (300 sec)
    this.remainingSeconds = 300;
    this.slideSeconds = 20;
    this.timerInterval = null;
    this.isRunning = false;
    this.bindEvents();
  }

  bindEvents() {
    const launchBtns = document.querySelectorAll('.launch-pitch-btn');
    const exitBtn = document.getElementById('exit-pitch-btn');
    const nextBtn = document.getElementById('pitch-next-btn');
    const prevBtn = document.getElementById('pitch-prev-btn');
    const toggleTimerBtn = document.getElementById('pitch-timer-toggle-btn');

    launchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.openPitchDeck();
      });
    });

    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.closePitchDeck();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.prevSlide();
      });
    }

    if (toggleTimerBtn) {
      toggleTimerBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.toggleTimer();
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.overlay || !this.overlay.classList.contains('active')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'Escape') {
        this.closePitchDeck();
      }
    });
  }

  openPitchDeck() {
    if (!this.overlay) return;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.currentSlideIndex = 0;
    this.remainingSeconds = 300;
    this.renderSlide(0);
    this.startTimer();
  }

  closePitchDeck() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer();
    this.isRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.slideSeconds--;
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
        window.soundFX?.playEmergencyAlert();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isRunning = false;
  }

  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer();
      const btn = document.getElementById('pitch-timer-toggle-btn');
      if (btn) btn.textContent = '▶ Resume';
    } else {
      this.startTimer();
      const btn = document.getElementById('pitch-timer-toggle-btn');
      if (btn) btn.textContent = '⏸ Pause';
    }
  }

  updateTimerDisplay() {
    const totalTimerEl = document.getElementById('pitch-total-timer');
    const slideTimerEl = document.getElementById('pitch-slide-timer');

    if (totalTimerEl) {
      const mins = Math.floor(this.remainingSeconds / 60);
      const secs = this.remainingSeconds % 60;
      totalTimerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      if (this.remainingSeconds < 60) {
        totalTimerEl.style.color = 'var(--emergency-red)';
      } else {
        totalTimerEl.style.color = 'var(--cyan-primary)';
      }
    }

    if (slideTimerEl) {
      slideTimerEl.textContent = `${this.slideSeconds}s left`;
      if (this.slideSeconds <= 5) {
        slideTimerEl.style.color = 'var(--emergency-red)';
      } else {
        slideTimerEl.style.color = 'var(--amber-warning)';
      }
    }
  }

  renderSlide(index) {
    this.currentSlideIndex = index;
    const slide = SLIDES_DATA[index];
    if (!slide) return;

    this.slideSeconds = slide.durationSec;
    this.updateTimerDisplay();

    const titleEl = document.getElementById('pitch-slide-title-bar');
    const subEl = document.getElementById('pitch-slide-subtitle-bar');
    const bodyEl = document.getElementById('pitch-slide-body');
    const noteEl = document.getElementById('pitch-speaker-notes');

    if (titleEl) titleEl.textContent = slide.title;
    if (subEl) subEl.textContent = slide.sub;
    if (bodyEl) bodyEl.innerHTML = slide.content;
    if (noteEl) noteEl.textContent = `💡 Speaker Cue: ${slide.speakerNote}`;

    // Update dynamic team placeholders in slide 1 if edited
    const savedTeam = localStorage.getItem('resqnet_team_name') || 'Team Lifeline';
    const savedMembers = localStorage.getItem('resqnet_team_members') || 'Lead Dev & AI Engineer';
    const savedHackathon = localStorage.getItem('resqnet_hackathon_name') || 'Smart City Hackathon 2026';

    const tName = document.getElementById('pitch-team-name');
    const tMembers = document.getElementById('pitch-team-members');
    const tHack = document.getElementById('pitch-hackathon-name');
    if (tName) tName.textContent = savedTeam;
    if (tMembers) tMembers.textContent = savedMembers;
    if (tHack) tHack.textContent = savedHackathon;

    // Render Progress Dots
    const dotsContainer = document.getElementById('pitch-dots-container');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      SLIDES_DATA.forEach((s, idx) => {
        const dot = document.createElement('div');
        dot.className = `pitch-dot ${idx === index ? 'active' : ''}`;
        dot.title = `Slide ${idx + 1}: ${s.title}`;
        dot.addEventListener('click', () => {
          window.soundFX?.playClick();
          this.renderSlide(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    const prevBtn = document.getElementById('pitch-prev-btn');
    const nextBtn = document.getElementById('pitch-next-btn');
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.textContent = index === SLIDES_DATA.length - 1 ? 'Finish 🏁' : 'Next ➔';
  }

  nextSlide() {
    if (this.currentSlideIndex < SLIDES_DATA.length - 1) {
      this.renderSlide(this.currentSlideIndex + 1);
    } else {
      this.closePitchDeck();
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.renderSlide(this.currentSlideIndex - 1);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.pitchPresentation = new PitchPresentation();
});
