let API_KEY = "8cb06ccb2e29e8faeb183c0eb3c1a204";

function getWeather() {
    let city = document.getElementById("citty").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=uz`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("city").innerText = data.name;
            document.getElementById("temp").innerText = Math.round(data.main.temp) + "°";
            document.getElementById("desc").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity + "%";
            document.getElementById("wind").innerText = data.wind.speed + " m/s";
            document.getElementById("rain").innerText = data.clouds.all + "%";

            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

            getForecast(data.coord.lat, data.coord.lon);
        })
        .catch(() => alert("Shahar topilmadi ❌"));
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("hourly").innerHTML = "";
            document.getElementById("daily").innerHTML = "";

            data.list.slice(0, 6).forEach(item => {
                document.getElementById("hourly").innerHTML += `
                    <div class="card">
                        ${item.dt_txt.slice(11, 16)}<br>
                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                        ${Math.round(item.main.temp)}°
                    </div>
                `;
            });

            for (let i = 0; i < data.list.length; i += 8) {
                let d = data.list[i];
                document.getElementById("daily").innerHTML += `
                    <div class="card">
                        ${new Date(d.dt * 1000).toLocaleDateString("uz-UZ", { weekday: "short" })}<br>
                        <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}.png">
                        ${Math.round(d.main.temp)}°
                    </div>
                `;
            }
        });
}
