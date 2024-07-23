import styles from "./App.module.css";
import SunIcon from "../src/assets/icon-sun.svg?react";
import SearchIcon from "../src/assets/icon-search.svg?react";
import LocationIcon from "../src/assets/icon-location.svg?react";
import UrlIcon from "../src/assets/icon-website.svg?react";
import TwitterIcon from "../src/assets/icon-twitter.svg?react";
import CompanyIcon from "../src/assets/icon-company.svg?react";

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>devfinder</h1>
        <div className={styles.themeContainer}>
          <p className={styles.themeText}>LIGHT</p>
          <SunIcon />
        </div>
      </div>
      <div className={styles.searchContainer}>
        <SearchIcon className={styles.searchIcon}/>
        <input className={styles.searchInput} placeholder="Search Github username..."/>
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.portraitContainer}>
          {/* Eventually add portrait */}
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.nameContainer}>
            <h2>Name placeholder</h2>
            <p>Tag placeholder</p>
          </div>
          <p>Joined DATE</p> {/* Creation date */}
        </div>
        <div className={styles.informationContainer}>
          <p className={styles.descriptionParagraph}></p>
          <div className={styles.numericalInfoContainer}>
            <div className={styles.labelsContainer}>
              <p>Repos</p>
              <p>Followers</p>
              <p>Following</p>
            </div>
            <div className={styles.valuesContainer}>
              <p>8</p>
              <p>3938</p>
              <p>9</p>
            </div>
          </div>
          <div className={styles.additionalInfoContainer}>
            <div className={styles.visualInfoContainer}>
              <LocationIcon />
              <p>LOCATION</p>
            </div>
            <div className={styles.visualInfoContainer}>
              <UrlIcon />
              <p>WEBSITE</p>
            </div>
            <div className={styles.visualInfoContainer}>
              <TwitterIcon />
              <p>TWIT</p>
            </div>
            <div className={styles.visualInfoContainer}>
              <CompanyIcon />
              <p>Company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
