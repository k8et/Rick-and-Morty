import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Characters from "../../screen/charactes";
import { Route, Routes } from "react-router-dom";
import CharacterDetails from "../../screen/characterDetails";
import Locations from "../../screen/locations";
import LocationDetails from "../../screen/locationDetails";
import Episodes from "../../screen/episodes";
import EpisodeDetails from "../../screen/episodeDetails";
import Favorite from "../../screen/favorite";

const MainComponent = () => {
  const [num, setNum] = useState(8);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [numLocation, setNumLocation] = useState(12);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [numEpisode, setNumEpisode] = useState(12);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const handleAddFavorite = (character) => {
    const isDuplicate = favoriteCharacters.includes(character);
    if (isDuplicate) {
      setFavoriteCharacters(
        favoriteCharacters.filter((item) => item !== character)
      );
    } else {
      setFavoriteCharacters([...favoriteCharacters, character]);
    }
  };
  const handleLoadMore = () => {
    setNum((n) => n + 12);
  };
  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };
  const handleCardClickLocation = (itemLocation) => {
    setSelectedLocation(itemLocation);
  };
  const handleCardClickEpisode = (itemEpisode) => {
    setSelectedEpisode(itemEpisode);
  };
  const handleCloseInfo = () => {
    setSelectedCharacter(null);
  };
  const handleCloseInfoLocation = () => {
    setSelectedLocation(null);
  };
  const handleLoadMoreLocation = () => {
    setNumLocation((n) => n + 8);
  };
  const handleLoadMoreEpisode = () => {
    setNumEpisode((n) => n + 12);
  };
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              handleLoadMore={handleLoadMore}
              num={num}
              handleCardClick={handleCardClick}
              handleAddFavorite={handleAddFavorite}
              favoriteCharacters={favoriteCharacters}
            />
          }
        />
        <Route
          path="/characterDetails"
          element={
            <CharacterDetails
              selectedCharacter={selectedCharacter}
              handleCloseInfo={handleCloseInfo}
            />
          }
        />
        <Route
          path="/locationDetails"
          element={
            <LocationDetails
              handleCloseInfoLocation={handleCloseInfoLocation}
              selectedLocation={selectedLocation}
            />
          }
        />
        <Route
          path="locations"
          element={
            <Locations
              handleLoadMoreLocation={handleLoadMoreLocation}
              numLocation={numLocation}
              handleCardClickLocation={handleCardClickLocation}
            />
          }
        />
        <Route
          path="episodes"
          element={
            <Episodes
              handleCardClickEpisode={handleCardClickEpisode}
              numEpisode={numEpisode}
              handleLoadMoreEpisode={handleLoadMoreEpisode}
            />
          }
        />
        <Route
          path="/episodeDetails"
          element={<EpisodeDetails selectedEpisode={selectedEpisode} />}
        />
        <Route
          path="/favorites"
          element={
            <Favorite
              favoriteCharacters={favoriteCharacters}
              handleAddFavorite={handleAddFavorite}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default MainComponent;
