import React from 'react'
import { assets } from '../assets/assets'
import { FiZap, FiShield, FiHeart } from 'react-icons/fi'

const About = () => {
  const features = [
    {
      icon: FiZap,
      title: "EFFICIENCY",
      desc: "Streamlined online appointment booking that seamlessly fits into your busy schedule with zero wait time."
    },
    {
      icon: FiShield,
      title: "CONVENIENCE",
      desc: "Direct access to a verified network of certified healthcare professionals right in your community."
    },
    {
      icon: FiHeart,
      title: "PERSONALIZATION",
      desc: "Tailored doctor suggestions, booking reminders, and comprehensive profile tracking for your long-term wellness."
    }
  ];

  return (
    <div className='py-6 sm:py-10 space-y-16'>

      {/* Header */}
      <div className='text-center max-w-xl mx-auto space-y-2'>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-indigo-400">
          Who We Are
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
          About <span className="text-primary dark:text-indigo-400">Prescripto</span>
        </h1>
        <p className='text-sm sm:text-base text-slate-500 dark:text-slate-400'>
          Empowering patients and certified healthcare providers through modern digital medicine.
        </p>
      </div>

      {/* Main Story Grid */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-10 items-center'>
        <div className='md:col-span-5'>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl -z-10"></div>
            <img
              className='w-full rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 object-cover'
              src={assets.about_image}
              alt="Prescripto Team"
            />
          </div>
        </div>

        <div className='md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed'>
          <p>
            Welcome to <span className="font-bold text-slate-900 dark:text-white">Prescripto</span>, your trusted medical companion for managing appointments, scheduling consultations, and maintaining wellness efficiently.
          </p>
          <p>
            We understand the challenges patients face when navigating healthcare appointments. Prescripto bridges the gap between top-tier medical doctors and patients, providing instantaneous scheduling, verified doctor profiles, and clear communication.
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h3 className='text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2'>Our Mission</h3>
            <p>
              To make quality medical care accessible to everyone, anywhere, anytime through intelligent technology and human-centric design.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='space-y-8'>
        <div className='text-center space-y-1.5'>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-indigo-400">
            Our Advantage
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
            Why Choose Prescripto
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {features.map((item, idx) => (
            <div
              key={idx}
              className='group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary-500/50 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between'
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-slate-800 text-primary dark:text-indigo-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
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
  )
}

export default About

