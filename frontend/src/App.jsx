import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import { AppContext } from './context/AppContext'

const App = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary-500 selection:text-white transition-colors duration-200">
      <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
      <Navbar />
      <main className="max-w-[1300px] mx-auto px-4 sm:px-8 md:px-10 pb-12">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App