import axios from 'axios';

export const req = axios.create({
  baseURL:'http://10.28.38.26:8080/',
  //baseURL: 'http://localhost:8080/',
  headers: {
  	Accept: 'application/json',
    'Content-Type': 'application/json'
  },
})