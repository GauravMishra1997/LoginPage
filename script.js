function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (username === "admin" && password === "password") {
        localStorage.setItem("loggedIn", "true");  // Store login flag
        message.style.color = "green";
        message.innerText = "Login successful!";
        setTimeout(() => {
            window.location.href = "data.html";  // Redirect after login
        }, 1000);
    } else {
        message.style.color = "red";
        message.innerText = "Invalid username or password!";
    }
}

// Redirect to login if not logged in
if (window.location.pathname.includes("data.html") && !localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
}

async function fetchPopulationData() {
    try {
        const response = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
        const data = await response.json();
        const tableBody = document.getElementById("tableBody");
        
        if (data.data && data.data.length > 0) {
            data.data.forEach(entry => {
                const row = `<tr><td>${entry.Year}</td><td>${entry.Nation}</td><td>${entry.Population}</td></tr>`;
                tableBody.innerHTML += row;
            });
        } else {
            document.body.innerHTML += "<p>No population data available.</p>";
        }
    } catch (error) {
        document.body.innerHTML += "<p>Error fetching population data.</p>";
        console.error("Error fetching population data:", error);
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedIn");  // Remove login flag
    window.location.href = "index.html";  // Redirect to login page
}

if (window.location.pathname.includes("data.html")) {
    fetchPopulationData();
}
