// Interactive Live SOS Simulator & Slide 6 Demo Player

// Demo Flow Steps (Slide 6)
const DEMO_STEPS = [
  {
    step: 1,
    title: "1. Road Accident Occurs",
    badge: "INCIDENT DETECTED",
    badgeColor: "var(--emergency-red)",
    desc: "A two-wheeler and sedan collision occurs at Jubilee Hills Checkpost. High risk of trauma injuries requiring immediate critical intervention within the Golden Hour.",
    telemetry: "LAT: 17.4325° N | LON: 78.4071° E | Time: 19:14:02",
    visual: `
      <div style="text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">💥🚗🏍️</div>
        <div style="color: var(--emergency-red); font-weight: 700; font-size: 1.1rem;">High Impact Collision Detected</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Jubilee Hills Rd No. 36 • Traffic Density: Moderate</div>
      </div>
    `
  },
  {
    step: 2,
    title: "2. Citizen Reports via ResQNet App",
    badge: "ONE-TAP SOS ACTIVATED",
    badgeColor: "var(--amber-warning)",
    desc: "A bystander citizen taps the One-Tap Emergency SOS button. The app captures live scene photo, emergency tags, and initiates instant uplink to ResQNet AI.",
    telemetry: "UPLINK: 4G/5G WebSocket | LATENCY: 24ms | USER_ID: CIT-9042",
    visual: `
      <div style="text-align: center;">
        <div class="animate-beacon" style="display:inline-block; width: 70px; height: 70px; border-radius: 50%; background: rgba(255, 51, 102, 0.25); border: 2px solid var(--emergency-red); line-height: 66px; font-size: 2rem;">🚨</div>
        <div style="color: #ffffff; font-weight: 700; margin-top: 0.75rem;">SOS Signal Transmitted</div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">Bystander audio & photo payload streaming...</div>
      </div>
    `
  },
  {
    step: 3,
    title: "3. GPS Auto-Captured Instantly",
    badge: "SUB-METER GEO-LOCK",
    badgeColor: "var(--cyan-primary)",
    desc: "Device GPS, cellular tower triangulation, and WiFi beacons pinpoint the exact location with 1.8-meter accuracy, bypassing verbal address errors.",
    telemetry: "COORDINATES: 17.432541, 78.407182 | ACCURACY: ±1.8m",
    visual: `
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">📍🛰️</div>
        <div style="color: var(--cyan-primary); font-weight: 700;">Geo-Lock Verified: Jubilee Hills Checkpost</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Zero verbal confusion • Automatic street & landmark tag</div>
      </div>
    `
  },
  {
    step: 4,
    title: "4. AI Classifies Emergency (Gemini AI)",
    badge: "GEMINI MULTIMODAL AI TRIAGE",
    badgeColor: "var(--purple-ai)",
    desc: "Gemini AI analyzes the incident description, photo, and voice tone. Classifies: Category: 'Severe Road Trauma' | Severity: 'CRITICAL (Level 1)'. Duplicate detector confirms no duplicate calls within 500m.",
    telemetry: "CONFIDENCE: 98.6% | DUP_CHECK: 0 DUPLICATES | SEVERITY: 94/100",
    visual: `
      <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 12px; padding: 1rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem; font-size: 0.85rem;">
          <span style="color: var(--purple-ai); font-weight: 700;">🤖 Gemini AI Triage</span>
          <span style="color: var(--emergency-red); font-weight: 800;">CRITICAL (LEVEL 1)</span>
        </div>
        <div style="font-size: 0.85rem; color: #e2e8f0; margin-bottom: 0.5rem;">Predicted: Blunt force trauma risk, immediate ALS ambulance + police traffic clearance needed.</div>
        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
          <div style="width: 94%; height: 100%; background: linear-gradient(90deg, #ffb800, #ff3366);"></div>
        </div>
      </div>
    `
  },
  {
    step: 5,
    title: "5. Nearest Ambulance Assigned Instantly",
    badge: "SMART DISPATCH ALGORITHM",
    badgeColor: "var(--emerald-success)",
    desc: "ResQNet's hyperlocal routing engine selects ALS Ambulance AMB-104 (Station 14, 1.2 km away) based on real-time GPS, crew readiness, and hospital proximity.",
    telemetry: "UNIT: AMB-104 (ALS) | DISTANCE: 1.2 KM | EST. DISPATCH: < 15s",
    visual: `
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🚑⚡</div>
        <div style="color: var(--emerald-success); font-weight: 700;">Ambulance AMB-104 Dispatched</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Crew: Paramedic Team Alpha • Equipment: ALS Defibrillator + Oxygen</div>
      </div>
    `
  },
  {
    step: 6,
    title: "6. Responder Navigates via Real-Time Route",
    badge: "DYNAMIC TRAFFIC ROUTING",
    badgeColor: "var(--cyan-primary)",
    desc: "Ambulance dashboard receives direct route navigation with live congestion avoidance and pre-cleared corridor recommendations via Google Maps API.",
    telemetry: "ESTIMATED ETA: 3 MIN 40 SEC | CORRIDOR: Green Wave Active",
    visual: `
      <div style="display:flex; align-items:center; justify-content:space-around; padding: 0.5rem 0;">
        <div style="text-align:center;">
          <span style="font-size: 1.8rem;">🏥</span>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Station 14</div>
        </div>
        <div style="flex:1; margin: 0 1rem; position:relative;">
          <div style="height: 4px; background: var(--cyan-primary); border-radius: 2px; box-shadow: 0 0 10px var(--cyan-primary);"></div>
          <span style="position:absolute; top: -14px; left: 50%; font-size: 1.2rem;">🚑</span>
        </div>
        <div style="text-align:center;">
          <span style="font-size: 1.8rem;">📍</span>
          <div style="font-size: 0.75rem; color: var(--emergency-red); font-weight:700;">Scene (1.2 km)</div>
        </div>
      </div>
      <div style="text-align:center; font-size: 0.85rem; color: var(--cyan-primary); font-family: var(--font-mono); margin-top: 0.5rem;">ETA: 03m 40s • SPEED: 62 KM/H</div>
    `
  },
  {
    step: 7,
    title: "7. Live Tracking & Citizen Telemetry",
    badge: "BIDIRECTIONAL WEBSOCKETS",
    badgeColor: "var(--blue-accent)",
    desc: "Both the reporting citizen and city admin command center track the ambulance's live GPS movement in real-time, removing anxiety and enabling hospital pre-admit.",
    telemetry: "SOCKET: IO_STREAM_LIVE | PING: 18ms | STATUS: ON SCENE",
    visual: `
      <div style="text-align:center;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">📡📱</div>
        <div style="color: var(--blue-accent); font-weight: 700;">Live Telemetry Stream Synced</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Citizen App, Responder Tablet & City Command in complete sync.</div>
      </div>
    `
  },
  {
    step: 8,
    title: "8. Golden Hour Saved & Incident Resolved",
    badge: "MISSION SUCCESS",
    badgeColor: "var(--emerald-success)",
    desc: "Paramedics stabilize the patient at the scene and transfer them to Care Hospital Trauma ICU within 9 minutes total. Golden Hour preserved, casualty prevented.",
    telemetry: "TOTAL RESPONSE TIME: 4m 12s (45% FASTER THAN CITY BENCHMARK)",
    visual: `
      <div style="text-align: center; background: rgba(0, 230, 118, 0.1); border: 1px solid rgba(0, 230, 118, 0.4); border-radius: 12px; padding: 1.25rem;">
        <div style="font-size: 3rem; margin-bottom: 0.25rem;">❤️‍🩹🎉</div>
        <div style="color: var(--emerald-success); font-weight: 800; font-size: 1.2rem;">Patient Stabilized & Admitted</div>
        <div style="font-size: 0.9rem; color: #ffffff; margin-top: 0.25rem;">Golden Hour Met: 4m 12s Response Time vs 14m City Avg</div>
      </div>
    `
  }
];

