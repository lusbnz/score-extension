const apiKey = "033a7c44a7a443099f71f2d32a978764";
const matchesUrl = "https://api.football-data.org/v4/matches?competitions=PL";
const standingsUrl =
  "https://api.football-data.org/v4/competitions/PL/standings";

async function fetchMatches() {
  const response = await fetch(matchesUrl, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  });
  const data = await response.json();
  displayMatches(data.matches);
}

async function fetchStandings() {
  const response = await fetch(standingsUrl, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  });
  const data = await response.json();
  displayStandings(data.standings[0].table);
}

function calculateMinutesDifference(lastUpdated, utcDate) {
    const lastUpdatedDate = new Date(lastUpdated);
    const utcDateObj = new Date(utcDate);

    const differenceInMs = lastUpdatedDate - utcDateObj;

    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

    return differenceInMinutes;
}

function displayMatches(matches) {
  const matchesDiv = document.getElementById("matches");
  matchesDiv.innerHTML = "";
  if (matches && matches.length > 0) {
    matches.forEach((match) => {
      matchesDiv.innerHTML += `<p>${match.status} - ${match.homeTeam.shortName} vs ${match.awayTeam.shortName}: ${match.score.fullTime.home} - ${match.score.fullTime.away}}</p>`;
    });
  } else {
    matchesDiv.innerHTML = "<p>Không có trận đấu nào hiện tại.</p>";
  }
}

function displayStandings(standings) {
  const standingsDiv = document.getElementById("standings");
  standingsDiv.innerHTML = "";
  standings.forEach((team) => {
    standingsDiv.innerHTML += `<p>${team.position}. ${team.team.shortName} - ${team.points} điểm</p>`;
  });
}

fetchMatches();
fetchStandings();
