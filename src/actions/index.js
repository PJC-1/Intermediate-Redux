const API_KEY = '547afe4e4b3c077614a4bcc28221d8d6';

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather() {
  return {
    type: FETCH_WEATHER
  };
}
