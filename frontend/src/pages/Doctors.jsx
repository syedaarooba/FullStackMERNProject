import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { FiFilter, FiX } from 'react-icons/fi'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='py-6 sm:py-8'>
      {/* Header Banner */}
      <div className='mb-8'>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-indigo-400 mb-1">
          Specialists Directory
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
          Find & Book Top Doctors
        </h1>
        <p className='text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5'>
          Filter by medical department or browse our complete network of verified physicians.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row items-start gap-8'>
        
        {/* Mobile Filter Toggle */}
        <div className="w-full flex items-center justify-between lg:hidden mb-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
              showFilter
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-sm'
            }`}
          >
            {showFilter ? <FiX /> : <FiFilter />}
            <span>{showFilter ? 'Close Filters' : 'Filter by Speciality'}</span>
          </button>
          
          {speciality && (
            <button
              onClick={() => navigate('/doctors')}
              className="text-xs font-semibold text-rose-500 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Filter Sidebar */}
        <aside
          className={`w-full lg:w-64 flex-col gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm ${
            showFilter ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Department
            </span>
            {speciality && (
              <span
                onClick={() => navigate('/doctors')}
                className="text-xs font-semibold text-primary dark:text-indigo-400 cursor-pointer hover:underline"
              >
                Reset
              </span>
            )}
          </div>

          <p
            onClick={() => navigate('/doctors')}
            className={`px-4 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer transition-all duration-200 ${
              !speciality
                ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            All Specialities
          </p>

          {specialities.map((spec, idx) => (
            <p
              key={idx}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`px-4 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer transition-all duration-200 ${
                speciality === spec
                  ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {spec}
            </p>
          ))}
        </aside>

        {/* Doctor Grid */}
        <div className='flex-1 w-full'>
          {filterDoc.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-700 dark:text-slate-300 font-semibold text-lg">No doctors found</p>
              <p className="text-slate-400 text-sm mt-1">Try selecting a different speciality filter above.</p>
            </div>
          ) : (
            <div className='grid grid-cols-auto gap-5'>
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
                  className='group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between'
                >
                  <div className='bg-gradient-to-b from-indigo-50/60 to-slate-100/60 dark:from-slate-800 dark:to-slate-800/60 overflow-hidden flex items-center justify-center relative'>
                    <img
                      className='w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500'
                      src={item.image}
                      alt={item.name}
                    />
                    {item.experience && (
                      <span className="absolute top-3 right-3 text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-700 dark:text-slate-300 shadow-sm">
                        {item.experience}
                      </span>
                    )}
                  </div>

                  <div className='p-5 flex flex-col gap-2'>
                    <div className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
                      item.available
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      <span className="relative flex h-2 w-2">
                        {item.available && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      </span>
                      <span>{item.available ? 'Available' : 'Unavailable'}</span>
                    </div>

                    <h3 className='text-slate-900 dark:text-white text-lg font-bold group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors duration-200 mt-1'>
                      {item.name}
                    </h3>
                    <p className='text-primary dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider'>
                      {item.speciality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors