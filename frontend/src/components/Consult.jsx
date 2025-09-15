import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiMinus } from "react-icons/fi";
import VantaNetBackground from '../components/background/VantaNetBackground'

const therapists = [
  { name: "Dr. Priya Sharma", specialization: "Physiotherapist", experience: "5 years experience", image: "https://randomuser.me/api/portraits/women/44.jpg", tag: "Available Now" },
  { name: "Mr. Rohan Verma", specialization: "Mental Health Therapist", experience: "7 years experience", image: "https://randomuser.me/api/portraits/men/32.jpg", tag: "Popular" },
  { name: "Dr. Anjali Mehta", specialization: "Child Psychologist", experience: "6 years experience", image: "https://randomuser.me/api/portraits/women/68.jpg", tag: "Highly Recommended" },
  { name: "Mr. Arjun Khanna", specialization: "Rehabilitation Specialist", experience: "9 years experience", image: "https://randomuser.me/api/portraits/men/77.jpg", tag: "Top Rated" },
];

const faqs = [
  { question: "How do I book an appointment?", answer: "Select your preferred therapist, fill out your details, and click submit. You'll receive confirmation instantly." },
  { question: "Can I cancel or reschedule my appointment?", answer: "Yes, you can easily cancel or reschedule your appointment anytime before the scheduled date." },
  { question: "Are my sessions confidential?", answer: "Absolutely. All information and therapy sessions are 100% private and secure." },
  { question: "Do you offer emergency consultations?", answer: "Yes, some therapists are available for same-day emergency sessions. Please check their availability." },
];

export default function TherapistPage() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  const [appointments, setAppointments] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [supportPopup, setSupportPopup] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("https://sih-prototype-backend-hqt8.onrender.com/api/me", { withCredentials: true });
        const data = res.data.user?.appointments || [];
        setAppointments(data);
        localStorage.setItem("appointments", JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }
    };

    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));

    fetchAppointments();
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const toggleForm = (therapistName) => {
    setSelectedTherapist(therapistName === selectedTherapist ? null : therapistName);
    setFormData({ name: "", email: "", date: "" });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://sih-prototype-backend-hqt8.onrender.com/api/appointment",
        { therapist: selectedTherapist, ...formData },
        { withCredentials: true }
      );
      if (res.data.success) {
        const updated = await axios.get("https://sih-prototype-backend-hqt8.onrender.com/api/me", { withCredentials: true });
        const data = updated.data.user?.appointments || [];
        setAppointments(data);
        setSelectedTherapist(null);
        setFormData({ name: "", email: "", date: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const res = await axios.put(
        `https://sih-prototype-backend-hqt8.onrender.com/api/appointment/${appointmentId}/cancel`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setAppointments(prev => prev.filter(a => a._id !== appointmentId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReschedule = async (appointmentId) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    if (!newDate) return;
    try {
      const res = await axios.put(
        `https://sih-prototype-backend-hqt8.onrender.com/api/appointment/${appointmentId}/reschedule`,
        { date: newDate },
        { withCredentials: true }
      );
      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className=" min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[40vh] flex items-center justify-center overflow-hidden">
        <VantaNetBackground />
        <div className="absolute inset-0 "></div>
        <div className="absolute text-center px-6 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Find the Right Therapist for You
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-lg">
            Book appointments with certified therapists and take your first step towards a healthier mind & body.
          </p>
          
        </div>
      </div>

      {/* Therapist Cards */}
      <div className="px-6 md:px-16 py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Available Therapists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {therapists.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
              <span className="text-sm text-gray-500">{t.specialization}</span>
              <p className="text-gray-500 text-sm mt-2">{t.experience}</p>
              <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{t.tag}</span>
              <button onClick={() => toggleForm(t.name)} className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Book Appointment</button>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        {selectedTherapist && (
          <div className="mt-8 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book Appointment with {selectedTherapist}</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
              <label className="block mb-2 text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
              <label className="block mb-2 text-gray-700">Preferred Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
              <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Submit</button>
            </form>
          </div>
        )}

        {/* Appointments */}
        <div className="mt-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            <div className="max-h-[18rem] overflow-y-auto rounded-3xl bg-white/50 backdrop-blur-md p-2 shadow-lg shadow-gray-300 scrollbar-none">
              <ul className="space-y-3">
                {appointments.map(a => a?._id && (
                  <li key={a._id} className="p-4 bg-white rounded-2xl shadow-md flex justify-between items-center transition hover:shadow-2xl">
                    <div>
                      <p className="font-semibold text-gray-800">{a.therapist}</p>
                      <p className="text-sm text-gray-500">{a.date?.slice(0, 10)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${a.status === "Pending" ? "bg-yellow-100 text-yellow-600" : a.status === "Confirmed" ? "bg-green-100 text-green-600" : a.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>{a.status}</span>
                      {a.status !== "Cancelled" && <>
                        <button onClick={() => handleReschedule(a._id)} className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition">Reschedule</button>
                        <button onClick={() => handleCancel(a._id)} className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition">Cancel</button>
                      </>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 md:px-16 py-16 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl shadow cursor-pointer" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-700">{faq.question}</h4>
                {openFAQ === i ? <FiMinus className="text-gray-600" /> : <FiPlus className="text-gray-600" />}
              </div>
              {openFAQ === i && <p className="mt-3 text-gray-500 text-sm">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="px-6 md:px-16 py-16 text-center bg-gradient-to-r from-blue-50 to-green-50">
        <h3 className="font-bold text-2xl mb-3 text-gray-800">Need More Support?</h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">Connect with professional counselors and peer support groups in your area.</p>
        <div className="flex flex-wrap justify-center gap-5">
          {["Find Local Services", "Join Support Groups"].map((btn, i) => (
            <button
              key={i}
              className={`px-6 py-3 rounded-xl shadow text-white font-medium transition hover:scale-105 ${btn === "Find Local Services" ? "bg-blue-600" : "bg-green-600"}`}
              onClick={() => setSupportPopup(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Support Modal */}
      {supportPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSupportPopup(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">{supportPopup}</h2>
            <p className="text-gray-700">This feature is not updated yet.</p>
          </div>
        </div>
      )}
    </section>
  );
}
