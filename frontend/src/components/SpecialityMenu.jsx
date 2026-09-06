import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='flex flex-col items-center gap-4 py-16 text-slate-800 dark:text-slate-100'>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-slate-800 text-primary dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                Explore Care
            </div>
            <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-center text-slate-900 dark:text-white'>
                Find by Speciality
            </h2>
            <p className='max-w-md text-center text-sm sm:text-base text-slate-500 dark:text-slate-400'>
                Browse our extensive network of verified healthcare professionals tailored to your medical needs.
            </p>
            
            <div className='flex sm:justify-center gap-4 pt-6 pb-2 w-full overflow-x-auto hide-scroll px-2'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className='group flex flex-col items-center flex-shrink-0 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-2 transition-all duration-300 min-w-[125px] sm:min-w-[145px] text-center'
                        key={index}
                    >
                        <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-50/70 dark:bg-slate-800/80 p-3 mb-3 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-100/70 dark:group-hover:bg-slate-700/80 transition-all duration-300'>
                            <img className='w-full h-full object-contain' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors duration-200'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default SpecialityMenu