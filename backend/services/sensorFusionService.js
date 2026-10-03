/**
 * ResQNet AI - Mobile Sensor Fusion Crash Detection Engine
 * Multi-sensor algorithm: Accelerometer + Gyroscope + GPS Velocity + Inactivity Filter
 */

class SensorFusionCrashEngine {
  /**
   * Evaluate raw telematics from mobile sensors
   * @param {Object} sensorData
   * @param {number} sensorData.impactG - Linear acceleration spike from accelerometer
   * @param {number} sensorData.preSpeedKmH - GPS speed 2 seconds before anomaly
   * @param {number} sensorData.currentSpeedKmH - Current GPS speed
   * @param {number} sensorData.gyroDeltaDeg - Combined pitch/roll/yaw rotation delta
   * @param {number} sensorData.inactivityDurationSec - Duration with motion < 0.1 m/s²
   */
  evaluatePossibleCrash(sensorData) {
    const {
      impactG = 0,
      preSpeedKmH = 0,
      currentSpeedKmH = 0,
      gyroDeltaDeg = 0,
      inactivityDurationSec = 0
    } = sensorData;

    let score = 0;
    const triggers = [];

    // Condition 1: High G-Force Impact Spike
    if (impactG >= 4.0) {
      score += 35;
      triggers.push(`High G-Force Impact (${impactG.toFixed(1)}G >= 4.0G threshold)`);
    } else if (impactG >= 2.5) {
      score += 15;
      triggers.push(`Moderate Acceleration Spike (${impactG.toFixed(1)}G)`);
    }

    // Condition 2: Sudden Deceleration (Speed Drop)
    const speedDrop = Math.max(0, preSpeedKmH - currentSpeedKmH);
    if (preSpeedKmH >= 35 && speedDrop >= 30) {
      score += 30;
      triggers.push(`Sudden GPS Deceleration (${preSpeedKmH} km/h -> ${currentSpeedKmH} km/h)`);
    }

    // Condition 3: Extreme Device Orientation Delta (Rollover / Tumble)
    if (gyroDeltaDeg >= 120) {
      score += 20;
      triggers.push(`Violent Device Rollover (${gyroDeltaDeg.toFixed(0)}° angular shift)`);
    } else if (gyroDeltaDeg >= 75) {
      score += 10;
      triggers.push(`Device Tumbling (${gyroDeltaDeg.toFixed(0)}° shift)`);
    }

    // Condition 4: Post-Impact Inactivity (Victim incapacitated / Vehicle stationary)
    if (inactivityDurationSec >= 5) {
      score += 15;
      triggers.push(`Post-Crash Inactivity (${inactivityDurationSec}s no motion detected)`);
    }

    const isPossibleAccident = score >= 60;

    return {
      isPossibleAccident,
      fusionScore: Math.min(100, score),
      triggers,
      recommendation: isPossibleAccident 
        ? "Display 60-Second Safety Confirmation Modal with Audio Warning" 
        : "Log minor bump in sensor calibration buffer"
    };
  }
}

module.exports = new SensorFusionCrashEngine();
