window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let skycons = new Skycons({ "color": "white" });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            const api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&lang=ja&appid=' + API_KEY;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.cod == 200) {
                        let summary = data.weather[0].description;
                        console.log(summary);
                        let temperature = data.main.temp;
                        temperatureDegree.innerHTML = Math.ceil(temperature);
                        temperatureDescription.innerHTML = summary;
                        locationTimezone.innerHTML = data.name;
                        let icon;
                        switch (data.weather[0].icon) {
                            case "01d":
                                icon = "CLEAR_DAY";
                                break;
                            case "01n":
                                icon = "CLEAR_NIGHT";
                                break;
                            case "02d":
                                icon = "PARTLY_CLOUDY_DAY";
                                break;
                            case "02n":
                                icon = "PARTLY_CLOUDY_NIGHT";
                                break;
                            case "03d":
                            case "03n":
                            case "04d":
                            case "04n":
                                icon = "CLOUDY";
                                break;
                            case "09d":
                            case "09n":
                            case "10d":
                            case "10n":
                            case "11d":
                            case "11n":
                                icon = "RAIN";
                                break;
                            case "13d":
                            case "13n":
                                icon = "SNOW";
                                break;
                            case "50d":
                            case "50n":
                                icon = "FOG";
                                break;
                            default:
                                icon = "CLEAR_DAY";
                        }
                        skycons.add("icon", icon);
                        skycons.play();
                    } else {
                        temperatureDescription.textContent = "天気のデータを取得できませんでした。";
                    }
                });
        });
    }
});
