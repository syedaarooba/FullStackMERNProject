import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    if (relDoc.length === 0) return null;

    return (
        <section className='flex flex-col items-center gap-4 my-16'>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-slate-800 text-primary dark:text-accent-mint text-xs font-bold uppercase tracking-wider">
                Recommendations
            </div>
            <h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-center text-slate-900 dark:text-white'>
                Related Doctors
            </h2>
            <p className='max-w-md text-center text-sm text-slate-500 dark:text-slate-400'>
                Other certified specialists available in {speciality}.
            </p>

            <div className='w-full grid grid-cols-auto gap-5 pt-8 px-1 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
                        className='group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary-500/40 dark:hover:border-primary-500/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between'
                        key={index}
                    >
                        <div className='bg-gradient-to-b from-emerald-50/60 to-slate-100/60 dark:from-slate-800 dark:to-slate-800/60 overflow-hidden flex items-center justify-center relative'>
                            <img
                                className='w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500'
                                src={item.image}
                                alt={item.name}
                            />
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

                            <h3 className='text-slate-900 dark:text-white text-lg font-bold group-hover:text-primary dark:group-hover:text-accent-mint transition-colors duration-200 mt-1'>
                                {item.name}
                            </h3>
                            <p className='text-primary dark:text-accent-mint text-xs font-semibold uppercase tracking-wider'>
                                {item.speciality}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedDoctors;