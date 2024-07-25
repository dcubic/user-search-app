import styles from "./App.module.css";
import SunIcon from "../src/assets/icon-sun.svg?react";
import SearchIcon from "../src/assets/icon-search.svg?react";
import LocationIcon from "../src/assets/icon-location.svg?react";
import UrlIcon from "../src/assets/icon-website.svg?react";
import TwitterIcon from "../src/assets/icon-twitter.svg?react";
import CompanyIcon from "../src/assets/icon-company.svg?react";
import { useEffect, useRef, useState } from "react";
import { fetchUserInfo } from "./apis/githubApi";
import { darkTheme, lightTheme } from "./apis/theme";

interface UserState {
  profilePicUrl: string;
  username: string;
  name: string | null;
  company: string | null;
  location: string | null;
  blog: string;
  twitterUsername: string | null;
  followerCount: number;
  followingCount: number;
  bio: string | null;
  repoCount: number;
  creationDateString: string;
}

const DEFAULT_STATE: UserState = {
  profilePicUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  username: "octocat",
  name: "The Octocat",
  company: "@github",
  location: "San Francisco",
  blog: "https://github.blog",
  twitterUsername: null,
  followerCount: 14270,
  followingCount: 9,
  bio: null,
  repoCount: 8,
  creationDateString: "25 Jan 2011",
};
const FADEOUT_DELAY = 1000;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userState, setUserState] = useState(DEFAULT_STATE);
  const [searchString, setSearchString] = useState("");
  const [noUserError, setNoUserError] = useState(false);
  const showErrorTimeoutRef = useRef<number | undefined>(undefined);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  console.log("isDarkMode: ", isDarkMode);

  const handleKeypress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await getUserInfo();
    }
  };

  function toggleTheme() {
    setIsDarkMode((modeCurrent) => !modeCurrent);
  }

  useEffect(() => {
    if (noUserError) {
      showErrorTimeoutRef.current = setTimeout(() => {
        setNoUserError(false);
      }, 2 * FADEOUT_DELAY);

      return () => {
        clearTimeout(showErrorTimeoutRef.current);
      };
    }
  }, [noUserError]);

  useEffect(() => {
    const theme = isDarkMode ? darkTheme : lightTheme;
    console.log("");
    Object.entries(theme).forEach(([variableName, value]) => {
      document.documentElement.style.setProperty(`--${variableName}`, value);
    });
  }, [isDarkMode]);

  const clearErrorTimeout = () => {
    if (showErrorTimeoutRef) {
      clearTimeout(showErrorTimeoutRef.current);
    }
  };

  const getUserInfo = async () => {
    clearErrorTimeout();
    setNoUserError(false);

    if (searchString === "") {
      setNoUserError(true);
      return;
    }

    const getUserResponse = await fetchUserInfo(searchString);
    if (!getUserResponse.success) {
      setNoUserError(true);
    } else {
      const date = new Date(getUserResponse.userInfo!.created_at);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setUserState({
        profilePicUrl: getUserResponse.userInfo!.avatar_url,
        username: getUserResponse.userInfo!.login,
        name: getUserResponse.userInfo!.name,
        company: getUserResponse.userInfo!.company,
        location: getUserResponse.userInfo!.location,
        blog: getUserResponse.userInfo!.blog,
        twitterUsername: getUserResponse.userInfo!.twitter_username,
        followerCount: getUserResponse.userInfo!.followers,
        followingCount: getUserResponse.userInfo!.following,
        bio: getUserResponse.userInfo!.bio,
        repoCount: getUserResponse.userInfo!.public_repos,
        creationDateString: formattedDate,
      });
      setNoUserError(false);
    }
  };

  const hasCompany = () => {
    return userState.company !== null && userState.company[0] == "@";
  };

  const companyUrl = () =>
    `https://github.com/${userState.company!.substring(1)}`;

  const hasTwitter = () =>
    userState.twitterUsername !== null && userState.twitterUsername !== "";

  const twitterUrl = () => {
    const trimmedUsername =
      userState.twitterUsername![0] === "@"
        ? userState.twitterUsername!.substring(1)
        : userState.twitterUsername;
    return `https://x.com/${trimmedUsername}`;
  };

  const hasLocation = () => userState.location !== null;

  const hasBlog = () => userState.blog !== "";

  const noResultsText = () => {
    if (noUserError) {
      return "No results";
    }
    return "";
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>devfinder</h1>
        <div className={styles.themeContainer} onClick={toggleTheme}>
          <p className={styles.themeText}>{isDarkMode ? "LIGHT" : "DARK"}</p>
          <SunIcon className={styles.modeIcon} />
        </div>
      </div>
      <div className={styles.searchContainer}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search Github username..."
          value={searchString}
          onChange={handleInputChange}
          onKeyDown={handleKeypress}
        />
        <button className={styles.searchButton} onClick={getUserInfo}>
          Search
        </button>
        {noUserError && (
          <p className={`${styles.errorText} ${styles.fadeOut}`}>
            {noResultsText()}
          </p>
        )}
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.portraitContainer}>
          <img src={userState.profilePicUrl} className={styles.portrait} />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.nameContainer}>
            <h2 className={styles.nameText}>
              {userState.name ?? userState.username}
            </h2>
            <p className={styles.tagText}>{`@${userState.username}`}</p>
          </div>
          <p className={styles.joinDateText}>
            Joined {userState.creationDateString}
          </p>
        </div>
        <div className={styles.informationContainer}>
          <p className={styles.descriptionParagraph}>
            {userState.bio ?? "This profile has no bio"}
          </p>
          <div className={styles.numericalInfoContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.classificationText}>Repos</p>
              <p className={styles.numericalValue}>{userState.repoCount}</p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.classificationText}>Followers</p>
              <p className={styles.numericalValue}>{userState.followerCount}</p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.classificationText}>Following</p>
              <p className={styles.numericalValue}>
                {userState.followingCount}
              </p>
            </div>
          </div>
          <div className={styles.additionalInfoContainer}>
            <div className={`${styles.visualInfoContainer} ${styles.location}`}>
              <div className={styles.visualIconContainer}>
                <LocationIcon
                  className={`${styles.infoIcon} ${
                    hasLocation() ? styles.activeIcon : styles.inactiveIcon
                  }`}
                />
              </div>
              <p
                className={`${styles.notLinkText} ${
                  hasLocation() ? "" : styles.inactive
                }`}
              >
                {hasLocation() ? userState.location : "Not Available"}
              </p>
            </div>
            <div className={`${styles.visualInfoContainer} ${styles.blog}`}>
              <div className={styles.visualIconContainer}>
                <UrlIcon
                  className={`${styles.infoIcon} ${
                    hasBlog() ? styles.activeIcon : styles.inactiveIcon
                  }`}
                />
              </div>
              {hasBlog() ? (
                <a className={styles.linkText} href={userState.blog && userState.blog }>{userState.blog}</a>
              ) : (
                <p className={`${styles.notLinkText} ${styles.inactive}`}>
                  Not Available
                </p>
              )}
            </div>
            <div className={`${styles.visualInfoContainer} ${styles.twitter}`}>
              <div className={styles.visualIconContainer}>
                <TwitterIcon
                  className={`${styles.infoIcon} ${
                    hasTwitter() ? styles.activeIcon : styles.inactiveIcon
                  }`}
                />
              </div>
              {hasTwitter() ? (
                <a className={styles.linkText} href={twitterUrl()}>
                  {userState.twitterUsername}
                </a>
              ) : (
                <p className={`${styles.notLinkText} ${styles.inactive}`}>
                  Not Available
                </p>
              )}
            </div>
            <div className={`${styles.visualInfoContainer} ${styles.company}`}>
              <div className={styles.visualIconContainer}>
                <CompanyIcon
                  className={`${styles.infoIcon} ${
                    hasCompany() ? styles.activeIcon : styles.inactiveIcon
                  }`}
                />
              </div>
              {hasCompany() ? (
                <a className={styles.linkText} href={companyUrl()}>
                  {userState.company}
                </a>
              ) : (
                <p className={`${styles.notLinkText} ${styles.inactive}`}>
                  Not Available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
