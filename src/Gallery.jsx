import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from './context';
import NotFoundImg from './assets/face.gif'
import { TfiDownload } from "react-icons/tfi";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";



const url=`https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_API_KEY}`;


const Gallery = () => {
  

 const {searchTerm,isDarkTheme,pgNum, setPgNum}= useGlobalContext()
 

  const {data, isError, isLoading} = useQuery({
    queryKey: ['images',searchTerm, pgNum],
    queryFn: async()=>{
      const result = await axios.get(`${url}&query=${searchTerm}&page=${pgNum}`)
      return result.data;
    }
  });
  

  const handlePage = (move)=>{
    if(data.total_pages != 0){
    
    if(move == "Home"){
      setPgNum(1)
      
    }else if(move=='Next'){
      let newPgNum = pgNum
      newPgNum +=1
      if(newPgNum>data.total_pages){
        newPgNum = data.total_pages
      }
      setPgNum(newPgNum)
      
    }else if(move='Previous'){
      
        let newPgNum = pgNum
         newPgNum -=1
         if(newPgNum <= 1){
          newPgNum = 1
         }
         setPgNum(newPgNum)
      
    }}
  }

  const handleDownload = async (url,alt) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      let alt_img = alt
      const newalt = alt_img.replace(/ /g, "_");
      link.download = `${newalt}.jpg`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the image', error);
    }
  };


  

  
  if(isLoading){
    return (
      <div className='loader'>
       
      </div>
    )
  }

  if(isError){
    return (
      <div>
        There is an error
      </div>
    )
  }

  

  if(data.results.length < 1){
    return (
      <div className='foundError'>
        <img src={NotFoundImg} alt='nervous Dog' className={isDarkTheme && 'dark'}/>
        <h2>Search not found</h2>
      </div>
    )
  }


  return (
    <div>
    <section className='image-container'>

      {data?.results?.map((item)=>{
        const url = item?.urls?.regular
        return (<div className='div_img' key={item.id}>
          
            <img src={url}  alt={item.alt_description} className='img'/>
            <h5  className='img_alt' style={{color:'white'}}>{item.alt_description}</h5>
            {/* <a href={url} download={`${item.alt_description}.jpg`} className='download-btn' target="_blank" rel="noopener noreferrer"><TfiDownload className='download-img'/></a> */}
            <button  className='download-btn' onClick={()=> handleDownload(url, item.alt_description)}><TfiDownload className='download-img'/></button>
          </div>)
      })}

      

    </section>
    <div className='pgButton' >
        <button  onClick={()=> handlePage('Home')} style={{color:isDarkTheme && 'white'}}><AiOutlineHome/></button>
        <button onClick={()=> handlePage('Previous')} style={{color:isDarkTheme && 'white'}} ><GrLinkPrevious/></button>
        <button onClick={()=> handlePage('Next')} style={{color:isDarkTheme && 'white'}}><GrLinkNext/></button>
      </div>
    </div>
  )
}

export default Gallery
