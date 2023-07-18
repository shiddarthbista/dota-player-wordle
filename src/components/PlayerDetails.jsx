import "./PlayerDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function selectedPlayerDetails({
  selectedPlayer,
  randomPlayer,
}) {
  const roleImageSrc = `src/assets/${selectedPlayer.position}.png`;
  const countryImageSrc = `src/assets/country/${selectedPlayer.country}.png`;
  const teamImageSrc = `src/assets/team/${selectedPlayer.team}.png`;
  console.log(selectedPlayer);
  console.log(randomPlayer);

  return (
    <div className="selectedPlayer-details">
      <div className="selectedPlayer-name">{selectedPlayer.name}</div>
      <div className="circles-container">
        <div className="circle-age" style={{backgroundColor:selectedPlayer.age === randomPlayer.age ? "green" : "red"}}>
          {selectedPlayer.age}{" "}
          {randomPlayer.age > selectedPlayer.age ? (<FontAwesomeIcon icon={faArrowUp} />) : randomPlayer.age < selectedPlayer.age ? (<FontAwesomeIcon icon={faArrowDown} />) : null}
        </div>
        <div className="circle" style={{backgroundColor:selectedPlayer.position === randomPlayer.position? "green": "red",}} >
          <img src={roleImageSrc} alt={selectedPlayer.role}></img>
        </div>
        <div className="circle" style={{backgroundColor:selectedPlayer.country === randomPlayer.country? "green": "red",}}>
        <img src={countryImageSrc} alt={selectedPlayer.country}></img>
        </div>
        <div className="circle" style={{backgroundColor:selectedPlayer.team === randomPlayer.team? "green": "red",}}>
        <img src={teamImageSrc} alt={selectedPlayer.team}></img>
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
