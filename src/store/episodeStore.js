import { makeObservable, observable, action, computed } from 'mobx';
import axios from "axios";

class EpisodeStore {
    episodes = [];
    nameFilter = '';

    constructor() {
        makeObservable(this, {
            episodes: observable,
            nameFilter: observable,
            fetchEpisodes: action,
            filteredEpisodes: computed,
        });
    }

    fetchEpisodes = () => {
        axios.get('https://rickandmortyapi.com/api/episode')
            .then(response => {
                const data = response.data;
                this.episodes = data.results;
            })
            .catch(error => {
                console.error(error);
            });
    }
    get filteredEpisodes() {
        let filtered = this.episodes.slice();

        if (this.nameFilter) {
            filtered = filtered.filter(episode =>
                episode.name.toLowerCase().includes(this.nameFilter.toLowerCase())
            );
        }

        return filtered;
    }
}

export default EpisodeStore;
