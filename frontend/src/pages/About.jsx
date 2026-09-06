import React from 'react';
import { assets } from '../assets/assets';
import { FiZap, FiShield, FiHeart, FiAward, FiUsers } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: FiZap,
      title: "INSTANT ACCESS",
      desc: "Fast, automated online scheduling that fits directly into your daily routine with real-time confirmation."
    },
    {
      icon: FiShield,
      title: "CERTIFIED CLINICIANS",
      desc: "Direct access to top-credentialed medical specialists and clinics rigorously vetted for patient safety."
    },
    {
      icon: FiHeart,
      title: "HOLISTIC CARE",
      desc: "Comprehensive health profiles, appointment records, and personalized care recommendations."
    }
  ];

  return (
    <div className='py-6 sm:py-10 space-y-16'>

      {/* Header */}
      <div className='text-center max-w-xl mx-auto space-y-2'>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-accent-mint">
          Our Purpose
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
          About <span className="text-primary dark:text-accent-mint">CarePulse</span>
        </h1>
        <p className='text-sm sm:text-base text-slate-500 dark:text-slate-400'>
          Redefining digital healthcare through trusted physician networks and effortless appointment booking.
        </p>
      </div>

      {/* Main Story Grid (Shuffled to contact_image with floating stats) */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-10 items-center'>
        <div className='md:col-span-5'>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl -z-10 group-hover:bg-primary/30 transition-colors"></div>
            <img
              className='w-full rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 object-cover h-80 sm:h-96'
              src={assets.contact_image}
              alt="CarePulse Medical Center"
            />
            {/* Floating Metric Badge */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FiAward className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">99.4%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        <div className='md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed'>
          <p>
            Welcome to <span className="font-bold text-slate-900 dark:text-white">CarePulse</span>, your modern healthcare companion designed to make scheduling doctor consultations as effortless as possible.
          </p>
          <p>
            We believe that scheduling care shouldn't come with long waiting queues or friction. CarePulse bridges top medical minds with patients in need, featuring real-time calendar availability, instant confirmations, and secure patient portals.
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h3 className='text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2'>Our Mission</h3>
            <p>
              To democratize access to world-class healthcare by uniting compassionate doctors and patients on an intuitive, patient-centered digital health platform.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='space-y-8'>
        <div className='text-center space-y-1.5'>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-accent-mint">
            Why Patients Trust Us
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
            The CarePulse Standard
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {features.map((item, idx) => (
            <div
              key={idx}
              className='group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary-500/50 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between'
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-slate-800 text-primary dark:text-accent-mint flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <item.icon />
                </div>
                <h3 className='font-bold text-lg text-slate-900 dark:text-white tracking-tight'>
                  {item.title}
                </h3>
                <p className='text-slate-500 dark:text-slate-400 text-sm leading-relaxed'>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
