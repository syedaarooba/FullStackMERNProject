import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FiArrowRight } from 'react-icons/fi'

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <section className='flex flex-col items-center gap-4 my-16'>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-slate-800 text-primary dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                Top Rated
            </div>
            <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-center text-slate-900 dark:text-white'>
                Top Doctors to Book
            </h2>
            <p className='max-w-md text-center text-sm sm:text-base text-slate-500 dark:text-slate-400'>
                Book in-person or telehealth appointments with top specialists near you.
            </p>

            <div className='w-full grid grid-cols-auto gap-5 pt-8 px-1 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
                        className='group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between'
                        key={index}
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

            <button
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
                className='group mt-12 inline-flex items-center gap-2 px-9 py-3.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-bold shadow-sm hover:shadow-xl hover:border-primary-500/50 hover:bg-primary hover:text-white transition-all duration-300'
            >
                <span>View All Doctors</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </section>
    );
};

export default TopDoctors;