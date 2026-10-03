// Main App Logic, Interactions, and Navigation

document.addEventListener('DOMContentLoaded', () => {
  initAudioToggle();
  initTeamEditor();
  initFeatureTabs();
  initWorkflowNodes();
  initArchitectureInspector();
  initScrollNav();
  initLiveAlertTicker();
});

// Audio Sound Toggle
function initAudioToggle() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isMuted = window.soundFX?.toggleMute();
    toggleBtn.innerHTML = isMuted ? '🔇' : '🔊';
    toggleBtn.setAttribute('title', isMuted ? 'Unmute Audio' : 'Mute Audio');
    if (!isMuted) {
      window.soundFX?.playClick();
    }
  });
}

// Team & Hackathon Customization Modal
function initTeamEditor() {
  const modal = document.getElementById('team-modal');
  const openBtns = document.querySelectorAll('.open-team-modal');
  const closeBtn = document.getElementById('close-team-modal');
  const saveBtn = document.getElementById('save-team-btn');

  const teamInput = document.getElementById('input-team-name');
  const membersInput = document.getElementById('input-team-members');
  const hackathonInput = document.getElementById('input-hackathon-name');

  const displayTeam = document.getElementById('display-team-name');
  const displayMembers = document.getElementById('display-team-members');
  const displayHackathon = document.getElementById('display-hackathon-name');

  // Load from LocalStorage
  const loadSaved = () => {
    const t = localStorage.getItem('resqnet_team_name') || 'Team Lifeline';
    const m = localStorage.getItem('resqnet_team_members') || 'Lead Dev & AI Engineer';
    const h = localStorage.getItem('resqnet_hackathon_name') || 'Smart City Hackathon 2026';

    if (displayTeam) displayTeam.textContent = t;
    if (displayMembers) displayMembers.textContent = m;
    if (displayHackathon) displayHackathon.textContent = h;

    if (teamInput) teamInput.value = t;
    if (membersInput) membersInput.value = m;
    if (hackathonInput) hackathonInput.value = h;
  };

  loadSaved();

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundFX?.playClick();
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (saveBtn && modal) {
    saveBtn.addEventListener('click', () => {
      window.soundFX?.playSuccess();
      localStorage.setItem('resqnet_team_name', teamInput.value.trim() || 'Team Lifeline');
      localStorage.setItem('resqnet_team_members', membersInput.value.trim() || 'Lead Dev & AI Engineer');
      localStorage.setItem('resqnet_hackathon_name', hackathonInput.value.trim() || 'Smart City Hackathon 2026');
      loadSaved();
      modal.classList.remove('active');
    });
  }
}

// Features Tabs (Slide 4)
function initFeatureTabs() {
  const tabBtns = document.querySelectorAll('.feature-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundFX?.playClick();
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetTab);
      if (activePane) activePane.classList.add('active');
    });
  });
}

// Slide 3 Interactive Workflow Nodes
function initWorkflowNodes() {
  const nodes = document.querySelectorAll('.workflow-node');
  const detailsEl = document.getElementById('workflow-details-text');
  const badgeEl = document.getElementById('workflow-details-badge');

  const nodeData = {
    citizen: {
      badge: "STEP 1: CITIZEN REPORT",
      desc: "Citizen taps One-Tap SOS, triggers automatic sub-meter GPS capture and optional camera stream with zero verbal delays."
    },
    ai: {
      badge: "STEP 2: GEMINI AI TRIAGE",
      desc: "Multimodal Gemini AI classifies emergency type (Medical/Crash/Fire), checks for nearby duplicate reports, and assigns severity rating."
    },
    responder: {
      badge: "STEP 3: HYPERLOCAL DISPATCH",
      desc: "Hyperlocal algorithmic match selects the nearest ambulance or responder unit with compatible equipment and shortest ETA."
    },
    tracking: {
      badge: "STEP 4: REAL-TIME TELEMETRY",
      desc: "Bidirectional WebSocket connection transmits live GPS coordinates, estimated arrival time, and route progress to all parties."
    },
    admin: {
      badge: "STEP 5: CENTRAL COMMAND",
      desc: "Admin and city dispatchers monitor live heatmaps, traffic signals, and hospital intake readiness for end-to-end oversight."
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      window.soundFX?.playClick();
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const key = node.getAttribute('data-node');
      const data = nodeData[key];
      if (data && detailsEl && badgeEl) {
        detailsEl.textContent = data.desc;
        badgeEl.textContent = data.badge;
      }
    });
  });
}

