import styles from "./style.module.css";
import logo from "../../assets/png/rick-and-morty 1.png";
import FilterByNameBtn from "../../components/allbutton/filterByNameBtn";
import BtnLoadMore from "../../components/allbutton/btnLoadMore";
import Select from "../../components/allbutton/selectBtn/InputSelect";
import { dimensionOptions, typeOptions } from "../../mock/selectOptions";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import { useEffect } from "react";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const Locations = observer((props) => {
  const { numLocation, handleLoadMoreLocation, handleCardClickLocation } =
    props;
  const { filteredLocation, fetchLocation } = store.locationStore;
  useEffect(() => {
    fetchLocation();
  }, []);
  const handleTitleSearch = (event) => {
    store.locationStore.titleFilter = event.target.value;
  };

  const handleTypeChange = (event) => {
    store.locationStore.typeFilter = event.target.value;
  };

  const handleDimensionChange = (event) => {
    store.locationStore.dimensionFilter = event.target.value;
  };

  return (
    <div className={styles.locationsComp}>
      <img src={logo} alt="" />
      <div className={styles.inputBox}>
        <FilterByNameBtn
          onChange={handleTitleSearch}
          style={{ width: "326px" }}
        />
        <Select
          options={typeOptions}
          label="Type"
          onChange={handleTypeChange}
        />
        <Select
          options={dimensionOptions}
          label="Dimension"
          onChange={handleDimensionChange}
        />
      </div>
      <div className={styles.planetBox}>
        {filteredLocation.length ? (
          filteredLocation.slice(0, numLocation).map((item, index) => (
            <Link
              to="/locationDetails"
              className={styles.linkLocationDetails}
              onClick={() => handleCardClickLocation(item.id)}
              key={index}
            >
              <div className={styles.card}>
                <div className={styles.cardName}>{item.name}</div>
                <div className={styles.cardType}>{item.type}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.load}>
            <Loader />
          </div>
        )}
        <div className={styles.btnPos}>
          <BtnLoadMore onclick={handleLoadMoreLocation} />
        </div>
      </div>
    </div>
  );
});

export default Locations;
