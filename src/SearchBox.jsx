import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useGlobalContext } from './context';
import { MdOutlineScreenSearchDesktop } from "react-icons/md";


const SearchBox = () => {

  const {isDarkTheme,searchTerm, setSearchTerm, setPgNum}  = useGlobalContext()

    const handleSubmit = (e)=>{
        e.preventDefault()
        const searchValue = e.target.elements.search.value
        setPgNum(1)
        
        
        if(!searchValue) return
        setSearchTerm(searchValue)
        
        
    }
    
  return (
    <section>
        
        <h1 className='title'><MdOutlineScreenSearchDesktop/> Search Image</h1>
        
        <form className='search-form'  onSubmit={handleSubmit}>
            <input type='text' name='search' className='form-input search-input'   placeholder='Ex: Dog' />
            <button type='submit' className={isDarkTheme?'btn btn-dark':'btn'} ><CiSearch style={{fontSize:'18', color:isDarkTheme?'white':'black', transition:'color 0.3s ease-in-out'}}/></button>
        </form>
      
    </section>
    
  )
}

export default SearchBox
