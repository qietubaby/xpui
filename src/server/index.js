import axios from 'axios';
let baseUrl = '';

let HTTP = axios.create({
    baseURL: baseUrl,
    responseType: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

export default HTTP;