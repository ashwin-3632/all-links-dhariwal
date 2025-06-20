document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("user-email");

  dropdown.addEventListener("change", async () => {
    const email = dropdown.value;
    if (!email) {
      document.getElementById("link-container").innerHTML = "";
      return;
    }

    // ✅ REPLACE THIS with your actual deployed script URL
    const BASE_URL = "https://script.google.com/macros/s/AKfycbyVSc9Q4EgsWAqgGJ5W9Ei5B_KURuGbkmiQzMNM1Yi3kJLGMFXkmSicY1tm2a5PzmlrPA/exec";

    const rolesURL = `${BASE_URL}?sheet=User_Roles`;
    const linksURL = `${BASE_URL}?sheet=Master_Links`;

    try {
      const [roleData, links] = await Promise.all([
        fetch(rolesURL).then(res => res.json()),
        fetch(linksURL).then(res => res.json())
      ]);

      const userObj = roleData.find(entry => entry.email === email);
      if (!userObj) {
        alert("No role assigned to this email.");
        return;
      }

      const userRole = userObj.role;
      const filteredLinks = links.filter(link =>
        link.roles.includes(userRole) || link.roles.includes("all")
      );

      renderLinks(filteredLinks);
    } catch (err) {
      console.error("Error loading data:", err);
      alert("Failed to load links or roles.");
    }
  });
});

function renderLinks(links) {
  const container = document.getElementById("link-container");
  container.innerHTML = "";

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
}
