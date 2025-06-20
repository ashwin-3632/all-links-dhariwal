document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("link-container");

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbyb8vPIP7_Ve9EAzKQ8xxc8ussOnmUpKQCYzbH6uf1tt2kVb38Z_rF4gs4-MNPScSmc/exec?sheet=Public_Links"; // 🔁 replace with yours

  try {
    const links = await fetch(SHEET_URL).then(res => res.json());

    links.forEach(link => {
      const card = document.createElement("div");
      card.className = "bg-white p-5 shadow-md rounded border-l-4 border-blue-500";
      card.innerHTML = `
        <h2 class="text-xl font-bold text-blue-800 mb-2">${link.title}</h2>
        <p class="text-gray-600 mb-3">${link.description}</p>
        <a href="${link.url}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Go</a>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Failed to load links:", err);
    container.innerHTML = `<p class="text-red-600">Unable to load links.</p>`;
  }
});
