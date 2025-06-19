document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("user-email");
  dropdown.addEventListener("change", async () => {
    const email = dropdown.value;
    if (!email) {
      document.getElementById("link-container").innerHTML = "";
      return;
    }

    try {
      const roleData = await fetch("email_roles.json").then(res => res.json());
      const userRole = roleData[email];

      if (!userRole) {
        alert("No role assigned to this email.");
        return;
      }

      const links = await fetch("links.json").then(res => res.json());
      const filteredLinks = links.filter(link =>
        link.roles.includes(userRole) || link.roles.includes("all")
      );

      renderLinks(filteredLinks);
    } catch (err) {
      console.error("Error loading role or links:", err);
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
