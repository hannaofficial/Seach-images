import React from 'react'
import { useGlobalContext } from './context'
import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs'

const ThemeToggle = () => {

    const {isDarkTheme,toggleTheme}  = useGlobalContext()
    

   
  return (
    <section className='toggle-container'>
        
        <button className='dark-toggle' onClick={toggleTheme}>
        
         { isDarkTheme?  <BsFillSunFill className='toggle-icon' style={{color:'white'}}/>:<BsFillMoonFill className={`toggle-icon`} />}
            


        </button>

    </section>
  )
}

export default ThemeToggle
