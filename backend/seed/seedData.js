const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const Responder = require('../models/Responder');
const Incident = require('../models/Incident');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resqnet_db');
    console.log('[Seed] Connected to database');

    await User.deleteMany({});
    await Responder.deleteMany({});
    await Incident.deleteMany({});

    // Seed Citizens & Admin
    const citizen = await User.create({
      name: 'Rahul Sharma',
      phone: '+91 98480 22338',
      role: 'CITIZEN',
      bloodGroup: 'O+',
      medicalNotes: 'Asthmatic, Penicillin allergy',
      emergencyContacts: [
        { name: 'Sunita Sharma (Mother)', phone: '+91 94400 11223', relationship: 'Mother' },
        { name: 'Dr. Srinivas (Physician)', phone: '+91 98490 33445', relationship: 'Doctor' }
      ]
    });

    // Seed Responders (Ambulance, Police, Fire)
    const responders = await Responder.insertMany([
      {
        responderCode: 'AMB-104',
        name: 'ALS Trauma Ambulance 104',
        type: 'Ambulance',
        subType: 'ALS (Advanced Life Support)',
        phone: '+91 98480 99104',
        status: 'Available',
        location: { type: 'Point', coordinates: [78.3920, 17.4435] },
        equipment: ['Defibrillator', 'Ventilator', 'Cervical Collar', 'Oxygen Cylinder'],
        stationName: 'Jubilee Hills Emergency Hub'
      },
      {
        responderCode: 'AMB-108',
        name: 'BLS Rapid Ambulance 108',
        type: 'Ambulance',
        subType: 'BLS (Basic Life Support)',
        phone: '+91 98480 99108',
        status: 'Available',
        location: { type: 'Point', coordinates: [78.3750, 17.4490] },
        equipment: ['Stretcher', 'Basic First Aid', 'Oxygen'],
        stationName: 'Madhapur First Care Center'
      },
      {
        responderCode: 'POL-201',
        name: 'Traffic Police Interceptor 201',
        type: 'Police',
        phone: '+91 98480 99201',
        status: 'Available',
        location: { type: 'Point', coordinates: [78.4120, 17.4280] },
        stationName: 'Banjara Hills Police Station'
      },
      {
        responderCode: 'FIRE-301',
        name: 'Rapid Fire Tender 301',
        type: 'Fire Department',
        phone: '+91 98480 99301',
        status: 'Available',
        location: { type: 'Point', coordinates: [78.4200, 17.4350] },
        equipment: ['Water Mist Gun', 'Hydraulic Cutter', 'Smoke Ejector'],
        stationName: 'Panjagutta Fire Station'
      }
    ]);

    // Seed Initial Active Incident
    await Incident.create({
      reporter: citizen._id,
      reporterName: citizen.name,
      reporterPhone: citizen.phone,
      description: 'Person unconscious after high velocity bike collision at Jubilee Hills checkpost.',
      location: {
        type: 'Point',
        coordinates: [78.4071, 17.4325],
        address: 'Jubilee Hills Road 36, Hyderabad'
      },
      aiClassification: {
        category: 'Road Accident',
        severity: 'Critical',
        confidenceScore: 98,
        suggestedResponder: 'Ambulance',
        rawGeminiExplanation: 'Gemini AI: Detected severe trauma risk and unconscious casualty. ALS unit dispatched immediately.'
      },
      assignedUnitCode: 'AMB-104',
      status: 'Assigned'
    });

    console.log('[Seed] Database seeded with citizens, responders, and incidents successfully!');
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error:', err);
    process.exit(1);
  }
};

seedData();