// Slide 5 Architecture Inspector Modal
function initArchitectureInspector() {
  const nodes = document.querySelectorAll('.arch-node');
  const modal = document.getElementById('tech-inspect-modal');
  const closeBtn = document.getElementById('close-tech-modal');
  const titleEl = document.getElementById('tech-inspect-title');
  const descEl = document.getElementById('tech-inspect-desc');
  const roleEl = document.getElementById('tech-inspect-role');

  const techInfo = {
    client: {
      title: "📱 Citizen Web/Mobile App (React & PWA)",
      role: "Client-Side Edge Interface",
      desc: "Lightweight progressive web app and mobile client with offline-first caching, background geolocation service workers, and one-tap emergency activation."
    },
    backend: {
      title: "🚀 Backend API (Node.js & Express)",
      role: "Central Orchestration Gateway",
      desc: "High-throughput asynchronous REST and WebSocket API cluster handling user authentication, incident queuing, telemetry routing, and multi-agency webhooks."
    },
    ai: {
      title: "✨ Gemini AI Engine & Computer Vision",
      role: "Multimodal Emergency Triage",
      desc: "Evaluates distress audio, victim photos, and incident descriptions. Predicts injury severity, detects duplicate reports within a 500m radius, and optimizes dispatch priority."
    },
    database: {
      title: "🍃 MongoDB & Geospatial Indexes",
      role: "Persistent Storage & Geo-Hashing",
      desc: "Utilizes 2dsphere indexes for ultra-fast spatial proximity queries ($near, $geoWithin) to identify responders within milliseconds."
    },
    maps: {
      title: "🗺️ Google Maps Directions & Traffic API",
      role: "Dynamic Real-Time Routing",
      desc: "Calculates live turn-by-turn routes taking into account real-time congestion, road closures, and emergency green-wave traffic corridors."
    },
    realtime: {
      title: "⚡ Socket.IO Real-Time Engine",
      role: "Bi-directional Pub/Sub Stream",
      desc: "Maintains persistent WebSockets for live vehicle telemetry updates, instant dispatch alerts, and live audio/video scene transmission."
    },
    responder: {
      title: "🚑 Responder Mobile Console",
      role: "Field First Responder App",
      desc: "Displays turn-by-turn navigation, patient triage notes, emergency scene photos, and quick one-tap status toggles (En Route, On Scene, Hospital Transport)."
    },
    admin: {
      title: "🖥️ City Admin Command Center",
      role: "Central Operations Dashboard",
      desc: "Offers city-wide situational awareness with dynamic incident heatmaps, fleet readiness gauges, automated dispatch audit trails, and post-incident analytics."
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      window.soundFX?.playClick();
      const key = node.getAttribute('data-tech');
      const data = techInfo[key];
      if (data && modal) {
        if (titleEl) titleEl.textContent = data.title;
        if (roleEl) roleEl.textContent = data.role;
        if (descEl) descEl.textContent = data.desc;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
}

// Scroll Navbar Highlights
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Simulated Live Alerts Ticker
function initLiveAlertTicker() {
  const incidents = [
    "🚨 Road Accident reported • Ring Road Jct • Ambulance AMB-102 dispatched",
    "📍 Sub-meter GPS locked • Madhapur Metro • Fire unit EN-04 assigned",
    "🤖 Gemini AI: Deduplicated 14 reports for Highway 44 spill • Resource waste prevented",
    "⏱ Average Response Time today: 4m 18s • 44% faster than municipal target",
    "🚑 Unit AMB-108: Patient delivered to Care Trauma ICU within 8m 30s"
  ];

  const tickerItem = document.getElementById('dynamic-live-feed');
  if (!tickerItem) return;

  let currentIdx = 0;
  setInterval(() => {
    currentIdx = (currentIdx + 1) % incidents.length;
    tickerItem.style.opacity = '0';
    setTimeout(() => {
      tickerItem.textContent = incidents[currentIdx];
      tickerItem.style.opacity = '1';
    }, 400);
  }, 6000);
}
