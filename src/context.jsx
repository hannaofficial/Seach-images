import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext();

const getInitialDarkMode = ()=>{
    const preferedMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
    const storedDarkMode = localStorage.getItem('darkTheme')
    if (storedDarkMode){
        if(storedDarkMode == 'true'){
            return true
        }else{
            return false
        }
    }
    return preferedMode
}

export const AppProvider = ({children})=>{

    const [isDarkTheme, setDarkTheme] = useState(getInitialDarkMode())

    const [searchTerm, setSearchTerm] = useState('cute dog')

    const [pgNum, setPgNum] = useState(1)

    const toggleTheme = ()=>{
        const newDarkTheme = !isDarkTheme
        setDarkTheme(newDarkTheme)
        const body = document.querySelector('body');
        body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('darkTheme', newDarkTheme)
        
    }

    useEffect(()=>{
        document.body.classList.toggle('dark-theme', isDarkTheme) 
    },[])

    return <AppContext.Provider value={{isDarkTheme,toggleTheme, searchTerm, setSearchTerm, pgNum,setPgNum}}>{children}</AppContext.Provider>

}

export const useGlobalContext = () => useContext(AppContext);