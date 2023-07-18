import { useState, useEffect } from "react";
import playersData from "./../playersData.json";
import PlayerDetails from "./PlayerDetails";
import "./Searchbar.css";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(null);

  useEffect(() => {
    setAllPlayers(playersData);
    setFilteredPlayers(playersData); // Initialize with all players

    function getRandomPlayer() {
      const randomIndex = Math.floor(Math.random() * playersData.length);
      return playersData[randomIndex];
    }
    setRandomPlayer(getRandomPlayer());
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    if (value === "") {
      setFilteredPlayers(allPlayers); // Show all players if input is empty
    } else {
      const filtered = allPlayers.filter((player) =>
        player.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  };

  const handleSearchBarFocus = () => {
    setIsFocused(true);
  };

  const handleSearchBarBlur = () => {
    setIsFocused(false);
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayers((prevPlayers) => prevPlayers.concat(player));
  };
  return (
    <div className="search-body">
      <div className="search-container">
        <div className="dropdown-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleSearchBarFocus}
            onBlur={handleSearchBarBlur}
            placeholder="Search player names..."
            className="search-input"
          />
          {isFocused && (
            <ul className="dropdown-list">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <li
                    key={player.name}
                    className="dropdown-list-item"
                    onMouseDown={() => handlePlayerSelect(player)}
                  >
                    {player.name}
                  </li>
                ))
              ) : (
                <li className="dropdown-list-item">No players match</li>
              )}
            </ul>
          )}
        </div>
        <div className="player-rows">
          {selectedPlayers &&
            selectedPlayers.map((player) => (
              <PlayerDetails
                key={player.name}
                selectedPlayer={player}
                randomPlayer={randomPlayer}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