class DemoPlayer {
  constructor() {
    this.currentStep = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    this.renderStep(0);
    this.bindEvents();
  }

  bindEvents() {
    const prevBtn = document.getElementById('demo-prev-btn');
    const nextBtn = document.getElementById('demo-next-btn');
    const autoPlayBtn = document.getElementById('demo-autoplay-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.prevStep();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.nextStep();
      });
    }

    if (autoPlayBtn) {
      autoPlayBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.toggleAutoPlay();
      });
    }

    // Step clicks
    document.querySelectorAll('.timeline-step').forEach((el, idx) => {
      el.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.goToStep(idx);
      });
    });
  }

  renderStep(index) {
    this.currentStep = index;
    const stepData = DEMO_STEPS[index];
    if (!stepData) return;

    // Update screen info
    const titleEl = document.getElementById('demo-step-title');
    const descEl = document.getElementById('demo-step-desc');
    const badgeEl = document.getElementById('demo-step-badge');
    const telemetryEl = document.getElementById('demo-step-telemetry');
    const visualEl = document.getElementById('demo-step-visual');

    if (titleEl) titleEl.textContent = stepData.title;
    if (descEl) descEl.textContent = stepData.desc;
    if (badgeEl) {
      badgeEl.textContent = stepData.badge;
      badgeEl.style.color = stepData.badgeColor;
      badgeEl.style.borderColor = stepData.badgeColor;
    }
    if (telemetryEl) telemetryEl.textContent = stepData.telemetry;
    if (visualEl) visualEl.innerHTML = stepData.visual;

    // Update timeline indicator states
    document.querySelectorAll('.timeline-step').forEach((el, idx) => {
      el.classList.remove('active', 'completed');
      if (idx === index) {
        el.classList.add('active');
      } else if (idx < index) {
        el.classList.add('completed');
      }
    });

    if (index === 7) {
      window.soundFX?.playSuccess();
    } else if (index === 0 || index === 1) {
      window.soundFX?.playEmergencyAlert();
    } else {
      window.soundFX?.playRadarBeep();
    }
  }

  nextStep() {
    if (this.currentStep < DEMO_STEPS.length - 1) {
      this.renderStep(this.currentStep + 1);
    } else {
      this.renderStep(0);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.renderStep(this.currentStep - 1);
    }
  }

  goToStep(idx) {
    this.renderStep(idx);
  }

  toggleAutoPlay() {
    const btn = document.getElementById('demo-autoplay-btn');
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      if (btn) btn.innerHTML = '▶ Auto Play';
    } else {
      if (btn) btn.innerHTML = '⏸ Pause';
      this.autoPlayInterval = setInterval(() => {
        this.nextStep();
      }, 3500);
    }
  }
}

