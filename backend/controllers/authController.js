const User = require('../models/User');
const jwt = require('jsonwebtoken');

// OTP Storage Map for simulated or Twilio/Firebase verification
const otpStore = new Map();

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    console.log(`[Auth] OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully to mobile device',
      demoOtp: otp // Included for easy hackathon testing
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp, name, role = 'CITIZEN' } = req.body;
    
    // Check master bypass OTP '123456' or generated OTP
    const record = otpStore.get(phone);
    const isValid = otp === '123456' || (record && record.otp === otp);

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        phone,
        name: name || 'Emergency Citizen',
        role,
        emergencyContacts: [
          { name: 'Dr. Suresh (Family Doc)', phone: '+91 98480 11223', relationship: 'Doctor' },
          { name: 'Ananya (Spouse)', phone: '+91 94400 55667', relationship: 'Spouse' }
        ]
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, phone: user.phone },
      process.env.JWT_SECRET || 'resqnet_secret',
      { expiresIn: '30d' }
    );

    otpStore.delete(phone);

    res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id || req.query.userId);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.body.userId, req.body, { new: true });
    res.json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
