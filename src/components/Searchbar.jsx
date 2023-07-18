import { useState, useEffect } from "react";
import playersData from "./../playersData.json";
import "./Searchbar.css";
import SelectedPlayerDetails from "./SelectedPlayerDetails";
import { toast } from "react-toastify";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [guess, setGuess] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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

  const getRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * playersData.length);
    return playersData[randomIndex];
  }

  const handleSearchBarFocus = () => {
    setIsFocused(true);
  };

  const handleSearchBarBlur = () => {
    setIsFocused(false);
  };

  const handlePlayAgain = () => {
    setGuess(0);
    setSelectedPlayers([]);
    setRandomPlayer(getRandomPlayer());
    setGameOver(false);
    setInputValue("");
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayers((prevPlayers) => prevPlayers.concat(player));
    setGuess(guess+1);
    setInputValue('');
    setFilteredPlayers(playersData);
    console.log(`${guess}`);
    if(guess === 6) {
      toast.error(`Out of guesses. Correct answer is ${randomPlayer.name}`)
      setGameOver(true)
    }
    if(player === randomPlayer) {
      toast.success(`!!!Radiant Victory!!!`)
      setGameOver(true)
    }
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
            placeholder={`Guess ${guess+1} of 8`}
            className="search-input"
            disabled={guess === 8 }
          />
          {isFocused && (
            <ul className="dropdown-list">
              {filteredPlayers.length > 0 ? (
                filteredPlayers
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort the players alphabetically by name
                .map((player) => (
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
              <SelectedPlayerDetails
                key={player.name}
                selectedPlayer={player}
                randomPlayer={randomPlayer}
              />
            ))}
            {gameOver && ( <button className="play-again-button" onClick={handlePlayAgain}>One more G??</button>)}

        </div>
      </div>
    </div>
  );
}

export default SearchBar;
