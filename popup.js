const apiKey = "033a7c44a7a443099f71f2d32a978764";
const matchesUrl = "https://api.football-data.org/v4/matches?competitions=PL";
const standingsUrl =
  "https://api.football-data.org/v4/competitions/PL/standings";
const teamUrl = "https://api.football-data.org/v4/teams/";

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

async function fetchTeamInfo(teamId) {
  const response = await fetch(`${teamUrl}${teamId}`, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  });
  const teamData = await response.json();
  displayTeamInfo(teamData);
}

function calculateMinutesDifference(lastUpdated, utcDate) {
  const lastUpdatedDate = new Date(lastUpdated);
  const utcDateObj = new Date(utcDate);

  const differenceInMs = lastUpdatedDate - utcDateObj;

  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

  return differenceInMinutes;
}

function displayTeamInfo(team) {
  const standingsDiv = document.getElementById("standings");
  standingsDiv.innerHTML = `
    <div class="team-info">
      <h2>${team.name}</h2>
      <img src="${team.crest}" alt="Crest" width="50" height="50">
      <p><strong>Sân vận động:</strong> ${team.venue}</p>
      <p><strong>Website:</strong> <a href="${team.website}" target="_blank">${team.website}</a></p>
      <p><strong>Địa chỉ:</strong> ${team.address}</p>
    </div>
    <button id="backToStandings">Quay lại</button>
  `;

  document.getElementById("backToStandings").addEventListener("click", () => {
    fetchStandings();
  });
}

function displayMatches(matches) {
  const matchesDiv = document.getElementById("matches");
  matchesDiv.innerHTML = "";
  if (matches && matches.length > 0) {
    matches.forEach((match) => {
      matchesDiv.innerHTML += `
        <div class="match-item">
          <span class="status">${match.status}</span>
            <span class="team">
              <img src="${match.homeTeam.crest}" alt="Crest" class="crest"> 
              ${match.homeTeam.shortName}
            </span> 
            <span class="sepa">vs</span>
            <span class="team">
              <img src="${match.awayTeam.crest}" alt="Crest" class="crest"> 
              ${match.awayTeam.shortName}
            </span>: 
            ${match.score.fullTime.home} - ${match.score.fullTime.away}
        </div>`;
    });
  } else {
    matchesDiv.innerHTML = "<p>Không có trận đấu nào hiện tại.</p>";
  }
}

function displayStandings(standings) {
  const standingsDiv = document.getElementById("standings");
  standingsDiv.innerHTML = "";
  standings.forEach((team) => {
    standingsDiv.innerHTML += `
     <div class="standing-item" data-id="${team.team.id}">
         <span class="pos">
          ${team.position}. ${" "}
          </span>
          <span class="team">
            <img src="${team.team.crest}" alt="Crest" class="crest"> 
            ${team.team.shortName} ${" "}
          </span> 
          <span class="sepa">|</span>
          ${team.points} điểm
      </div>`;
  });

  const standingItems = document.querySelectorAll(".standing-item");
  standingItems.forEach((item) => {
    item.addEventListener("click", () => {
      const teamId = item.getAttribute("data-id");
      fetchTeamInfo(teamId);
    });
  });
}

fetchMatches();
fetchStandings();
