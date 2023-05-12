const dateEl = document.querySelector('date-template');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.querySelector('#resultsDiv');

setInterval(function () {
  $('#current-date').text(dayjs().format('MMMM DD,YYYY'))
  $('#current-time').text(dayjs().format('hh:mm:ssA'))
  // $('#day-one').text(dayjs().format('ddd MMM D'))
  // $('#day-two').text(dayjs().format('ddd MMM D'))
  // $('#day-three').text(dayjs().format('ddd MMM D'))
  // $('#day-four').text(dayjs().format('ddd MMM D'))
  // $('#day-five').text(dayjs().format('ddd MMM D'))

}, 1000);

/**
 * function to request weather data from API
 * @param {*} coodinates for city to get weather 
 */
function getForecast({ lat, lon }) {
  // console.log(`lat:${lat} lon:${lon}`)
  // fetch request gets a list of all the repos for the node.js organization
  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=aaef84685258eb0daa49aeab92a41e5b`;


  return fetch(requestUrl)
    .then((response) =>
      response.json()
    ).then((data) => displayForecast(data))

}

function handleSearch() {
  const searchTerm = document.getElementById('city-search').value;
  const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=aaef84685258eb0daa49aeab92a41e5b`;
  fetch(requestUrl)
    .then((response) =>
      response.json())
    .then((data) => { 
      if (data && Array.isArray(data) && data.length >= 1){

      getForecast(data[0]) 
      } else {
        alert('no city found')
      }
    })
}
function displayForecast(forecast) {
console.log ('hello', forecast)

for (var i = 4; i < forecast.list.length; i+=8) {
//document.getElementById('#container').innerHTML = forecast.main;


  // console.log(JSON.stringify(forecast.list[i]))
  createNode(forecast.list[i]);
 }
}
function createNode(dailyForecast) {
  const results = document.getElementById('resultsDiv');
  results.setAttribute('style', 'display: inline;')
 
  const card = document.createElement('div');
  card.setAttribute('id', 'card-template');
  
  const dateEl = document.createElement('div');
  dateEl.setAttribute('id', 'dateTemplate');
  dateEl.innerText = (new Date(dailyForecast.dt_txt)).toDateString();
  
  const weatherIcon = document.createElement('div');
  weatherIcon.innerText = dailyForecast.weather.main;
  weatherIcon.setAttribute('id', 'weatherIcon');
//  console.log(dailyForecast.weather.icon);
//  const cityEl = document.createElement('div');
//  cityEl.innerText = dailyForecast.city;
//  cityEl.setAttribute('id', 'cityTemplate');
//  console.log(dailyForecast.city);

  const currentTempEl = document.createElement('div');
  currentTempEl.innerText = dailyForecast.main.temp + 'F° \n Current Temp';
  currentTempEl.setAttribute('id','currentTemplate');
  const feelsLikeEl = document.createElement('div');
  feelsLikeEl.innerText = dailyForecast.main.feels_like + 'F° \n Feels Like';
  feelsLikeEl.setAttribute('id','feelsTemplate');
  
  console.log (dailyForecast.main.temp);
  
  const windEl = document.createElement('div');
  windEl.innerText = dailyForecast.wind.speed + 'MPH \n Wind Speed';
  windEl.setAttribute('id','windTemplate');
 
  const humidEl = document.createElement('div');
  humidEl.innerText = dailyForecast.main.humidity + '% \n Humidity';
  humidEl.setAttribute('id', 'humidTemplate');

  console.log(dailyForecast.wind.speed)
  console.log(dailyForecast.dt)
  card.appendChild(dateEl);
  card.appendChild(weatherIcon);
  card.appendChild(currentTempEl);
  card.appendChild(feelsLikeEl);
  card.appendChild(windEl);
  card.appendChild(humidEl);
  results.appendChild(card);


}