/**
 * @fileoverview JS file with all Axios XMLHttpRequests,
 * Axios transforms JSON Data Automatically.
 * @author Tom Jones <tom@wilson-express.co.uk>
 */

/** @const {string} SPACEX URL which retrieves data from main SpaceX API */
const SPACEX = "https://api.spacexdata.com/v3/",
  /** @const {string} INFOAPI Adds info to end of URL for a different endpoint */
  INFOAPI = SPACEX + "info",
  /** @const {string} UPCOMINGAPI Adds launches/upcoming to url for different endpoint */
  UPCOMINGAPI = SPACEX + "launches/upcoming",
  /** @const {string} LAUNCHPADS Adds launchpads to url for different endpoint */
  LAUNCHPADS = SPACEX + "launchpads",
  /** @const {string} LANDPADS Adds landpads to url for different endpoint */
  LANDPADS = SPACEX + "landpads",
  /** @const {string} ROCKETS Adds rockets to url for different endpoint */
  ROCKETS = SPACEX + "rockets",
  /** @const {string} DRAGONS Adds dragons to url for different endpoint */
  DRAGONS = SPACEX + "dragons",
  /** @const {string} MISSIONS Adds missions to url for different endpoint */
  MISSIONS = SPACEX + "missions",
  /** @const {string} PAST Adds launches/past to url for different endpoint */
  PAST = SPACEX + "launches/past",
  /** @const {string} HISTORY Adds history to url for different endpoint */
  HISTORY = SPACEX + "history/?order=desc",
  /** @const {HTMLElement} MAINCONTENT Accesses element with ID of data*/
  MAINCONTENT = document.getElementById("data");

/** 
 * Function to retrieve data from 3 endpoints
 * Upcoming launch, launch sites and land sites.
 * Performs 3 similtanious XMLHttpRequests and spreads JSON 
 * data across 3 variables. Then call all relevant functions in homepage.js
 */

function homepageData() {
  axios.all([
      axios.get(UPCOMINGAPI),
      axios.get(LAUNCHPADS),
      axios.get(LANDPADS)
    ])
    .then(axios.spread((upcomingApi, launchPads, landPads) => {

      upcoming = upcomingApi.data;
      launchData = launchPads.data;
      landData = landPads.data;

      carousel();
      active();
      siteLabels();
      headers();
      launchSiteData();
      landSiteData();
    }));
}

/** 
 * Function to retrieved data from the rockets API endpoint.
 * Turn response data into a variable and call all related
 * functions within rockets.js.
 */
function fetchRockets() {
  axios.get(ROCKETS).then(response => {
    rockets = response.data;
    eachRocketCard();
  });
}

/**
 * Function which retrieves specific rocket data once user selects which one.
 * Displays loader before API Called and Data displayed.
 * Uses btnValue variable to change the URL on users button press.
 * Then turns repsonse data into a variable and call all related functions within rockets.js.
 * @param {string} value this is the value of the button selected on rockets.js
 */
function fetchSpecificRocket(value) {
  $("#loader").removeClass("hide-loader");
  axios.get(SPACEX + value).then(response => {
    specificRocket = response.data;
    rocketSpecCard();
    rocketImages();
  });
}

/** 
 * Function to retrieve data from the dragons API endpoint.
 * Turn response data into a variable and call all related
 * functions within dragons.js.
 */
function callDragons() {
  axios.get(DRAGONS).then(response => {
    dragons = response.data;
    eachDragonCard();
  });
}

/** 
 * Function which retrieves specific dragon data once user selects which one.
 * Displays loader before API Called and Data displayed.
 * Uses btnValue variable to change the URL on users button press.
 * Then turns repsonse data into a variable and call all related functions within dragons.js.
 * @param {string} value this is the value of the button selected on dragons.js
 */
function fetchSpecificDragon(value) {
  $("#loader").removeClass("hide-loader");
  axios.get(SPACEX + value).then(response => {
    specificDragon = response.data;
    dragonSpecCard();
    dragonImages();
  });
}

/** function to retrieve data from the missions api endpoint */
function callMissions() {

  /** Add data from missions api to a variable and call any related functions */
  axios.get(MISSIONS).then(response => {
    missionData = response.data;
    eachMissionCard();
  });
}

/** 
 * function to retrieve data from the past launches api endpoint
 * plus btnValue variable to add a querystring to the end of the url. 
 * Turn response data into a variable and reverse object to show newest first.
 * Then call all related functions in launches.js
 * @param {string} value this is the value of the page button selected.
 */
function callLaunches(value) {
  axios.get(PAST + value).then(response => {
    launchData = response.data;
    allLaunches();
  });
}

/** 
 * function to retrieve data from the History api endpoint.
 * add response data to a variable and reverse the order of the object
 * to display newest data first. then call related functions in history.js 
 */
function callHistory() {
  axios.get(HISTORY).then(response => {
    historyData = response.data;
    allHistoryCard();
  });
}

/** 
 * function to retrieve data from the main Spacex api and SpaceX info API.
 * perform 2 similtanious XMLHttpRequests and spread response data across 
 * 2 variables. then call any related functions within about.js
 */
function callAbout() {
  axios.all([
      axios.get(SPACEX),
      axios.get(INFOAPI)
    ])
    .then(axios.spread((spaceX, infoApi) => {
      spacexData = spaceX.data;
      infoApiData = infoApi.data;
      aboutPage();
    }));
}

/**
 * Function added to onclick attribute to change the btnValue
 * depending on the value of the btn selected. This wil then 
 * change the endpoint on the API so only 10 items are shown 
 * at a time.
 * @param {string} value this is the value of the page button selected.
 */
function getPagination(value) {
  /** Recall Past Launches API and clear Data before displaying new data */
  clearData();
  callLaunches(value);
  $("#loader").removeClass("hide-loader");
}

/**
 * Function added to onclick attribute to change the btnValue
 * depending on the value of the btn selected. This will then 
 * change the endpoint on the API so only the selected Rocket
 * or dragon is displayed.
 * @param {string} type type is a string of either "rocket" or "dragon"
 * @param {string} value This is the value of button selected by user
 */
function getValue(type, value) {
  /** Checks if the type is the string "rockets" if it is then it calls fetchSpecificRockets() */
  if (type == "rocket") {
    fetchSpecificRocket(value);
    /** If the type is "dragons" it will call fetchSpecficDragon() */
  } else if (type == "dragon") {
    fetchSpecificDragon(value);
  }
}

/** function to clear all HTML from inside the Data div on Launches.html */
function clearData() {
  MAINCONTENT.innerHTML = "";
}