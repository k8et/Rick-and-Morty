import styles from "./style.module.css";
import FilterByNameBtn from "../../components/allbutton/filterByNameBtn";
import BtnLoadMore from "../../components/allbutton/btnLoadMore";
import { Link } from "react-router-dom";
import logo from "../../assets/png/rick-and-morty-episode.png";
import Loader from "../../components/loader";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import store from "../../store/store";

const Episodes = observer(
  ({ handleCardClickEpisode, handleLoadMoreEpisode, numEpisode }) => {
    useEffect(() => {
      store.episodeStore.fetchEpisodes();
    }, []);
    const handleNameSearch = (event) => {
        store.episodeStore.nameFilter = event.target.value
    };
    return (
      <div className={styles.locationsComp}>
        <img src={logo} alt="" />
        <div className={styles.inputBox}>
          <FilterByNameBtn
            onChange={handleNameSearch}
            style={{ width: "500px" }}
          />
        </div>
        <div className={styles.planetBox}>
          {store.episodeStore.filteredEpisodes.length > 0? (
            store.episodeStore.filteredEpisodes
              .slice(0, numEpisode)
              .map((item, index) => (
                <Link
                  to="/episodeDetails"
                  className={styles.linkLocationDetails}
                  onClick={() => handleCardClickEpisode(item.id)}
                  key={index}
                >
                  <div className={styles.card}>
                    <div className={styles.cardName}>{item.name}</div>
                    <div className={styles.cardType}>{item.air_date}</div>
                    <div className={styles.cardEpisode}>{item.episode}</div>
                  </div>
                </Link>
              ))
          ) : (
            <div className={styles.load}>
              <Loader />
            </div>
          )}
          <div className={styles.btnPos}>
            <BtnLoadMore onclick={handleLoadMoreEpisode} />
          </div>
        </div>
      </div>
    );
  }
);

export default Episodes;
