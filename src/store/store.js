import CharacterStore from './characterStore';
import LocationStore from './locationStore';
import EpisodeStore from "./episodeStore";

const store = {
    characterStore: new CharacterStore(),
    locationStore: new LocationStore(),
    episodeStore: new EpisodeStore(),
};

export default store;
