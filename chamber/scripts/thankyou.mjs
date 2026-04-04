// Sandy Utah Chamber of Commerce - Thank You Page Script

function displayFormData() {
  const urlParams = new URLSearchParams(window.location.search);

  const firstName = urlParams.get("first-name") || "";
  const lastName = urlParams.get("last-name") || "";
  const email = urlParams.get("email") || "";
  const mobile = urlParams.get("mobile") || "";
  const organization = urlParams.get("organization") || "";
  const title = urlParams.get("title") || "";
  const membership = urlParams.get("membership") || "";
  const timestamp = urlParams.get("timestamp") || "";

  document.getElementById("display-name").textContent =
    `${firstName} ${lastName}`;
  document.getElementById("display-email").textContent = email;
  document.getElementById("display-mobile").textContent = mobile;
  document.getElementById("display-organization").textContent = organization;
  document.getElementById("display-title").textContent = title;

  const membershipLevel = formatMembershipLevel(membership);
  document.getElementById("display-membership").textContent = membershipLevel;

  if (timestamp) {
    const date = new Date(timestamp);
    document.getElementById("display-timestamp").textContent =
      date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  }
}

function formatMembershipLevel(level) {
  const levels = {
    np: "NP Membership (Free)",
    bronze: "Bronze Membership ($200/year)",
    silver: "Silver Membership ($400/year)",
    gold: "Gold Membership ($600/year)",
  };

  return levels[level] || level;
}

document.addEventListener("DOMContentLoaded", () => {
  displayFormData();
});

export { displayFormData, formatMembershipLevel };
