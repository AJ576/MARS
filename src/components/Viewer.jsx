import { useState} from 'react'
import Ban from './Ban';
import axios from 'axios'
const KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const Viewer = () =>
{
  const [data,setData] = useState([])
  const [ban,setBan] = useState([])
  const rovers = [["Spirit",500],["Opportunity",3500],["Curiosity",3500],["Perseverance",900]]

  const handleClick = async () =>
  {
    let response
    let img_No
    const rand_rov = getRandomInt(rovers.length)
    try 
    {
      const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[rand_rov][0]}/photos?sol=${getRandomInt(rovers[rand_rov][1])+1}&api_key=${KEY}`
      console.log(URL)

      //use this to ban the stuff 
      if(ban.indexOf(rovers[rand_rov][0]) != -1 || ban.indexOf(rovers[rand_rov][1]) != -1)
      {
        console.log("redoing it again ")
        handleClick()
      }
      else
      {
        response = await axios.get(URL)  
        console.log(response.data.photos) 
        img_No = getRandomInt(response.data.photos.length)
        setData([response.data.photos[img_No].rover.name, response.data.photos[img_No].camera.name, response.data.photos[img_No].sol, response.data.photos[img_No].img_src])  
      }
    }
    catch
    {
      let ReUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[rand_rov][0]}/photos?sol=550&camera=NAVCAM&api_key=${KEY}`
      console.log("wow an error")
      console.log(ReUrl)
      if( ban.indexOf(rovers[rand_rov][0]) != -1 || ban.indexOf(rovers[rand_rov][1]) != -1)
      { 
        handleClick()
      }
      else{
        response = await axios.get(ReUrl)
        img_No = getRandomInt(response.data.photos.length)
        setData([response.data.photos[img_No].rover.name, response.data.photos[img_No].rover.name, response.data.photos[img_No].camera.name.response.data.photos[img_No].img_src])
      
      } 
    }
    }

    return(
        <>
        <div className='Window'>
          <div className='View'>
            
                {
                    data[3]?(
                        <>
                            <img src={data[3]} style={{width:'500px', height:'500px'}}/>
                            <h3>This image was taken using </h3>
                            <div className='buttons'>
                              <button className='attribute' type='button' onClick={
                                () => {
                                  if(ban.indexOf(data[0]) == -1)
                                  {
                                    setBan(ban.concat([data[0]]))
                                  }
                                }
                                }>{data[0]}</button>
                              <button className='attribute' type='button'>{data[1]}</button>
                              <button className='attribute' type='button'
                              onClick={
                                () => {
                                  if(ban.indexOf(data[2]) == -1)
                                  {
                                    setBan(ban.concat([data[2]]))
                                  }
                                }
                              }>{data[2]}</button>
                            </div>                    
                        </>
                    ):(<></>)              
                }
                <button className='find' type='submit' onClick={handleClick}>Discover🔍</button>
            </div>
            <div className='banned'>
              <Ban banList = {ban}/>
            </div>
        </div>
          
        </>
    )
}

export default Viewer