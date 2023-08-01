import { makeObservable, observable, action, computed } from 'mobx';
import axios from "axios";

class LocationStore {
    location = [];
    titleFilter = '';
    typeFilter = '';
    dimensionFilter = '';

    constructor() {
        makeObservable(this, {
            location: observable,
            typeFilter: observable,
            dimensionFilter: observable,
            titleFilter: observable,
            fetchLocation: action,
            filteredLocation: computed,
        });
    }


    fetchLocation = () => {
        axios.get('https://rickandmortyapi.com/api/location')
            .then(response => {
                const data = response.data;
                this.location = data.results;
            })
            .catch(error => {
                console.error(error);
            });
    }

    get filteredLocation() {
        let filtered = this.location.slice();

        if (this.titleFilter) {
            filtered = filtered.filter(location  =>
                location.name.toLowerCase().includes(this.titleFilter.toLowerCase())
            );
        }

        if (this.typeFilter) {
            filtered = filtered.filter(location  =>
                location .type.toLowerCase() === this.typeFilter.toLowerCase()
            );
        }

        if (this.dimensionFilter) {
            filtered = filtered.filter(location  =>
                location .dimension.toLowerCase() === this.dimensionFilter.toLowerCase()
            );
        }

        return filtered;
    }
}


export default LocationStore;
