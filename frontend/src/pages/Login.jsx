import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[75vh] flex items-center justify-center py-10'>
      <div className='w-full max-w-md'>
        
        {/* Form Container */}
        <form
          onSubmit={onSubmitHandler}
          className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6'
        >
          {/* Header */}
          <div className='text-center space-y-2'>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary dark:text-accent-mint">
              CarePulse Patient Portal
            </span>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
              {state === 'Sign Up' ? 'Create an Account' : 'Welcome Back'}
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
              {state === 'Sign Up' 
                ? 'Sign up in seconds to schedule medical appointments' 
                : 'Log in to view your appointments and records'}
            </p>
          </div>

          {/* Segmented Tab Switch */}
          <div className='flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60'>
            <button
              type='button'
              onClick={() => setState('Sign Up')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                state === 'Sign Up'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
            <button
              type='button'
              onClick={() => setState('Login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                state === 'Login'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Log In
            </button>
          </div>

          <div className='space-y-4'>
            {state === 'Sign Up' && (
              <div className='space-y-1.5'>
                <label className='text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider'>
                  Full Name
                </label>
                <div className='relative flex items-center'>
                  <FiUser className='absolute left-3.5 text-slate-400' />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='John Doe'
                    className='w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition'
                    type='text'
                    required
                  />
                </div>
              </div>
            )}

            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider'>
                Email Address
              </label>
              <div className='relative flex items-center'>
                <FiMail className='absolute left-3.5 text-slate-400' />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='name@example.com'
                  className='w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition'
                  type='email'
                  required
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider'>
                Password
              </label>
              <div className='relative flex items-center'>
                <FiLock className='absolute left-3.5 text-slate-400' />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='••••••••'
                  className='w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition'
                  type='password'
                  required
                />
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-teal-600 hover:from-primary-600 hover:to-teal-700 text-white py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-glow active:scale-95 transition-all duration-200'
          >
            <span>{state === 'Sign Up' ? 'Create Account' : 'Sign In'}</span>
            <FiArrowRight className='group-hover:translate-x-1 transition-transform' />
          </button>

          <p className='text-center text-xs text-slate-500 dark:text-slate-400'>
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Login')}
                  className='text-primary dark:text-accent-mint font-bold hover:underline cursor-pointer'
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className='text-primary dark:text-accent-mint font-bold hover:underline cursor-pointer'
                >
                  Create one now
                </span>
              </>
            )}
          </p>
        </form>

      </div>
    </div>
  )
}

export default Login