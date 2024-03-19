import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Gallery from './components/Gallery';
const KEY = import.meta.env.VITE_APP_ACCESS_KEY;
function App() {
  const [img,setImg] = useState()
  const [url,setUrl] = useState()
  const[name,setname] = useState()
  const[cam,setCam] = useState()
  const[day,setDay] = useState()

  const rovers = [["spirit",500],["opportunity",3500],["curiosity",3500],["perseverance",900]]
  const camera = [["FHAZ","RHAZ","NAVCAM","PANCAM"],["FHAZ","RHAZ","NAVCAM","PANCAM"],["FHAZ","RHAZ","NAVCAM","MAST","MARDI"],["FRONT_HAZCAM_LEFT_A","FRONT_HAZCAM_RIGHT_A","REAR_HAZCAM_LEFT","SKYCAM"]]

  let rand_rov 
  let sol 
  let camera_number
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const dataMaker = () =>
  {
    rand_rov = getRandomInt(rovers.length)
    sol = getRandomInt(rovers[rand_rov][1])+1
    camera_number = getRandomInt(camera[rand_rov].length)

    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[rand_rov][0]}/photos?sol=${sol}&camera=${camera[rand_rov][camera_number]}&api_key=${KEY}`
    return URL
  }

  const handleClick = async () =>
  {
    let response
    let img_No
    try 
    {
      setUrl(dataMaker())
      console.log(url)
      response = await axios.get(url)  
      console.log(response.data.photos) 
      img_No = getRandomInt(response.data.photos.length)
      setname(response.data.photos[img_No].rover.name)
      setCam(response.data.photos[img_No].camera.name)
      setDay(response.data.photos[img_No].sol)
      setImg(response.data.photos[img_No].img_src)   
    }
    catch
    {
      let ReUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[getRandomInt(rovers.length-1)][0]}/photos?sol=550&camera=NAVCAM&api_key=FTKqKIGVpBRXb018ZmsaJif8ws6jGD9XcEdB9qFb`
      console.log("wow an error")
      console.log(ReUrl)
      response = await axios.get(ReUrl)
      img_No = getRandomInt(response.data.photos.length)
      setname(response.data.photos[img_No].rover.name)
      setCam(response.data.photos[img_No].camera.name)
      setDay(response.data.photos[img_No].sol)
      setImg(response.data.photos[img_No].img_src)
      
      
    }
    }

  return (
  <>
    <div>

      
    </div>
    {img? (
      <>
      <img src={img} style={{width:'500px', height:'500px'}}/>
      <h3>This image was taken by: </h3> 
      <div className='tags'>
      <button className='label'>{name}</button>
      <button className='label'>using: {cam}</button>
      <button className='label'>on sol: {day}</button>
    </div>
    </>
    ):(<></>)}
    
    <button type='submit' onClick={handleClick}>click me</button>
  </>
  )
}
export default App
