export async function getSpotlightMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const members = await response.json();

    const qualifiedMembers = members.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3,
    );

    return getRandomMembers(qualifiedMembers, 3);
  } catch (error) {
    console.error("Error loading spotlights:", error);
    throw error;
  }
}

function getRandomMembers(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
