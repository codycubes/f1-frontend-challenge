import axios from 'axios';

import { START_YEAR, FINISH_YEAR, BEGINNING_YEAR, API_BASE_URL } from './../config';


function getDriverStandingsForAllRacesInPeriod(startYear, endYear) {
	const offset = startYear - BEGINNING_YEAR;
	const limit = (endYear - startYear) + 1;
	// Here we use benifits of ES6 literals which helps us to avoid using the + to concat string
	return axios.get(`${API_BASE_URL}/driverStandings/1.json?limit=${limit}&offset=${offset}`);
}

// here we call the api fetch for start year to end year
export function getDriverStandingsForAssignment() {
	return getDriverStandingsForAllRacesInPeriod(START_YEAR, FINISH_YEAR);
}

// This function gets the races of a season
export function getAllRacesForYear(season) {
	return axios.get(`${API_BASE_URL}/${season}/results/1.json`);
}
