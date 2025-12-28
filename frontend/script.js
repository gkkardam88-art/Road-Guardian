const API = "https://road-guardian-backend.onrender.com";

function report() {
    const btn = document.querySelector("button");
    btn.innerText = "Submitting...";
    btn.disabled = true;

    fetch(API + "/report", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            type: type.value,
            lat: lat.value,
            lon: lon.value,
            severity: severity.value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ Incident Reported Successfully");
        btn.innerText = "Submit";
        btn.disabled = false;
        loadIncidents();
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
