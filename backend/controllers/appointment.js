import User from "../models/user.model.js";

// Add Appointment
export const addAppointment = async (req, res) => {
  try {
    const { therapist, name, email, date } = req.body;
    const user = await User.findById(req.user.id);

    user.appointments = user.appointments || [];
    user.appointments.push({ therapist, name, email, date, status: "Pending" });
    await user.save();

    res.json({ success: true, appointments: user.appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const appointment = user.appointments.id(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "Cancelled";
    await user.save();

    res.json({ success: true, appointments: user.appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Reschedule Appointment
export const rescheduleAppointment = async (req, res) => {
  try {
    const { date } = req.body;
    const user = await User.findById(req.user.id);
    const appointment = user.appointments.id(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.date = date;
    appointment.status = "Pending"; // reset status if needed
    await user.save();

    res.json({ success: true, appointments: user.appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
