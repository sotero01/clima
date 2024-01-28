function getWeather() {
  const apiKey = '0d50908c929e38a51164bd28be21403c';
  const city = document.getElementById('city-input').value;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = document.getElementById('weather-info');
      const body = document.body;
      const conditionsMapping = {
        'Clear': { description: 'Céu limpo', className: 'sunny' },
        'Clouds': { description: 'Nublado', className: 'cloudy' },
        'Rain': { description: 'Chuva', className: 'rainy' },
        'Thunderstorm': { description: 'Tempestade', className: 'thunderstorm' },
       
        
      };

      const currentCondition = data.weather[0].main;
      const conditionInfo = conditionsMapping[currentCondition];

      weatherInfo.innerHTML = `
        <h2>Clima em ${data.name}</h2>
        <p>Temperatura: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Condição: ${conditionInfo.description}</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Condição climática">
      `;

      body.className = conditionInfo.className;
    })
    .catch(error => {
      console.error('Erro ao obter dados do clima:', error);
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = '<p>Erro ao obter dados do clima. Por favor, verifique a cidade e tente novamente.</p>';
    });
}
