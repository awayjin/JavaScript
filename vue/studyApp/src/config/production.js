
const LOGIN_HOST = 'https://sit.4009515151.com'; //'https://vsapp.4009515151.com';
const CLIENT_ID = '183f595244b764ad5a511dfacbbb3849';
const REDIRECT_URI = 'http%3A%2F%2Felsit.vankeservice.com%2Fapi%2Fapp%2Foauth';
const API_BASE_URL  = 'https://eladminsit.vankeservice.com'; //'https://vsapp.4009515151.com';
const LOGIN_URL  = `${LOGIN_HOST}/api/lebang/oauth/app/authorize?client_id=${CLIENT_ID}&scopes=r-staff&redirect_uri=${REDIRECT_URI}&response_type=code&state=222&sign=y`;

module.exports = {
    LOGIN_URL: LOGIN_URL,
    API_BASE_URL: API_BASE_URL
}