// Interactive SOS Simulation Modal Handler
class SOSSimulator {
  constructor() {
    this.modal = document.getElementById('sos-modal');
    this.isTriggered = false;
    this.bindEvents();
  }

  bindEvents() {
    const triggerBtns = document.querySelectorAll('.trigger-sos-btn');
    const closeBtn = document.getElementById('close-sos-modal');
    const executeBtn = document.getElementById('execute-sos-btn');
    const cancelBtn = document.getElementById('cancel-sos-btn');

    triggerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundFX?.playEmergencyAlert();
        this.openModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        window.soundFX?.playClick();
        this.resetState();
      });
    }

    if (executeBtn) {
      executeBtn.addEventListener('click', () => {
        this.runSOSSequence();
      });
    }

    // Modal background click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.classList.add('active');
      this.resetState();
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
  }

  resetState() {
    const prepView = document.getElementById('sos-prep-view');
    const runningView = document.getElementById('sos-running-view');
    if (prepView) prepView.style.display = 'block';
    if (runningView) runningView.style.display = 'none';
  }

  runSOSSequence() {
    window.soundFX?.playEmergencyAlert();
    const prepView = document.getElementById('sos-prep-view');
    const runningView = document.getElementById('sos-running-view');
    
    if (prepView) prepView.style.display = 'none';
    if (runningView) runningView.style.display = 'block';

    const statusTitle = document.getElementById('sos-status-title');
    const statusDesc = document.getElementById('sos-status-desc');
    const aiBox = document.getElementById('sos-ai-results');

    if (statusTitle) statusTitle.textContent = "📍 Acquiring Precision GPS & Uplinking...";
    if (statusDesc) statusDesc.textContent = "Connecting to nearest satellite telemetry & WiFi beacon nodes...";
    if (aiBox) aiBox.style.display = 'none';

    setTimeout(() => {
      window.soundFX?.playRadarBeep();
      if (statusTitle) statusTitle.textContent = "🤖 Gemini AI Multimodal Triage in Progress...";
      if (statusDesc) statusDesc.textContent = "Analyzing incident severity, audio distress level, and image data...";
    }, 1500);

    setTimeout(() => {
      window.soundFX?.playSuccess();
      if (statusTitle) statusTitle.textContent = "🚑 Responder Dispatched: Unit AMB-104 En Route!";
      if (statusDesc) statusDesc.textContent = "ALS Ambulance dispatched with 3m 40s ETA. City Traffic Preemption Enabled.";
      if (aiBox) aiBox.style.display = 'block';
    }, 3200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.demoPlayer = new DemoPlayer();
  window.sosSimulator = new SOSSimulator();
});
