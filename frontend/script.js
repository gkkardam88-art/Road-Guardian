const API = "https://road-guardian-backend.onrender.com";

function report() {
    const btn = document.querySelector("button");
    btn.innerText = "Processing...";
    btn.disabled = true;

    const payload = {
        type: type.value,
        lat: lat.value,
        lon: lon.value,
        severity: severity.value
    };

    // 1️⃣ Save incident
    fetch(API + "/report", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    .then(() => {

        // 2️⃣ Call ML prediction
        return fetch(API + "/predict-risk", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                lat: payload.lat,
                lon: payload.lon,
                severity: payload.severity
            })
        });
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("risk").innerText =
            data.predicted_risk;

        btn.innerText = "Submit";
        btn.disabled = false;
        loadIncidents();
    })
    .catch(err => {
        alert("ML Prediction Error");
        console.error(err);
        btn.innerText = "Submit";
        btn.disabled = false;
    });
}

function loadIncidents() {
    fetch(API + "/incidents")
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("list");
        list.innerHTML = "";
        data.reverse().forEach(i => {
            let li = document.createElement("li");
            li.innerHTML = `
                🚨 <b>${i.type}</b><br>
                Severity: ${i.severity}<br>
                ⏱ ${i.time}
            `;
            list.appendChild(li);
        });
    });
}

loadIncidents();

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 5
    });

    fetch(API + "/incidents")
        .then(res => res.json())
        .then(data => {
            data.forEach(i => {
                new google.maps.Marker({
                    position: { lat: parseFloat(i.lat), lng: parseFloat(i.lon) },
                    map: map,
                    title: `${i.type} - ${i.severity}`
                });
            });
        });
}

window.onload = initMap;
