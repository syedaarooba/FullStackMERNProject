import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { doctors as defaultDoctors } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Theme state with localStorage persistence
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [doctors, setDoctors] = useState(defaultDoctors || []);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(false);

    // Apply dark class to document root
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Getting Doctors using API
    const getDoctosData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success && data.doctors && data.doctors.length > 0) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log("Could not fetch API doctors, using local data fallback", error);
        }
    };

    // Getting User Profile using API
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctosData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);

    const value = {
        doctors, getDoctosData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData,
        theme, setTheme, toggleTheme
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );

};

export default AppContextProvider;