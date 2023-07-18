import "./PlayerDetails.css";

export default function selectedPlayerDetails({
  selectedPlayer,
  randomPlayer,
}) {
  const roleImageSrc = `src/assets/${selectedPlayer.position}.png`;
  console.log(selectedPlayer);
  console.log(randomPlayer);


  return (
    <div className="selectedPlayer-details">
      <div className="selectedPlayer-name">{selectedPlayer.name}</div>
      <div className="circles-container">
        <div className="circle">{selectedPlayer.age}</div>
        <div className="circle" style={{ backgroundColor: selectedPlayer.position === randomPlayer.position ? "green" : "red" }}>
          <img src={roleImageSrc} alt={selectedPlayer.role}></img>
        </div>
        <div className="circle">
          {selectedPlayer.country}
          {/* <img src={selectedPlayer.countryFlag} alt="Country" /> */}
        </div>
        <div className="circle">
          {selectedPlayer.team}
          {/* <img src={selectedPlayer.teamLogo} alt="Team" /> */}
        </div>
        <div className="circle">
          {selectedPlayer.region}
          {/* <img src={selectedPlayer.regionLogo} alt="Region" /> */}
        </div>
      </div>
    </div>
  );
}
