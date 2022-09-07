import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios'
const App = () => {
  const [city, setCity] = useState('')
  const [staticDisplay, setStaticDisplay] = useState("")
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [temp, setTemp] = useState()
  const [details, setDetails] = useState()
  const [country, setCountry] = useState()



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((result) => {
      axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${result.coords.latitude}&lon=${result.coords.longitude}&appid=44eb24d76878c0fa9500e6f66a8d2b43`).then((res) => {
        // console.log(res.data)
        setStaticDisplay(res.data)
        setTemp(res.data.main.temp)
        setDetails(res.data.weather[0].description)
        setCountry(res.data.sys.country)
      })
      setLat(result.coords.latitude)
      setLon(result.coords.longitude)
    })

  }, [])

  const searchAgain = () => {
    axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=44eb24d76878c0fa9500e6f66a8d2b43`).then((res) => {
      // console.log(res.data)
      setStaticDisplay(res.data)
      setTemp(res.data.main.temp)
      setDetails(res.data.weather[0].description)
      setCountry(res.data.sys.country)

    })
  }

  // console.log(details);

  return (
    <>

      <div className="w-100 card bg-dark my-0 d-flex flex-column justify-content-center align-items-center" id="mainDiv">
        <div id='subDiv1'>
          <h3 className='my-2 text-muted text-center'>Current Location: {staticDisplay.name}</h3>
          <h3 className='my-2 text-muted text-center'>Temperature: {(Number(temp) - 273).toFixed(2)}</h3>
        </div>
        <div id='subDiv1'>
          <h3 className='my-2 text-muted text-center'>Weather desc: {details}</h3>
          <h3 className='my-2 text-muted text-center'>Country code: {country}</h3>
        </div>
        <div className='px-3 py-3' id='subDiv2'>
          <input className='form-comtrol w-100 my-2 text-muted text-center' style={{ height: "50px", fontSize: "30px" }} placeholder='Input your city name' onChange={(e) => { setCity(e.target.value) }} />
          <button className='my-2 btn btn-outline-dark' onClick={searchAgain}>Search</button>
        </div>


      </div>
    </>
  )
}
export default App;
