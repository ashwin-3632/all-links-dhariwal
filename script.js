document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("link-container");
  const searchInput = document.getElementById("search-input");

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbxesreqIBwHRgNcmMeLgXfgiZBSabLTTYqS5NnRU1UJo51dd4DuVoBzgr96deL95UlT/exec?sheet=Public_Links";

  let allLinks = [];

  try {
    const response = await fetch(SHEET_URL);
    allLinks = await response.json();
    renderLinks(allLinks);
  } catch (err) {
    console.error("Failed to load links:", err);
    container.innerHTML = `<p class="text-red-600">Unable to load links.</p>`;
  }

  // Live search filter
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allLinks.filter(link =>
      link.title.toLowerCase().includes(term) ||
      link.description.toLowerCase().includes(term) ||
      (link.tags || "").toLowerCase().includes(term)
    );
    renderLinks(filtered);
  });

  function renderLinks(links) {
    const container = document.getElementById("link-container");
    container.innerHTML = "";

    if (links.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-center col-span-full">No matching links found.</p>`;
      return;
    }

    links.forEach(link => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition";

      const tags = (link.tags || "")
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => `<span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">${tag}</span>`)
        .join(" ");

      const sheetButton = link["Sheet URL"]
        ? `<a href="${link["Sheet URL"]}" target="_blank" class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded mr-2">
            📊 <span class="ml-2">Sheet (Excel)</span>
          </a>`
        : "";

      card.innerHTML = `
        <h2 class="text-xl font-bold text-blue-900 mb-1">${link.title}</h2>
        <p class="text-gray-700 text-sm mb-2">${link.description}</p>
        <div class="mb-3">${tags}</div>
        <div class="flex flex-wrap gap-2">
          <a href="${link.url}" target="_blank" class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">Open</a>
          ${sheetButton}
        </div>
      `;

      container.appendChild(card);
    });
  }

});
