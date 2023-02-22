import React,{useState} from 'react'
import './App.css'
function App() {
  const apiKey = 'e93bea4ca5a57123fe6a3ec010294922'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")
  const getWeather = (event) =>{
    if(event.key == "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
        response => response.json()
      ).then(
        data=>{
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }
  return (
    <div className='container'>
      <input
       className='input'
       placeholder='Enter City...'
       onChange={e=>{setCity(e.target.value)}}
       value={city}
       onKeyDown = {getWeather}
       />

       {typeof weatherData.main === 'undefined'? (
        <div className='welcome'>
          <p>Welcome to weather app! Enter in a city to get the weather of.</p>
        </div>
       ):(
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}F</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>
       )}

       {weatherData.cod === "404" ? (
        <p className='error'>City not found.</p>
       ) : (
        <>
        </>
       )}

    </div>
  )
}

export default App