import React, { useState } from "react";
import { assets } from "../assets/assets";
import {
  FiUser,
  FiMail,
  FiEdit3,
  FiMessageSquare,
  FiPhoneCall,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiSend,
} from "react-icons/fi";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your message has been received. Our CarePulse team will contact you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* -------- Header -------- */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
          <FiMessageSquare className="w-3.5 h-3.5" /> Direct Patient Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Get in Touch with <span className="bg-gradient-to-r from-primary to-accent-mint bg-clip-text text-transparent">CarePulse</span>
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Have questions about booking appointments or need medical technical assistance? Our dedicated care team is available 24/7.
        </p>
      </div>

      {/* -------- Main Grid -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image (Shuffled to about_image) + Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-slate-200/80 dark:border-slate-800">
            <img
              className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              src={assets.about_image}
              alt="CarePulse Consultation Headquarters"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
              <div>
                <p className="text-white font-bold text-lg">CarePulse Diagnostic Wing</p>
                <p className="text-slate-300 text-xs mt-0.5">Accredited by International Healthcare Commission</p>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Office Information
            </h3>

            <div className="flex items-start gap-3.5 text-slate-600 dark:text-slate-300 text-sm">
              <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <FiMapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">CarePulse Medical HQ</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  54709 Willms Station, Suite 350<br />
                  Washington, DC 20001, USA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-slate-600 dark:text-slate-300 text-sm">
              <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <FiPhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Phone Inquiries</p>
                <a href="tel:+14155550132" className="text-xs text-primary hover:underline font-semibold">
                  (415) 555-0132
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-slate-600 dark:text-slate-300 text-sm">
              <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <FiMail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Email Assistance</p>
                <a href="mailto:support@carepulse.app" className="text-xs text-primary hover:underline font-semibold">
                  support@carepulse.app
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-slate-600 dark:text-slate-300 text-sm">
              <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <FiClock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Operating Hours</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Monday – Saturday: 8:00 AM – 9:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form & Callouts */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Send us a Message
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Fill out the form below and one of our patient care specialists will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <FiUser className="text-slate-400 dark:text-slate-500 shrink-0" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <FiMail className="text-slate-400 dark:text-slate-500 shrink-0" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Subject
                </label>
                <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <FiEdit3 className="text-slate-400 dark:text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Appointment / Care / Technical Support"
                    className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Message <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <FiMessageSquare className="text-slate-400 dark:text-slate-500 mt-1 shrink-0" />
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell our CarePulse specialists how we can help you..."
                    className="w-full text-sm outline-none bg-transparent resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-primary-700 hover:from-primary-600 hover:to-primary-800 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Info Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/40 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FiPhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Urgent Care Helpline
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    24/7 medical triage
                  </p>
                </div>
              </div>
              <p className="text-primary font-bold text-sm mt-3 group-hover:underline">
                +1 (800) 555-CARE
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/40 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-teal/10 text-accent-teal flex items-center justify-center">
                  <FiBriefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Careers at CarePulse
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    Join our doctor network
                  </p>
                </div>
              </div>
              <span className="inline-block text-xs font-semibold text-primary mt-3 group-hover:underline cursor-pointer">
                Explore Open Positions →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
