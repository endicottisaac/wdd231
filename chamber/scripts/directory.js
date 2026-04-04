const memberDirectory = document.getElementById("member-directory");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members, "grid");
  } catch (error) {
    console.error("Error loading members:", error);
    memberDirectory.innerHTML =
      "<p>Sorry, we could not load the member directory at this time.</p>";
  }
}
function displayMembers(members, viewType) {
  if (viewType === "grid") {
    memberDirectory.className = "member-grid";
    memberDirectory.innerHTML = members
      .map((member) => {
        const badgeClass = getBadgeClass(member.membershipLevel);
        const badgeText = getBadgeText(member.membershipLevel);
        return `
          <div class="member-card">
            <img src="images/${member.image}" alt="${member.name}" loading="lazy" />
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <span class="membership-badge ${badgeClass}">${badgeText}</span>
          </div>
        `;
      })
      .join("");
  } else {
    memberDirectory.className = "member-list";
    memberDirectory.innerHTML = members
      .map((member) => {
        const badgeClass = getBadgeClass(member.membershipLevel);
        const badgeText = getBadgeText(member.membershipLevel);
        return `
          <div class="member-list-item">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <span class="membership-badge ${badgeClass}">${badgeText}</span>
          </div>
        `;
      })
      .join("");
  }
}
function getBadgeClass(level) {
  if (level === 3) return "badge-gold";
  if (level === 2) return "badge-silver";
  return "badge-member";
}

function getBadgeText(level) {
  if (level === 3) return "Gold Member";
  if (level === 2) return "Silver Member";
  return "Member";
}
gridViewBtn.addEventListener("click", async () => {
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members, "grid");
});

listViewBtn.addEventListener("click", async () => {
  listViewBtn.classList.add("active");
  gridViewBtn.classList.remove("active");
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members, "list");
});

getMembers();
