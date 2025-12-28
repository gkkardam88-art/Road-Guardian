const API = "https://road-guardian-backend.onrender.com";

function report() {
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
    .then(data => alert(data.status));
}

fetch(API + "/incidents")
.then(res => res.json())
.then(data => {
    let list = document.getElementById("list");
    data.forEach(i => {
        let li = document.createElement("li");
        li.innerText = `${i.type} | ${i.severity} | ${i.time}`;
        list.appendChild(li);
    });
});
