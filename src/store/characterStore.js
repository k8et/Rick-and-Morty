import { makeObservable, observable, action, computed } from 'mobx';
import axios from 'axios'; // Import axios

class CharacterStore {
    characters = [];
    nameFilter = '';
    speciesFilter = '';
    genderFilter = '';
    statusFilter = '';

    constructor() {
        makeObservable(this, {
            characters: observable,
            nameFilter: observable,
            speciesFilter: observable,
            genderFilter: observable,
            statusFilter: observable,
            fetchCharacters: action,
            filteredCharacters: computed,
        });
    }

    fetchCharacters = () => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then(response => {
                const data = response.data;
                this.characters = data.results;
            })
            .catch(error => {
                console.error(error);
            });
    }

    get filteredCharacters() {
        let filtered = this.characters.slice();

        if (this.nameFilter) {
            filtered = filtered.filter(character =>
                character.name.toLowerCase().includes(this.nameFilter.toLowerCase())
            );
        }

        if (this.speciesFilter) {
            filtered = filtered.filter(character =>
                character.species.toLowerCase() === this.speciesFilter.toLowerCase()
            );
        }

        if (this.genderFilter) {
            filtered = filtered.filter(character =>
                character.gender.toLowerCase() === this.genderFilter.toLowerCase()
            );
        }

        if (this.statusFilter) {
            filtered = filtered.filter(character =>
                character.status.toLowerCase() === this.statusFilter.toLowerCase()
            );
        }

        return filtered;
    }
}

export default CharacterStore;
