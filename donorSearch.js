const requestedBloodGroup = "B+"; // Example requested blood group

const donors = [
    {
        name: "Satyam Sharma",
        bloodType: "A+",
        availability: true,
        location: [28.7041, 77.1025], // New Delhi
        contact: "1234567890",
        email: "john@example.com",
        profileImage: "path/to/profile1.jpg",
        address: "123 Main St, New Delhi"
    },
    {
        name: "Priyesh Yadav",
        bloodType: "B+",
        availability: true,
        location: [28.5355, 77.3910], // Noida
        contact: "0987654321",
        email: "jane@example.com",
        profileImage: "path/to/profile2.jpg",
        address: "456 Elm St, Noida"
    },
    {
        name: "Neeta Mishra",
        bloodType: "B+",
        availability: false,
        location: [28.4595, 77.0266], // Gurgaon
        contact: "456-789-1234",
        email: "robert@example.com",
        profileImage: "path/to/profile3.jpg",
        address: "789 Oak St, Gurgaon"
    },
    {
        name: "Ayaan Zubair",
        bloodType: "O-",
        availability: true,
        location: [28.7041, 77.1025], // New Delhi
        contact: "9876543210",
        email: "ayaan@example.com",
        profileImage: "path/to/profile4.jpg",
        address: "321 Pine St, New Delhi"
    }
];

// Sort donors by availability, showing available donors first
donors.sort((a, b) => b.availability - a.availability);

// Initialize the map
const map = L.map('map').setView([28.6139, 77.2090], 10); // Default to New Delhi

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Display donors on the map and in the donor list
const donorList = document.getElementById('donor-list');

// Function to check if a donor can donate to the requested blood group
function canDonate(donorBloodType, requestedBloodType) {
    const compatibleBloodTypes = {
        "A+": ["A+", "AB+"],
        "A-": ["A+", "A-", "AB+", "AB-"],
        "B+": ["B+", "AB+"],
        "B-": ["B+", "B-", "AB+", "AB-"],
        "AB+": ["AB+"],
        "AB-": ["AB+", "AB-"],
        "O+": ["O+", "A+", "B+", "AB+"],
        "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
    };
    return compatibleBloodTypes[donorBloodType].includes(requestedBloodType);
}

donors.forEach((donor, index) => {
    if (canDonate(donor.bloodType, requestedBloodGroup)) {
        // Add marker to the map
        const marker = L.marker(donor.location).addTo(map)
            .bindPopup(`<strong>${donor.name}</strong><br>Blood Type: ${donor.bloodType}<br>Availability: ${donor.availability ? "Available" : "Unavailable"}`);

        // Create a donor card
        const donorCard = document.createElement('div');
        donorCard.className = 'donor-card';
        donorCard.innerHTML = `
            <div class="donor-info">
                <img src="${donor.profileImage}" alt="${donor.name}" class="profile-image">
                <div>
                    <p><strong>Name:</strong> ${donor.name}</p>
                    <p><strong>Blood Type:</strong> ${donor.bloodType}</p>
                    <p><strong>Availability:</strong> <span class="${donor.availability ? 'available' : 'unavailable'}">${donor.availability ? "Available" : "Unavailable"}</span></p>
                    <p><strong>Address:</strong> ${donor.address}</p>
                </div>
            </div>
            <div class="donor-actions">
                <div class="donor-actions">
                    ${donor.availability ? `
                        <button id="call" onclick="window.location.href='tel:${donor.contact}'"><i class="fa-solid fa-phone"></i>Call</button>
                        <button id="message" onclick="alert('Messaging ${donor.email}')"><i class="fa-solid fa-message"></i>Message</button>
                    ` : ""}
            </div>

            </div>
        `;
        donorList.appendChild(donorCard);
    }
});

// Simulate real-time map update every 1 minute (optional)
setInterval(() => {
    donors.forEach((donor, index) => {
        // Example: Randomize donor location within a small radius for demonstration
        donor.location[0] += (Math.random() - 0.5) * 0.01;
        donor.location[1] += (Math.random() - 0.5) * 0.01;

        // Update map marker
        const newMarker = L.marker(donor.location).addTo(map);
    });
}, 60000);