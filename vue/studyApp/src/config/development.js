'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
//const baseUrl = 'https://eladminsit.vankeservice.com'
//const baseUrl = 'http://10.39.228.103:8060';


const LOGIN_HOST = 'https://sit.4009515151.com';
const CLIENT_ID = '183f595244b764ad5a511dfacbbb3849';
const REDIRECT_URI = 'http%3A%2F%2Felsit.vankeservice.com%2Fapi%2Fapp%2Foauth';
const API_BASE_URL  = 'https://eladminsit.vankeservice.com';
const LOGIN_URL  = `${LOGIN_HOST}/api/lebang/oauth/app/authorize?client_id=${CLIENT_ID}&scopes=r-staff&redirect_uri=${REDIRECT_URI}&response_type=code&state=222&sign=y`;

module.exports = {
  LOGIN_URL: LOGIN_URL,
  API_BASE_URL: API_BASE_URL
}
